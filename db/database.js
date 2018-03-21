const schemas = require('./schemas.js');
const idgen = require('./idgenerate.js');

var mongoose = require('mongoose');
const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost/powerrank'
mongoose.connect(mongooseUri);
var db = mongoose.connection;

// Create Schemas
const rankListSchema = schemas.rankListSchema;
const rankingSchema = schemas.rankingSchema;
const rankReductionSchema = schemas.rankReductionSchema;

// Create models
var RankList = mongoose.model('RankList', rankListSchema)
var Ranking = mongoose.model('Ranking', rankingSchema)

db.on('error', console.error.bind(console, 'connection error:')); // on an error, calls the callback function

module.exports = {

    // This is SORT OF a dev backdoor that will incorporate new changes from the 
    // schema into existing documents. It is just a performance hit and needs to
    // be run one time in an environment to update everything
    updateAllRankLists(callback) {
        // RankList.updateMany({rankingCount: {$exists: false}}, )
        RankList.remove()

        RankList.find((err, rankLists) => {
            if (err) return console.error(err);
            
            rankLists.forEach(rankList => { // This only works with a low amount of rankLists
                Ranking.count({rankListId: rankList._id}, (err, count) => {
                    if (err) return console.error(err);
                    rankList.rankingCount = count
                    rankList.scaleName = rankList.scaleName || "Excellence"     
                    rankList.date = rankList.date || Date.parse('20 Dec 2017 00:00:00 GMT')
                    rankList.public = rankList.public || true

                    rankList.save( (err, savedRankList) => {
                        // Deletes items that aren't valid
                        if (err) {
                            console.log("Removed!")
                            rankList.remove()
                        } else {
                            console.log("Saved!")
                            console.log(savedRankList)
                        }
                    })
                })
            })
            
            callback("updating");

        }).select('title id rankItems user date')
    },
    
    getAllRankLists(callback) {
        // TODO front page won't always have every single powerranking
        // So we should only select most recent public powerrankings
        RankList.find((err, rankLists) => {
            if (err) return console.error(err);
            let rankListsInfo = rankLists.map( rankList => {
                return {
                    _id: rankList._id,
                    title: rankList.title,
                    itemCount: rankList.rankItems.length,
                    rankingCount: rankList.rankingCount,
                    user: rankList.user,
                    date: rankList.date
                }
            })
            callback(rankListsInfo);
        }).select('title id rankItems user date rankingCount')
    },

    getRankList(id, callback) {
        RankList.findOne({_id: id}, (err, rankList) => {
            if (err) return console.error(err);
            console.log("rankList", rankList)
            callback(rankList);
        }).select('id title rankItems user options')
    },
    
    getRankListWithResults(id, callback) {
        RankList.findOne({_id: id}, (err, rankList) => {
            if (err) return console.error(err);
            console.log("rankList", rankList)
            callback(rankList);
        })
    },

    getRanking(id, callback) {
        Ranking.findOne({_id: id}, (err, ranking) => {
            if (err) return console.error(err);
            console.log("ranking", ranking)
            callback(ranking);
        })
    },
    

    getRecentRankings(id, callback) {
        Ranking.find({rankListId: id}, (err, recentRankings) => {
            if (err) return console.error(err);
            console.log("recentRankings", recentRankings)
            callback(recentRankings);
        })
        .sort({date: -1})
        .limit(5)
    },

    getRankReduction(id, callback) {
        RankReduction.findOne({rankListId: id}, (err, rankReduction) => {
            if (err) return console.error(err);
            console.log("rankReduction", rankReduction)
            callback(rankReduction);
        })
    },

    createRankList(rankListToCreate, callback) {
        console.log(rankListToCreate)
        let newRankList = new RankList({
            title: rankListToCreate.title,
            rankItems: rankListToCreate.rankItems,
            aggregations: [
                {
                    type: 'dowdall',
                    sortedPointTotals: rankListToCreate.rankItems.map( (item) => {
                        return [item, 0.0]
                    } )
                }
            ],
            user: rankListToCreate.user,
            options: {
                public: true
            }
        })
        
        function saveRanklist(rl) {
            rl.save((err, savedRankList) => {
                if (err) {
                    if (err.code === 11000) {
                        // Duplicate key error
                        console.log(`Duplicate key '${rl._id}'`)
                        rl._id = idgen.generate();
                        console.log(`Retrying with key '${rl._id}'`)
                        saveRanklist(rl);
                    } else {
                        console.error(err);
                        callback({success: false})
                    }
                } else {
                    callback({
                        success: true,
                        RankList: savedRankList
                    })
                }
            })
        }

        saveRanklist(newRankList);
    },
    
    createRanking(rankingToCreate, callback) {
        let newRanking = new Ranking({
            rankListId: rankingToCreate.rankListId,
            rankOrder: rankingToCreate.rankOrder,
            user: rankingToCreate.user
        })

        function saveRanking(nr, aggregationUpdateFunction) {
            nr.save((err, savedRanking) => {
                if (err) {
                    if (err.code === 11000) {
                        // Duplicate key error
                        console.log(`Duplicate key '${nr._id}'`)
                        nr._id = idgen.generate();
                        console.log(`Retrying with key '${nr._id}'`)
                        saveRanking(nr);
                    } else {
                        console.error(err);
                        callback({success: false})
                    }
                } else {
                    aggregationUpdateFunction(savedRanking.rankListId, savedRanking.rankOrder, (updatedRankList) => {
                        console.log("Successfully saved ranking and updated rankList", updatedRankList)
                    })

                    callback({
                        success: true,
                        ranking: savedRanking
                    })
                }
            })
        }

        saveRanking(newRanking, this.updateAggregationsDowdall);
    },

    updateAggregationsDowdall(rankListToAnalyzeId, addedRankOrder, callback) {
        
        pointValue = (i) => {
            // first place = n pts, 2nd = n/2, 3rd = n/3
            const n =  1.0
            return n / (i + 1)
        }
        
        RankList.findOne({_id: rankListToAnalyzeId}, (err, rankList) => {
            if (err) return console.error(err);
            console.log("Updating aggregations for", rankList)
            
            const rankListLength = rankList.rankItems.length;
            
            // The dowdall ranking we'll be updating
            let dowdall = rankList.aggregations.find((agg => {
                return agg.type === 'dowdall';
            }));        
            
            let pointmap = Array(rankListLength).fill(0) // Array of zeroes for each item in RankList
            // This transforms
            //     index = rank order, value = original index
            // --> index = original index, value = points
            addedRankOrder.forEach((correspondingIndex, ranking) => {
                pointmap[correspondingIndex] = pointValue(ranking);
            });
            
            // sortedPointTotals -> Array of form [[item1, pts1], [item2, pts2]]
            const updatedSortedPointTotals = dowdall.sortedPointTotals.map((item, index) => {
                let itemName = item[0];
                let prevPoints = item[1];
                let ogIndex = rankList.rankItems.indexOf(itemName)

                return [itemName, prevPoints + pointmap[ogIndex]]
            })
            .sort((a, b) => {
                return b[1] - a[1]; // Descending Order
                // return a[1] - b[1]; // Ascending Order
            })
            console.log(updatedSortedPointTotals)

            // Array of all the other aggregations that we don't want to touch
            let aggregationList = rankList.aggregations.filter((agg => {
                return agg.type !== 'dowdall';
            }));
            aggregationList.push({
                type: "dowdall",
                sortedPointTotals: updatedSortedPointTotals
            })

            // recreate aggregations list
            rankList.set({aggregations: aggregationList})
            rankList.save( (err, updatedRankList) => {
                if (err) return console.error(err);
                callback(updatedRankList)
            })
        })
    },
}

function deleteWholeRankingDatabase() {
    Ranking.remove((err, rankings) => {
        if (err) return console.error(err);
        console.log('removed', rankings);
    })
}

// deleteWholeRankingDatabase();
// deleteWholeRankReductionDatabase();
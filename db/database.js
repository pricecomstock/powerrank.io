const schemas = require('./schemas.js');
const idgen = require('./idgenerate.js');
const validations = require('./validations.js')

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
    // updateAllRankLists(callback) {
    //     // RankList.updateMany({rankingCount: {$exists: false}}, )
    //     RankList.remove()

    //     RankList.find((err, rankLists) => {
    //         if (err) return console.error(err);
            
    //         rankLists.forEach(rankList => { // This only works with a low amount of rankLists
    //             Ranking.count({rankListId: rankList._id}, (err, count) => {
    //                 if (err) return console.error(err);
    //                 rankList.rankingCount = count
    //                 rankList.scaleName = rankList.scaleName || "Excellence"     
    //                 rankList.date = rankList.date || Date.parse('20 Dec 2017 00:00:00 GMT')
    //                 rankList.public = rankList.public || true

    //                 rankList.save( (err, savedRankList) => {
    //                     // Deletes items that aren't valid
    //                     if (err) {
    //                         console.log("Removed!")
    //                         rankList.remove()
    //                     } else {
    //                         console.log("Saved!")
    //                         console.log(savedRankList)
    //                     }
    //                 })
    //             })
    //         })
            
    //         callback("updating");

    //     })
    // },
    
    getAllRankLists(filter, sort, callback) {
        // TODO front page won't always have every single powerranking
        // So we should only select most recent public powerrankings
        
        // Sorting is whack
        // https://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js
        const msInADay = 24 * 60 * 60 * 1000;
        const filters = {
            today: {
                public: true,
                date: {
                    "$gte": new Date(new Date().getTime() - msInADay)
                }
            },
            week: {
                public: true,
                date: {
                    "$gte": new Date(new Date().getTime() - (7 * msInADay))
                }
            },
            month: {
                public: true,
                date: {
                    "$gte": new Date(new Date().getTime() - (30 * msInADay))
                }
            },
            all: {
                public: true
            }
        }
        
        const sorts = {
            recent: [[['date', -1]]],
            top: [[['rankingCount', -1]]]
        }

        let chosenFilter = filters[filter] || 'week';
        let chosenSort = sorts[sort] || 'recent';

        console.log('filter', chosenFilter)
        console.log('sort', chosenSort)

        // RankList.find({public: true}, null, {sort: {date: 'descending'}}, (err, rankLists) => {
        RankList.find(chosenFilter, null, {sort: chosenSort}, (err, rankLists) => {
            if (err) return console.error(err);
            let rankListsInfo = rankLists.map( rankList => {
                return {
                    _id: rankList._id,
                    title: rankList.title,
                    itemCount: rankList.rankItems.length,
                    rankingCount: rankList.rankingCount,
                    user: rankList.user,
                    date: rankList.date,
                    scaleName: rankList.scaleName
                }
            })
            callback(rankListsInfo);
        })
        .select('title id rankItems user date rankingCount scaleName')
        .limit(20)
    },

    getRankList(id, callback) {
        RankList.findOne({_id: id}, (err, rankList) => {
            if (err) return console.error(err);
            // console.log("rankList", rankList)
            callback(rankList);
        })
    },
    
    getRankListWithResults(id, callback) {
        RankList.findOne({_id: id}, (err, rankList) => {
            if (err) return console.error(err);
            // console.log("rankList", rankList)
            callback(rankList);
        })
    },

    getRanking(id, callback) {
        Ranking.findOne({_id: id}, (err, ranking) => {
            if (err) return console.error(err);
            // console.log("ranking", ranking)
            callback(ranking);
        })
    },
    

    getRecentRankings(id, callback) {
        Ranking.find({rankListId: id}, (err, recentRankings) => {
            if (err) return console.error(err);
            // console.log("recentRankings", recentRankings)
            callback(recentRankings);
        })
        .sort({date: "descending"})
        .limit(10)
    },

    getRankReduction(id, callback) {
        RankReduction.findOne({rankListId: id}, (err, rankReduction) => {
            if (err) return console.error(err);
            // console.log("rankReduction", rankReduction)
            callback(rankReduction);
        })
    },

    createRankList(rankListToCreate, callback) {

        if (! validations.validateRankListCreation(rankListToCreate)) {
            callback({success: false})
            return
        }

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
            options: {},
            public: rankListToCreate.public,
            scaleName: rankListToCreate.scaleName
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
        
        // Find associated rankList for validation
        RankList.findOne({_id: rankingToCreate.rankListId}, (err, rankList) => {    
            if (err) return console.error(err);

            if (!validations.validateRankingCreation(rankingToCreate, rankList)) {
                callback({success: false})
                return
            }
            
            let newRanking = new Ranking({
                rankListId: rankingToCreate.rankListId,
                rankOrder: rankingToCreate.rankOrder,
                user: rankingToCreate.user,
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
                        // recountRankings(savedRanking.rankListId)
                        rankingCountIncrement(savedRanking.rankListId)
                        
                        // recalculateAggregations(savedRanking.rankListId)
                        
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
        })
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
            // e.g. [2,0,1] --> [0.5, 0.33, 1]
                // Corresponding index = 2, ranking = 0
                // --> pointmap[2] = 1
            // e.g. [1,0] --> [0.5, 1, 0]
            addedRankOrder.forEach((correspondingIndex, ranking) => {
                pointmap[correspondingIndex] = pointValue(ranking);
            });
            console.log(`Rank Order ${addedRankOrder} --> Point Map ${pointmap}`)
            
            // sortedPointTotals -> Array of form [[item1, pts1], [item2, pts2]]
            const updatedSortedPointTotals = dowdall.sortedPointTotals.map((item, index) => {
                let itemName = item[0];
                let prevPoints = item[1];
                let ogIndex = rankList.rankItems.indexOf(itemName)
                
                console.log(`${itemName}: ${prevPoints} + ${pointmap[ogIndex]}`)
                return [itemName, prevPoints + pointmap[ogIndex]]
            })
            
            .sort((a, b) => {
                return b[1] - a[1]; // Descending Order
                // return a[1] - b[1]; // Ascending Order
            })
            console.log(`New SPT ${updatedSortedPointTotals}`)

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

function recalculateAggregations(rankListId) {
    RankList.findOne({_id: rankListId}, (err, rankList) => {
        if (err) return console.error(err);
        // console.log("rankList", rankList)

        Ranking.find({rankListId: rankListId}, (err, rankings) => {
            if (err) return console.error(err);
            // console.log("rankings", rankings)


        })
    })

}

function deleteWholeRankingDatabase() {
    Ranking.remove((err, rankings) => {
        if (err) return console.error(err);
        console.log('removed', rankings);
    })
}

function recountRankings(rankListId) {
    Ranking.count({rankListId: rankListId}, (err, count) => {
        if (err) return console.error(err);
        RankList.findOne({_id: rankListId}, (err, rankList) => {
            rankList.rankingCount = count;
            rankList.save()
        })
    })
}

function rankingCountIncrement(rankListId) {
    RankList.findOne({_id: rankListId}, (err, rankList) => {
        rankList.rankingCount = rankList.rankingCount + 1;
        rankList.save()
    })
}

// deleteWholeRankingDatabase();
// deleteWholeRankReductionDatabase();
const schemas = require('./schemas.js');

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
var RankReduction = mongoose.model('RankReduction', rankReductionSchema)

db.on('error', console.error.bind(console, 'connection error:')); // on an error, calls the callback function

module.exports = {
    
    getAllRankLists(callback) {
        RankList.find((err, rankLists) => {
            if (err) return console.error(err);
            callback(rankLists);
        }).select('title id')
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
        newRankList.save((err, savedRankList) => {
            if (err) {
                console.error(err);
                callback({success: false})
            }
            callback({
                success: true,
                RankList: savedRankList
            })
        })
    },
    
    createRanking(rankingToCreate, callback) {
        let newRanking = new Ranking({
            rankListId: rankingToCreate.rankListId,
            rankOrder: rankingToCreate.rankOrder,
            user: rankingToCreate.user
        })
        newRanking.save((err, savedRanking) => {
            if (err) {
                console.error(err);
                callback({success: false})
            }
            this.updateAggregationsDowdall(savedRanking.rankListId, savedRanking.rankOrder, (updatedRankList) => {
                console.log("Successfully saved ranking and updated rankList", updatedRankList)
            })

            callback({
                success: true,
                ranking: savedRanking
            })
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

function deleteWholeRankReductionDatabase() {
    RankReduction.remove((err, rr) => {
        if (err) return console.error(err);
        console.log('removed', rr);
    })
}

// deleteWholeRankingDatabase();
// deleteWholeRankReductionDatabase();
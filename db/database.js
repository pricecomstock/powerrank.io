const schemas = require('./schemas.js');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://heroku_ld451znl:GAtcoydeupAwUs2@ds143778.mlab.com:43778/heroku_ld451znl')
mongoose.connect('mongodb://localhost/powerrank');
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

    getAllRankReductions(callback) {
        RankReduction.find((err, rankReductions) => {
            if (err) return console.error(err);
            callback(rankReductions);
        })
    },

    getRankList(id, callback) {
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

    createRankList(rankListToCreate, callback) {
        console.log(rankListToCreate)
        let newRankList = new RankList({
            title: rankListToCreate.title,
            rankItems: rankListToCreate.rankItems
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
            rankOrder: rankingToCreate.rankOrder
        })
        newRanking.save((err, savedRanking) => {
            if (err) {
                console.error(err);
                callback({success: false})
            }
            callback({
                success: true,
                ranking: savedRanking
            })
        })
    },

    analyzeRankings(rankListToAnalyzeId, callback) {
        
        pointValue = (i) => {
            // first place = n pts, 2nd = n/2, 3rd = n/3
            const n =  10.0
            return n / (i + 1)
        }

        RankList.findOne({_id: rankListToAnalyzeId}, (err, rankList) => {
            if (err) return console.error(err);
            
            const rankListLength = rankList.rankItems.length;

            Ranking.find({rankListId: rankListToAnalyzeId}, (err, rankings) => {
                if (err) return console.error(err);
                
                var pointmaps = rankings.map((ranking) => {
                    let pointmap = Array(rankListLength).fill(0) // Array of zeroes for each item in RankList
                    ranking.rankOrder.forEach((correspondingIndex, ranking) => { // These make sense for the ranked array of indices
                        pointmap[correspondingIndex] = pointValue(ranking);    
                    });
                    
                    return pointmap
                })
                
                // Add all the points for each slot together
                var pointTotals = pointmaps.reduce((cumulativePointmap, currentPointmap) => {
                    // console.log(`${cumulativePointmap} + ${currentPointmap}`)
                    return cumulativePointmap.map((pointValue, index) =>{
                        return pointValue + currentPointmap[index]
                    })
                }, Array(rankListLength).fill(0))
                
                // // Create an object that correlates each object on the RankList with its point value
                // var pointTotalsObject = pointTotals.reduce((ptObject, currentPointValue, index) => {
                //     console.log(`${index}: ${rankList.rankItems[index]} has ${currentPointValue} points`)
                //     ptObject[rankList.rankItems[index]] = currentPointValue;
                //     return ptObject;
                // }, {})
                // // Object.keys(pointTotalsObject).forEach

                var sortedPointTotals = pointTotals.map((points, index) => {
                    return [rankList.rankItems[index], points]
                })
                .sort((a, b) => {
                    return b[1] - a[1]; // Descending Order
                    // return a[1] - b[1]; // Ascending Order
                })
                console.log(sortedPointTotals)

                let newRankReduction = new RankReduction({
                    rankListId: rankListToAnalyzeId,
                    sortedPointTotals: sortedPointTotals,
                })
                newRankReduction.save((err, savedRankReduction) => {
                    if (err) {
                        console.error(err);
                        callback({success: false})
                    }
                    callback({
                        success: true,
                        RankList: savedRankReduction
                    })
                })
            })
        })
    }
}

module.exports.getAllRankReductions((results) => console.log(results[0].sortedPointTotals))
// module.exports.analyzeRankings('xDL7OYBr', (results) => console.log(results))
// db.once('open', () => { // once it's "open", calls the callback function
    
//     var RankList = mongoose.model('RankList', rankListSchema)

//     // var testRankList = new RankList({
//     //     title: "Test",
//     //     items: ["hello", "ok", "goodbye"]
//     // })

//     // testRankList.save((err, testRankList) => {
//     //     if (err) return console.error(err);
//     //     // console.log('saved', testRankList)
//     // }) // Save it to the DB

//     RankList.find((err, rankLists) => {
//         if (err) return console.error(err);
//         console.log(rankLists);
//     })
    
//     // RankList.find({_id: 'B1r5LHcwG'}, (err, rankLists) => {
//     //     if (err) return c2onsole.error(err);
//     //     console.log(rankLists);
//     // })

// });

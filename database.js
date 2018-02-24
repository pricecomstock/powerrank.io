var idgen = require('./idgenerate.js');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://heroku_ld451znl:GAtcoydeupAwUs2@ds143778.mlab.com:43778/heroku_ld451znl')
mongoose.connect('mongodb://localhost/powerrank');
var db = mongoose.connection;

// Create Schemas

const rankListSchema = {
    _id: {
        type: String,
        default: idgen.generate
    },
    title: {
        type: String,
        required: true
    },
    rankItems: {
        type: Array,
        required: true
    },
    user: String,
    options: Object
}

const rankingSchema = {
    _id: {
        type: String,
        default: idgen.generate
    },
    rankListId: {
        type: String,
        required: true
    },
    rankOrder: { // Array of integers, index 0, which corresponds to the index of each item in the ranklist
        type: Array,
        required: true
    },
    user: String
}

// Create models
var RankList = mongoose.model('RankList', rankListSchema)
var Ranking = mongoose.model('Ranking', rankingSchema)

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

    // analyzeRankings(rankListToAnalyzeId, callback) {
    //     db.ranklists.mapReduce(
    //         () => {}// MAP
    //         (key, values) => // REDUCE
    //         {
    //             query: {rankListId: rankListToAnalyzeId},
    //             out:
    //         }
    //     )
    // }
}

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

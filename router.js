var express = require('express');
var rankDb = require('./db/database.js')

var router = express.Router();
router.use(express.json());

// Base route (easy connectivity test)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
//-----//
// GET //
//-----//

// get all RankLists
router.get('/ranklists', function(req, res) {
    rankDb.getAllRankLists( (results) => {
        res.json(results);
    });
});

// get a RankList
router.get('/ranklist/:id', function(req, res) {
    let id = req.params.id // maybe validate input here?
    console.log("id", id)
    rankDb.getRankList(id, (results) => {
        res.json(results);
    });
});

// get a Ranking
router.get('/ranking/:id', function(req, res) {
    let id = req.params.id // maybe validate input here?
    console.log("id", id)
    rankDb.getRanking(id, (results) => {
        res.json(results);
    });
});

// get rankAnalysis
router.get('/rankanalysis/:id', function(req, res) {
    let id = req.params.id // maybe validate input here?
    console.log("rankanalysis on id", id)
    rankDb.analyzeRankings(id, (results) => {
        res.json(results);
    });
});


//------//
// POST //
//------//

// TODO: These will cause the entire application to fail if the input is not correct.
// They either need to be manually checked, or more likely, some correct error handling
//   needs to be put around the rankDb call
// Probably both.

// Create a RankList
router.post('/createranklist', function(req, res) {
    rankDb.createRankList(req.body, (result) => {
        res.json(result);
    });
});

// Create a Ranking
router.post('/createranking', function(req, res) {
    rankDb.createRanking(req.body, (result) => {
        res.json(result);
    });
});


// Export
module.exports.router = router
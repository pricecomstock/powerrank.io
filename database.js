var shortid = require('shortid');

var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_ld451znl:GAtcoydeupAwUs2@ds143778.mlab.com:43778/heroku_ld451znl')

const rankingSchema = {
    _id: {
        type: String,
        default: shortid.generate
    },
    title: String,
    rankItems: Array
}

const rankListSchema = {
    _id: {
        type: String,
        default: shortid.generate
    },
    title: String,
    rankItems: Array
}

var db = mongoose.connection;

/*db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    
    var RankList = mongoose.model('RankList', rankListSchema)

    var testRankList = new RankList({
        title: "Test",
        items: ["hello", "ok", "goodbye"]
    })

    // testRankList.save((err, testRankList) => {
    //     if (err) return console.error(err);
    // }) // Save it to the DB


    // RankList.find((err, rankLists) => {
    //     if (err) return console.error(err);
    //     console.log(rankLists);
    // })
    
    RankList.find({_id: 'B1r5LHcwG'}, (err, rankLists) => {
        if (err) return c2onsole.error(err);
        console.log(rankLists);
    })

});*/
var express = require('express');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname));


/* API ROUTES */
var router = express.Router();

// Base route (easy connectivity test)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// Use all those above routes for the API
app.use('/api', router);

// Everything else should fall through to vue-router
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started ' + port);
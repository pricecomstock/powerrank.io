var express = require('express');
var api = require('./router.js').router;
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname));

// Use all those above routes for the API
app.use('/api', api);

// TODO: make it so incorrect API calls don't fall through to vue-router

// Everything else should fall through to vue-router
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started ' + port);
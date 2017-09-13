const express = require('express');
const app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(8080);
/**
 * Created by cristianotofani on 11/09/15.
 */

var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Prova_Maps.html'));
});

app.listen(8080);


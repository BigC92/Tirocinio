var express = require('express');
var router = express.Router();
var request = require("request");
var mathjs = require('mathjs');
var longitude = 360;
var latitude = 170.1022;

var zoom_lon = function(dLon){
    var rapporto = ((longitude*640)/(256*dLon));
    return Math.floor((mathjs.log(rapporto, 2)));
};

var zoom_lat = function(dLat){
    var rap = ((latitude*640)/(256*dLat));
    return Math.floor((mathjs.log(rap, 2)));
};

/*var latToY = function(lat){
    return ((-1*lat) + 90) * ( 640 / 180);
};

var lonToX = function(long){
    return (lon + 180) * (640 / 360);
};*/

var height = function(d, z){
    var altezza = (256*Math.pow(2,z)*d)/latitude;
    return altezza*0.7;
};

var width = function(d, z){
    var larghezza = (256*Math.pow(2,z)*d)/longitude;
    return larghezza;
}

/* GET home page. */
router.get('/image/:c_lat/:c_lon/:zoom', function(req, res) {
    var url = 'https://maps.googleapis.com/maps/api/staticmap?size=640x640&center=';
    console.log(url+req.params.c_lat+","+req.params.c_lon+"&zoom="+req.params.zoom);
    request(url+req.params.c_lat+","+req.params.c_lon+"&zoom="+req.params.zoom).pipe(res);
});

router.post("/map", function (req, res){
    var n_lat = req.body.n_lat;
    var n_long = req.body.n_long;
    var s_lat = req.body.s_lat;
    var s_long = req.body.s_long;


    var zoom = Math.min(zoom_lat(Math.abs(mathjs.subtract(n_lat, s_lat))),
        zoom_lon(Math.abs(mathjs.subtract(n_long, s_long))));
    var c_lat = ((parseFloat(n_lat) + parseFloat(s_lat))/2);
    var c_lon = ((parseFloat(n_long)+parseFloat(s_long))/2);
    var h = height(Math.abs(mathjs.subtract(n_lat,s_lat)),zoom);
    var w = width(Math.abs(mathjs.subtract(n_long, s_long)), zoom);
    var a = req.body;
    a.zoom = zoom;
    a.c_lat = c_lat;
    a.c_lon = c_lon;
    a.height = h;
    a.width = w;
    console.log("\naltezza = "+h+"\nlarghezza = "+w+"\n");
    res.render("map", a);
});

module.exports = router;

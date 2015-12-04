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

var height = function(d,z){
    var altezza = (256*Math.pow(2,z)*d)/latitude;
    return altezza*0.7;
};

var width = function(d, z){
    var larghezza = (256*Math.pow(2,z)*d)/longitude;
    return larghezza;
}

/* GET home page. */
router.get('/image/:c_lat/:c_lon/:zoom', function(req, res) {
    var url = 'https://maps.googleapis.com/maps/api/staticmap?size=640x640&' +
        'key=AIzaSyBmYC8wXlEiF1ZNIhjWJCVkVilzWA_VfeA&center=';
    console.log(url+req.params.c_lat+","+req.params.c_lon+"&zoom="+req.params.zoom);
    request(url+req.params.c_lat+","+req.params.c_lon+"&zoom="+req.params.zoom).pipe(res);
});

router.post("/map", function (req, res){
    var n_lat = parseFloat(req.body.n_lat);
    var n_long = parseFloat(req.body.n_long);
    var s_lat = parseFloat(req.body.s_lat);
    var s_long = parseFloat(req.body.s_long);

    var zoom = Math.min(zoom_lat(Math.abs(n_lat- s_lat)),
        zoom_lon(Math.abs(n_long - s_long)))+1;
    var c_lat = (n_lat+s_lat)/2;
    var c_lon = (n_long+s_long)/2;
    var h = height(Math.abs(n_lat - s_lat),zoom);
    var w = width(Math.abs(n_long - s_long), zoom);
    var a = req.body;
    a.zoom = zoom;
    a.c_lat = c_lat;
    a.c_lon = c_lon;
    a.height = h;
    a.width = w;
    res.render("map", a);
});

module.exports = router;

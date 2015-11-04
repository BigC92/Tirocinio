var express = require('express');
var router = express.Router();
var request = require("request");
var mathjs = require('mathjs');

var zoom_lon = function(dLon){
    var rapporto = ((360*640)/(256*dLon));
    return Math.floor((mathjs.log(rapporto, 2)));
};

var zoom_lat = function(dLat){
    var rap = ((170.10226*640)/(256*dLat));
    return Math.floor((mathjs.log(rap, 2)));
};

/* GET home page. */
router.get('/image/:ne_lat/:sw_lat/:ne_long/:sw_long', function(req, res) {
    var url = 'https://maps.googleapis.com/maps/api/staticmap?size=640x640&center=';
    console.log(req.params);
    var zoom = Math.min(zoom_lat(Math.abs(mathjs.subtract(req.params.ne_lat, req.params.sw_lat))),
        zoom_lon(Math.abs(mathjs.subtract(req.params.ne_long, req.params.sw_long))));
    var center = ((parseFloat(req.params.ne_lat) + parseFloat(req.params.sw_lat))/2)+","+
        ((parseFloat(req.params.ne_long) + parseFloat(req.params.sw_long))/2);
    console.log(zoom_lat(Math.abs(mathjs.subtract(req.params.ne_lat, req.params.sw_lat))),
        zoom_lon(Math.abs(mathjs.subtract(req.params.ne_long, req.params.sw_long))));
    console.log(url+center+"&zoom="+zoom);
    request(url+center+"&zoom="+zoom).pipe(res);
});

router.post("/map", function (req, res){
    res.render("map", req.body);
});

module.exports = router;

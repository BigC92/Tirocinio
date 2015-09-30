var express = require('express');
var router = express.Router();
var base64Img = require('base64-img');

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'https://maps.googleapis.com/maps/api/staticmap?zoom=2&size=640x640&scale=2&key=AIzaSyBmYC8wXlEiF1ZNIhjWJCVkVilzWA_VfeA';
  base64Img.requestBase64(url, function(e, r, body) {
    res.render('map', {url: body});
  });
});

module.exports = router;

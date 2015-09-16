var express = require('express');
var router = express.Router();
var base64Img = require('base64-img');

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'https://maps.googleapis.com/maps/api/staticmap?center=Rome,IT&zoom=10&size=1000x1000&scale=2&key=AIzaSyBmYC8wXlEiF1ZNIhjWJCVkVilzWA_VfeA';
  base64Img.requestBase64(url, function(e, r, body) {
    res.render('index', {url: body});
  });
});

module.exports = router;

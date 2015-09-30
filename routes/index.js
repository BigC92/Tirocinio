var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/image/:center', function(req, res) {
  var url = 'https://maps.googleapis.com/maps/api/staticmap?zoom=5&size=640x640&key=AIzaSyBmYC8wXlEiF1ZNIhjWJCVkVilzWA_VfeA&center='
  request(url+req.params.center).pipe(res);
});

router.post("/map", function (req, res){
  res.render("map", req.body);
})

module.exports = router;

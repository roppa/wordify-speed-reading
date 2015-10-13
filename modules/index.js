var express = require('express');
var router = express.Router();

var engines = {
  "backbone" : "backbone",
  "angular" : "angular"
};

/* GET home page. */
router.get('/', function(req, res) {
  var frontEndEngine = engines[req.query.engine] || "backbone";
  res.render(frontEndEngine + '/pages/index', { title: 'Wordify' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var controller = require('./apiController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', controller.post);

module.exports = router;

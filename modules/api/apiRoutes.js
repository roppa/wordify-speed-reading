var express = require('express');
var router = express.Router();
var controller = require('./apiController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Wordify - Speed read the web' });
});

router.post('/', controller.post);

router.put('/', controller.put);

module.exports = router;

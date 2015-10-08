var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Wordify' });
});

/* GET sample page. */
router.get('/sample', function(req, res) {
  res.render('pages/sample', { title: 'Wordify' });
});

module.exports = router;

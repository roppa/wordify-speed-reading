var express = require('express');
var router = express.Router();
var http = require('http');
var jsdom = require('jsdom');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/**
 * / - POST
 * @param  {string} url string. At the moment we use schema.org to get article content. If this is not present content may not be comprehensible :-p
 * @return {object} JSON object. If successful the data attribute will contain the article content. If an error occurs, then an error attribute will contain the error message.
 */
router.post('/', function(req, res) {

  var url = req.body.url;
  var text = "";

  jsdom.env(
    url,
    function (err, window) {
      if (err) {
        res.json({ error : err });
      }
      //lets start using schema.org
      text = window.document.querySelector("div[itemprop='articleBody']").textContent.replace(/\r?\n|\r/g, " ");
      res.json({ data: text });
    }
  );

});

module.exports = router;

var http = require('http');
var jsdom = require('jsdom');
var redis;

if (process.env.REDISCLOUD_URL) {
  redis = require('redis').redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
} else {
  redis = require("redis").createClient();
}

redis.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = {

  /**
   * / - POST
   * @param  {string} url string. At the moment we use schema.org to get article content. If this is not present content may not be comprehensible :-p
   * @return {object} JSON object. If successful the data attribute will contain the article content. If an error occurs, then an error attribute will contain the error message.
   */
  post: function(req, res) {

    var url = req.body.url;
    var text = "";

    redis.get(url, function (err, result) {
      if (err) {
        res.json({ error : err });
      }
      if (result === null) {

        jsdom.env(url, function (err, window) {
          var page;
          if (err) {
            res.json({ error : err });
          }
          //semantic schema.org (guardian), proprietary (BBC)
          page = window.document.querySelector("div[itemprop='articleBody']") || window.document.querySelector("[property='articleBody']");
          //lets start using schema.org
          if (page) {
            text = page.textContent.replace(/\r?\n|\r/g, " ");
            redis.set(url, text);
            res.json({ data: text });
          } else {
            text = window.document.body.textContent.replace(/\r?\n|\r/g, " ");
            redis.set(url, text);
            res.json({ error : "The page requested was not semantically formatted. ", data: text });
          }
        }); //jsdom.env

      } else {
        res.json({ data: result });
      }

    });

  },

  /**
   * / - PUT
   * @param  {string} url string.
   * @param  {string} text string.
   * @return {object} JSON object. If successful the data attribute will contain the article content. If an error occurs, then an error attribute will contain the error message.
   */
  put: function (req, res) {

    var url = req.body.url;
    var text = req.body.text;

    if (!url || !text) {
      res.json({ error : "Either url or text were invalid." });
    }

    redis.set(url, text, function (err, result) {

      if (err) {
        res.json({ error : "Error: " + err.message });
      } else {
        res.sendStatus(200);
      }

    });

  }

};
var http = require('http');
var jsdom = require('jsdom');
var redis = require("redis");
var client = redis.createClient();

module.exports = {

  /**
   * / - POST
   * @param  {string} url string. At the moment we use schema.org to get article content. If this is not present content may not be comprehensible :-p
   * @return {object} JSON object. If successful the data attribute will contain the article content. If an error occurs, then an error attribute will contain the error message.
   */
  post: function(req, res) {

    var url = req.body.url;
    var text = "";

    client.on("error", function (err) {
      console.log("Error " + err);
    });

    client.get(url, function (err, result) {
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
            client.set(url, text);
            res.json({ data: text });
          } else {
            res.json({ error : "The page requested is not semantically formatted :-(" });
          }
        }); //jsdom.env

      } else {
        res.json({ data: result });
      }

    });

  }

};
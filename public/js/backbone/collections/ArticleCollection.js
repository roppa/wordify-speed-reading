var ArticleCollection = Backbone.Collection.extend({
  
  model: Article,

  addArticle: function (url) {

    var deferred = $.Deferred();

    event.stopPropagation();
    event.preventDefault();
    
    deferred.notify("Loading...");

    $.ajax({
      url: "/api/",
      method: 'post',
      data: { url : url },
      success: function (result) {
        if (result.error) {
          deferred.reject(result);
        } else {
          text = result.data;
          meta = wordify.stats(text);
          deferred.resolve("Sorted!");
          this.add({ url: url, text : text, meta : meta });
        }
      }.bind(this)});

    return deferred.promise();

  },

  addText: function (text) {
    this.add({ url: text.substr(0, 10), text: text, meta: wordify.stats(text) });
  }

});
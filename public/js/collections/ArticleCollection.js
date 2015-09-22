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
          deferred.reject(result.error);
        } else {
          text = result.data;
          meta = wordify.stats(text);
          deferred.resolve("Sorted!");
          this.add({ text : text, meta : meta });          
        }
      }.bind(this)});

    return deferred.promise();

  }

});
var ArticleCollection = Backbone.Collection.extend({
  
  model: Article,

  addArticle: function (url) {

    event.stopPropagation();
    event.preventDefault();
    
    $.ajax({
      url: "/api/",
      method: 'post',
      data: { url : url },
      success: function (result) {
        if (result.error) {
          console.log(result.error);
        } else {
          text = result.data;
          meta = wordify.stats(text);
          this.add({ text : text, meta : meta });            
        }
      }.bind(this)});

  }

});
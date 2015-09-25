describe("Collction test", function () {

  var articleCollection;

  before(function () {
    var TestArticleCollection = ArticleCollection.extend({
      addArticle: function (url) {
        this.add({ url: "http://test.com", text : "The cat sat on the mat", meta : {} });
      }
    });

    articleCollection = new TestArticleCollection();

  });

  describe("Article Collection", function () {

    it("should call addArticle", function () {

      var addArticle = sinon.spy(articleCollection, 'addArticle');
      
      expect(addArticle.called).to.be.false;

      articleCollection.addArticle("http://google.com");
      
      expect(addArticle.called).to.be.true;
      
      articleCollection.addArticle.restore();
    
    });

  });

});
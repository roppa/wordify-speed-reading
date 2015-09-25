describe("Testing the Article model", function () {

  var article = new Article();

  it("should have default values", function () {
    expect(article.attributes).to.have.all.keys("url", "text", "meta");
  });

});
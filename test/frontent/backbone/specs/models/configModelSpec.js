describe("Testing the Config model", function () {

  var article = new ConfigModel();

  it("should have default values", function () {
    expect(article.attributes).to.have.all.keys("type", "wave", "wordSize", "wpm", "fontSize");
  });

});
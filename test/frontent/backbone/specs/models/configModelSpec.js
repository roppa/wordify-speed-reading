describe("Testing the Config model", function () {

  it("should have default values", function () {

    var config = new ConfigModel();
    
    expect(config).to.be.ok;
  
    expect(config.attributes).to.have.all.keys("type", "wave", "wordSize", "wpm", "fontSize");

    expect(config.attributes.type).to.equal("chunk");

    expect(config.attributes.wave).to.eql([20, 30, 40]);

    expect(config.attributes.wordSize).to.equal(3);

    expect(config.attributes.fontSize).to.equal(1.5);

    expect(config.attributes.wpm).to.equal(300);

  });

});
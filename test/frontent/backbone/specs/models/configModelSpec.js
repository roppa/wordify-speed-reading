describe("Testing the Config model", function () {

  var config;

  beforeEach(function () {
    config = new ConfigModel();
  });

  afterEach(function () {
    localStorage.removeItem("config");
  });

  it("should have default values", function (done) {

    expect(config).to.be.ok;
    expect(config.attributes).to.have.all.keys("type", "wave", "wordSize", "wpm", "fontSize");
    expect(config.attributes.type).to.equal("chunk");
    expect(config.attributes.wave).to.eql([20, 30, 40]);
    expect(config.attributes.wordSize).to.equal(3);
    expect(config.attributes.fontSize).to.equal(1.5);
    expect(config.attributes.wpm).to.equal(300);

    done();

  });

  it("should set and be saved to local storage", function (done) {

    var localStorageConfig;

    config.set("wordSize", 1);
    expect(config.get("wordSize")).to.equal(1);

    config.set("fontSize", 4);
    expect(config.attributes.fontSize).to.equal(4);

    config.set("wpm", 600);
    expect(config.attributes.wpm).to.equal(600);

    expect(JSON.parse(localStorage.getItem("config")).wordSize).to.equal(1);
    expect(JSON.parse(localStorage.getItem("config")).fontSize).to.equal(4);
    expect(JSON.parse(localStorage.getItem("config")).wpm).to.equal(600);

    done();

  });

});
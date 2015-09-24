var ConfigModel = Backbone.Model.extend({
  
  defaults: {
    type: "chunk", //chunk or wave
    wave: [20, 30, 40],
    wordSize: 3,
    wpm: 300, //1 second = 1000, 400 wpm = 60000 / 400
  },

  initialize: function () {
    this.fetch();
    this.on('change', this.save, this);
  },

  fetch: function () {
    this.set(JSON.parse(localStorage.getItem("config")));
  },

  save: function () {
    localStorage.setItem("config", JSON.stringify(this.toJSON()));
  }

});
var ConfigModel = Backbone.Model.extend({
  
  defaults: {
    type: "chunk", //chunk or wave
    chunks: null,
    animate: null,
    playing: false,
    wordSize: 3,
    wpm: 60000 / 300, //1 second = 1000, 400 wpm = 60000 / 400
    count: 0
  },

  initialize: function () {
    console.log("PlayerModel initialized");
    this.fetch();
    this.on('change', this.save, this);
  },

  fetch: function () {
    console.log("fetched");
    this.set(JSON.parse(localStorage.getItem(this.id)));
  },

  save: function () {
    console.log("saved");
    localStorage.setItem(this.id, JSON.stringify(this.toJSON()));
  }

});
var ConfigView = Backbone.View.extend({

  className: "config",

  template: _.template(app.templates.configTemplate),

  events: {
    "change #wpm" : "setWordsPerMinute",
    "change #wordSize" : "setWordSize",
    "change #fontSize" : "setFontSize"
  },

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(_.template(this.template(this.model.attributes)));
  },

  setWordsPerMinute: function () {
    var wpm = this.$('#wpm').val();
    this.model.set("wpm", wpm);
    this.$('label[for="wpm"]').html(wpm + ' <abbr title="Words per minute">wpm</abbr>');
  },

  setWordSize: function () {
    var wordSize = this.$('#wordSize').val();
    this.model.set("wordSize", wordSize);
    this.$('label[for="wordSize"]').html("Length (" + wordSize + ")");
  },

  setFontSize: function () {
    var fontSize = this.$('#fontSize').val();
    this.model.set("fontSize", fontSize);
    this.$('label[for="fontSize"]').html("Font size (" + fontSize + ")");
  }

});
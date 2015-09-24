var ConfigView = Backbone.View.extend({

  className: "config",

  template: _.template('<h2>Config</h2> \
    <div class="settings"> \
    <p> \
    <label for="wpm"><%= wpm %> <abbr title="Words per minute">wpm</abbr></label> \
    <input id="wpm" type="range" min="50" value="<%= wpm %>" max="800"> \
    </p><p> \
    <label for="wordSize">Length (<%= wordSize %>)</label> \
    <input id="wordSize" type="range" min="1" value="<%= wordSize %>" max="6"> \
    </p><p> \
    <label for="fontSize">Font size (<%= fontSize %>)</label> \
    <input id="fontSize" type="range" min="1" value="<%= fontSize %>" max="4.5" step="0.5"> \
    </p> \
    </div>'),

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
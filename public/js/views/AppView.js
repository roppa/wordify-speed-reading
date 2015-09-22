var AppView = Backbone.View.extend({

  el: "#app",

  initialize: function () {

    this.title = "<h1>Wordify</h1>";

    this.input = new InputView({
      collection: this.collection
    });

    this.list = new ListView({
      collection: this.collection
    });

    this.player = new PlayerModel({});

    this.render();
  },

  render: function () {

    this.$el.append([
      this.title,
      this.input.$el,
      this.list.$el
    ]);

    return this;
  }

});
var WordifyView = Backbone.View.extend({
  
  className: 'wordify',

  template: _.template('<div class="words"></div><div class="player"></div><button class="start">Start</button><button class="stop">Stop</button>'),

  events: {
    "click .start" : "play",
    "click .stop" : "pause"
  },

  //move this into a config model with corresponding view. pass that into this view too
  player: {
    chunks: null,
    animate: null,
    animationElement: null,
    playing: false,
    wpm: null, //1 second = 1000, 400 wpm = 60000 / 400
    count: 0
  },

  initialize: function() {

    var start = Date.now();

    this.player.wpm = 60000 / this.model.get("wpm");

    this.listenTo(this.collection,  'change add remove reset', this.render);
    this.listenTo(this.model, "change:wordSize", function () { this.player.count = 0; this.render(); }.bind(this) );

    this.render();
    this.player.animationElement = this.$('.words');

    this.player.animate = function (timestamp) {

      var now = Date.now();

      if (now - start > 60000 / this.model.get("wpm")) {
        start = now;
        this.player.animationElement.html(this.player.chunks[this.player.count]);
        this.player.count++;
      }
      
      if (this.player.playing) {
        window.requestAnimationFrame(this.player.animate);
        if (this.player.count >= this.player.chunks.length) {
          this.player.count = 0;
          this.pause();
        }
      }

    }.bind(this);

  },

  play: function () {
    if (this.player.playing) {
      return;
    }
    this.player.playing = true;
    window.requestAnimationFrame(this.player.animate);
  },

  pause: function () {
    if (!this.player.playing) {
      return;
    }
    this.player.playing = false;
    cancelAnimationFrame(this.player.animate);
  },

  render: function() {

    //var chunks = wordify.wave(this.collection.get('text'), [10,20,30,40]);
    var wordSize = this.model.get("wordSize");

    this.player.chunks = [];

    this.collection.each(function (model) {
      this.player.chunks = this.player.chunks.concat(wordify.chunk(model.get('text'), +wordSize));
    }.bind(this));

    if(this.collection.length > 0) {
      this.$el.html(_.template(this.template()));
      this.player.animationElement = this.$('.words');
    }

    return this;

  }

});
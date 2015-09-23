var WordifyView = Backbone.View.extend({
  
  className: 'wordify',

  template: _.template('<div class="words"></div><div class="player"></div><button class="start">Start</button><button class="stop">Stop</button><p><label for="wpm">300</label><input id="wpm" type="range" min="50" value="300" max="800" /></p>'),

  events: {
    "click .start" : "play",
    "click .stop" : "pause",
    "change #wpm" : "setWordsPerMinute"
  },

  //move this into a config model with corresponding view. pass that into this view too
  player: {
    type: "chunk", //chunk or wave
    chunks: null,
    animate: null,
    animationElement: null,
    playing: false,
    wordSize: 3,
    wpm: 60000 / 300, //1 second = 1000, 400 wpm = 60000 / 400
    count: 0
  },

  setWordsPerMinute: function () {
    this.player.wpm = 60000 / this.$('#wpm').val();
    this.$('label[for="wpm"]').html(this.$('#wpm').val());
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

  initialize: function() {

    var start = Date.now();

    this.listenTo(this.collection,  'change add remove reset', this.render);

    this.render();

    this.player.animationElement = this.$('.words');

    this.player.animate = function (timestamp) {

      var now = Date.now();

      if (now - start > this.player.wpm) {
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

  render: function() {

    //var chunks = wordify.wave(this.collection.get('text'), [10,20,30,40]);
 
    this.player.chunks = [];

    this.collection.each(function (model) {
      this.player.chunks = this.player.chunks.concat(wordify.chunk(model.get('text'), this.player.wordSize));
    }.bind(this));

    if(this.collection.length > 0) {
      this.$el.html(_.template(this.template()));
      this.player.animationElement = this.$('.words');
    }

    return this;

  }

});
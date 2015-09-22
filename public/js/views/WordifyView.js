var WordifyView = Backbone.View.extend({
  
  className: 'wordify',

  template: _.template('<div class="words"></div><div class="player"></div><button class="start">Start</button><button class="stop">Stop</button>'),

  events: {
    "click .start" : "play",
    "click .stop" : "pause"
  },

  player: {
    anim: null,
    chunks: null,
    state: false,
    wpm: 60000 / 400, //1 second = 1000, 400 wpm = 60000 / 400
    count: 0
  },

  play: function () {

    if (this.player.state) {
      return;
    }

    this.player.state = true;
    
    window.requestAnimationFrame(this.player.anim);

  },

  pause: function () {
    if (!this.player.state) {
      return;
    }
    this.player.state = false;
    cancelAnimationFrame(this.player.anim);
  },

  initialize: function() {

    var start = Date.now();
    var animationElement;

    this.render();

    animationElement = this.$('.words');

    this.player.anim = function (timestamp) {

      var now = Date.now();

      if (now - start > this.player.wpm) {
        start = now;
        animationElement.html(this.player.chunks[this.player.count]);
        this.player.count++;
      }
      
      if (this.player.state) {
        window.requestAnimationFrame(this.player.anim);
      }

    }.bind(this);

  },

  render: function() {
    
    //var chunks = wordify.wave(this.model.get('text'), [10,20,30,40]);
    this.player.chunks = wordify.chunk(this.model.get('text'), 2)

    this.$el.html(_.template(this.template()));

    return this;

  }

});
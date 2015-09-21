var WordifyView = Backbone.View.extend({
  
  className: 'wordify',

  template: _.template('<div class="words"></div><div class="player"></div>'),

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

    //var chunks = wordify.wave(this.model.get('text'), [10,20,30,40]);
    this.player.state = true;
    var element = this.$('.words');

    this.player.anim = window.setInterval(function () {
      if (this.player.count >= this.player.chunks.length) {
        window.clearInterval(this.player.anim);
        this.player.state = false;
      }
      this.$('.words').html(this.player.chunks[this.player.count]);
      this.player.count++;
    }.bind(this), this.player.wpm);

    // this.player.anim = function (timestamp) {

    // }:

    // function step(timestamp) {
    //   if (!start) start = timestamp;
    //   var progress = timestamp - start;
    //   element.style.left = Math.min(progress/10, 200) + "px";
    //   if (progress < 2000) {
    //     window.requestAnimationFrame(step);
    //   }
    // }

    // window.requestAnimationFrame(step);


  },

  pause: function () {
    if (!this.player.state) {
      return;
    }
    this.player.state = false;
    //cancelAnimationFrame(this.player.anim);
    window.clearInterval(this.player.anim);
  },

  initialize: function() {
    this.render();
  },

  render: function() {
     
    this.player.chunks = wordify.chunk(this.model.get('text'), 2)

    this.$el.html(_.template(this.template()));

    this.$el.append('<button class="start">Start</button>');
    this.$el.append('<button class="stop">Stop</button>');

    return this;

  }

});
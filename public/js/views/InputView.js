var InputView = Backbone.View.extend({

    el: '<input type="url" required>',

    events: {
      'keydown': 'keyAction',
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.resetInput();
      return this;
    },

    keyAction: function(e) {

      var isEnterKey = (e.which === 13);

      if(isEnterKey) {
        if (this.$el.val().match(/^(http(s)?:\/\/[a-zA-Z0-9\-_]+\.[a-zA-Z]+(.)+)+/gm)) {
          this.collection.addArticle(this.$el.val());
          this.clearInput();
        } else {
         this.resetInput();
        }
      }

    },

    resetInput: function() {
      this.$el.attr({
        placeholder: 'Enter a url'
      });
      this.clearInput();
    },

    clearInput: function() {
      this.$el.val('');
    }

});

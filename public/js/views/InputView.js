var InputView = Backbone.View.extend({

    el: '<input type="url">',

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

      if(!isEnterKey) {

        this.$el.attr({
          placeholder: 'Sorry, invalid url'
        });

        this.clearInput();

      } else {

        this.collection.addArticle(this.$el.val());
        this.resetInput();

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

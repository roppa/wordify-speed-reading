var InputView = Backbone.View.extend({

    template: _.template(app.templates.inputViewTemplate),

    events: {
      'keydown': 'keyAction',
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(_.template(this.template()));
      this.resetInput();
      return this;
    },

    keyAction: function(e) {

      var isEnterKey = (e.which === 13);
      var ajaxStatus;
      var message;

      if(isEnterKey) {

        if (this.$("input").val().match(/^(http(s)?:\/\/[a-zA-Z0-9\-_]+\.[a-zA-Z]+(.)+)+/gm)) {

          message = this.$("#message");
          
          $.when(this.collection.addArticle(this.$("input").val())).then(
            function(status) { //done
              if (status.error) {
                //display copy with input form
                //add a handler for PUT
              } else {              
                message.html(status);
              }
              window.setTimeout(function () {
                message.html("");
              }, 1000);
            },
            function(status) { //fail
              message.html(status);
            },
            function(status) { //status
              message.html(status);
            }
          );

          this.clearInput();
        } else {
         this.resetInput();
        }
      }

    },

    resetInput: function() {
      this.$("input").attr({
        placeholder: 'Enter a url'
      });
      this.clearInput();
    },

    clearInput: function() {
      this.$("input").val('');
    }

});

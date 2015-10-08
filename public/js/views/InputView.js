var InputView = Backbone.View.extend({

    template: _.template(app.templates.inputViewTemplate),

    events: {
      'keydown input[type=url]': 'submitUrl',
      'click button': 'submitText',
    },

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(_.template(this.template()));
      this.resetInput();
      $(this.$el).show();
      return this;
    },

    toggle: function () {
      $(this.$el).toggle();
    },

    submitUrl: function (e) {

      var isEnterKey = (e.which === 13);
      var ajaxStatus;
      var message;
      var that = this;

      if (isEnterKey) {

        if (this.$("input").val().match(/^(http(s)?:\/\/[a-zA-Z0-9\-_]+\.[a-zA-Z]+(.)+)+/gm)) {

          message = this.$("#message");
          
          $.when(this.collection.addArticle(this.$("input").val())).then(
            function (status) { //done
              if (status.error) {
                that.$("textarea").val(message.text);
              } else {
                message.html(status);
                that.toggle();
              }
              window.setTimeout(function () {
                message.html("");
              }, 1000);
            },
            function (status) { //fail
              message.html(status);
            },
            function (status) { //status
              message.html(status);
            }
          );

          this.clearInput();
        } else {
         this.resetInput();
        }
      }

    },

    submitText: function () {
      
      var message;
      var text = this.$("textarea").val();

      if (text) {
        this.collection.addText(text);
        this.toggle();
      } else {
        message = this.$("#message");
        message.html("You need to paste some text");
        window.setTimeout(function () {
          message.html("");
        }, 1000);
      }

    },

    resetInput: function () {
      this.$("input").attr({
        placeholder: 'Enter a url'
      });
      this.clearInput();
    },

    clearInput: function () {
      this.$("input").val('');
    }

});

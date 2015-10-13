var ListView = Backbone.View.extend({

  template: _.template(app.templates.listViewTemplate),

  id: 'list',

  events: {
    "click button" : "addMoreText"
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  addMoreText: function () {
     Backbone.pubSub.trigger('add');
  },

  render: function() {

    this.$el.html(_.template(this.template()));

    this.entries = this.collection.models.map(function(model) {
      this.$("ul").append($('<li>' + model.get("url").substring(0, 20) + '&hellip;</li>')); 
    }.bind(this));

    if (this.collection.length > 0) {
      this.$el.append('<button class="add">+</button>');
    }

    return this;
  }

});

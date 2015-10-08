var ListView = Backbone.View.extend({

  tagName: 'ul',

  id: 'list',

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  render: function() {

    this.$el.empty();

    this.entries = this.collection.models.map(function(model) {
      this.$el.append($('<li><a href="' + model.get("url") + '" target="_blank">' + model.get("url").substr(0, 20) + '...</a></li>')); 
    }.bind(this));

    return this;
  }

});

var ListView = Backbone.View.extend({

  id: 'list',

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    //this.collection.on('add', this.render, this);
  },

  render: function() {

    this.$el.empty();

    this.entries = this.collection.models.map(function(model) {
      //TODO: this should be a list view. just list the articles that have been added
      return new WordifyView({
        model: model
      });
    });

    var $els = this.entries.map(function(entry) {
      return entry.$el;
    });

    this.$el.append($els);

    return this;
  }

});

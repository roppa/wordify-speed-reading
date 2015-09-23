var ConfigView = Backbone.View.extend({

  className: "config",

  template: _.template('<h2>Config</h2><div class="settings"></div>'),

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(_.template(this.template()));
  }

});
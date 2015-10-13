var app = app || {};

Backbone.pubSub = _.extend({}, Backbone.Events);

app = _.extend(app, new AppView({
  collection: new ArticleCollection()
}));
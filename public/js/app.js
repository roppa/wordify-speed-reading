var app = app || {};
app = _.extend(app, new AppView({
  collection: new ArticleCollection()
}));
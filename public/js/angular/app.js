"use strict";

var app = angular.module("wordifyApp", []);

app.run(function($rootScope) {

  var config = $rootScope.config = {};
  var articles = $rootScope.articles = [];

  config.wpm = 300;
  config.wordSize = 1;
  config.fontSize = 2.5;

});

app.controller("ConfigController", function ($scope) {
  
});

app.controller("ArticleUrlController", function ($scope) {

});

app.controller("ArticleTextController", function ($scope) {

  $scope.textArticle = "";

  $scope.submitText = function () {
    $scope.articles.push({ url: "test", text : $scope.textArticle });
  }

});

app.controller("ListController", function ($scope) {

});

app.controller("PlayerController", function ($scope) {
  
});
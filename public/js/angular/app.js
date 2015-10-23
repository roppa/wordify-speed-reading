"use strict";

///////////////////////////////////////////////////////////
// App
///////////////////////////////////////////////////////////

var app = angular.module("wordifyApp", ["wordify.controllers", "Articles", "Config", "Player"]);

app.run(function ($rootScope, Config, Articles) {
  $rootScope.articles = Articles.articles;
  $rootScope.config = Config;
});

///////////////////////////////////////////////////////////
// Controllers
///////////////////////////////////////////////////////////

angular.module("wordify.controllers", [])

  .controller("ArticleUrlController", ['$scope', function ($scope) {

    $scope.article = {
      url: ""
    };

    $scope.submitUrl = function () {

    };

  }])

  .controller("InputController", function ($scope) {

  })

  .controller("ArticleTextController", function ($scope, Articles, Player) {

    $scope.article = {
      text: ""
    };

    $scope.submitText = function (e) {
      if ($scope.article.text !== "") {
        Articles.articles.push({ url: $scope.article.text.substring(0, 10) + "...", text : $scope.article.text });
        $scope.article.text = "";
        $scope.config.editMode = false;
        Player.generateWords();
      }
    };

  })

  .controller("ListController", function ($scope) {

    $scope.remove = function (index) {
      $scope.articles.splice(index, 1);
      if ($scope.articles.length <= 0) {
        $scope.config.editMode = true;
      }
    };

    $scope.add = function () {
      $scope.config.editMode = true;
    };

  })

  .controller("PlayerController", function ($rootScope, $scope, Player) {

    $scope.player = Player;
    $scope.player.setFontSize($rootScope.config.fontSize);

    $scope.$watch(function () {
      return $rootScope.config.fontSize; 
    }, function (newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.player.setFontSize(newValue);
      }
    });

  })

  .controller("ConfigController", function ($scope) {

  });

///////////////////////////////////////////////////////////
// Services
///////////////////////////////////////////////////////////

angular.module('Articles', [])
  .factory('Articles', function () {
    return { "articles" : [] };
  });

angular.module('Config', [])
  .factory('Config', function () {
    return {
      wpm: 300,
      wordSize: 1,
      fontSize: 2.5,
      editMode: true
    }
  });

angular.module("Player", ["Articles", "Config"])
  .factory("Player", function (Articles, Config, $window, $rootScope) {

    var start = Date.now();
    var player = {};

    player.chunks = [];

    player.playing = false;
    player.count = 0;
    player.words = "";


    player.animate = function (timestamp) {

      var now = Date.now();

      if (now - start > 60000 / (+Config.wpm / +Config.wordSize )) {
        player.words = player.chunks[player.count];
        $rootScope.$apply();
        player.count++;
        start = now;
      }
      
      if (player.playing) {
        $window.requestAnimationFrame(player.animate);
        if (player.count >= player.chunks.length) {
          player.count = 0;
          player.stop();
        }
      }

    };

    player.start = function () {
      if (!player.playing) {
        player.playing = true;
        $window.requestAnimationFrame(player.animate);
      }
    };

    player.stop = function () {
      if (player.playing) {
        player.playing = false;
        $window.cancelAnimationFrame(player.animate);
      }
    };

    player.generateWords = function () {
      angular.forEach(Articles.articles, function (article, key) {
        player.chunks = player.chunks.concat(wordify.chunk(article.text, +Config.wordSize));
      });
    };

    player.setFontSize = function (size) {
      player.fontSize = size + 'rem';
    };

    return player;

  });

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

    return {
      chunks: [],
      playing: false,
      count: 0,
      words: "",

      animate: function (timestamp) {

        var now = Date.now();

        if (now - start > 60000 / (+Config.wpm / +Config.wordSize )) {
          this.words = this.chunks[this.count];
          $rootScope.$apply();
          this.count++;
          start = now;
        }
        
        if (this.playing) {
          $window.requestAnimationFrame(this.animate.bind(this));
          if (this.count >= this.chunks.length) {
            this.count = 0;
            this.stop();
          }
        }

      },

      start: function () {
        if (!this.playing) {
          this.playing = true;
          $window.requestAnimationFrame(this.animate.bind(this));
        }
      },

      stop: function () {
        if (this.playing) {
          this.playing = false;
          $window.cancelAnimationFrame(this.animate.bind(this));
        }
      },

      generateWords: function () {
        angular.forEach(Articles.articles, function (article, key) {
          this.chunks = this.chunks.concat(wordify.chunk(article.text, +Config.wordSize));
        }.bind(this));
      },

      setFontSize: function (size) {
        this.fontSize = size + 'rem';
      }

    };

  });

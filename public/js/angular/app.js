"use strict";

///////////////////////////////////////////////////////////
// App
///////////////////////////////////////////////////////////

var app = angular.module("wordifyApp", ["wordify.controllers", "Articles", "Config", "Player", "Directives"]);

app.run(function ($rootScope, Config, Articles) {
  $rootScope.articles = Articles.articles;
  $rootScope.config = Config;
});

///////////////////////////////////////////////////////////
// Controllers
///////////////////////////////////////////////////////////

angular.module("wordify.controllers", [])

  .controller("ArticleUrlController", ['$scope', function ($scope) {

  }])

  .controller("InputController", function ($scope) {

    $scope.article = {
      url: ""
    };

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
    var chunks = [];
    var count = 0;
    var playing = false;

    return {
      words: "",

      animate: function (timestamp) {

        var now = Date.now();

        if (now - start > 60000 / (+Config.wpm / +Config.wordSize )) {
          this.words = chunks[count];
          $rootScope.$apply();
          count++;
          start = now;
        }
        
        if (playing) {
          $window.requestAnimationFrame(this.animate.bind(this));
          if (count >= chunks.length) {
            count = 0;
            this.stop();
          }
        }

      },

      start: function () {
        if (!playing) {
          playing = true;
          $window.requestAnimationFrame(this.animate.bind(this));
        }
      },

      stop: function () {
        if (playing) {
          playing = false;
          $window.cancelAnimationFrame(this.animate.bind(this));
        }
      },

      generateWords: function () {
        angular.forEach(Articles.articles, function (article, key) {
          chunks = chunks.concat(wordify.chunk(article.text, +Config.wordSize));
        }.bind(this));
      },

      setFontSize: function (size) {
        this.fontSize = size + 'rem';
      }

    };

  });

angular.module("Directives", [])
  .directive("urlInput", function (Articles, Player, $http) {
    return {
      require: 'ngModel',
      restrict: "E",
      transclude: true,
      templateUrl: 'url-input.html',
      link: function (scope, element, attributes, model) {

        element.bind("keydown keypress", function (event) {

          if(event.which === 13) {
            if (scope.urlInputForm.url.$valid) {
              $http({
                method: 'POST',
                url: '/api/',
                data: { "url" : url.value }
              }).then(function successCallback(response) {
                  Articles.articles.push({ url: url.value, text: response.data.data, meta: wordify.stats(response.text) });
                  url.value = "";
                  scope.config.editMode = false;
                  Player.generateWords();
                }, function errorCallback(response) {
                  console.log("Error", response);
                });

            } else {
              
            }
            event.preventDefault();
          }
        }); //bind

      }
    }
  });

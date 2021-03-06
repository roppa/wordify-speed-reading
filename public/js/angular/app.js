"use strict";

///////////////////////////////////////////////////////////
// App
///////////////////////////////////////////////////////////

var app = angular.module("wordifyApp", ["wordify.controllers", "Articles", "Config", "Player", "Directives"]);

app.run(function ($rootScope, Config, Articles) {
  $rootScope.articles = Articles.articles;
});

///////////////////////////////////////////////////////////
// Controllers
///////////////////////////////////////////////////////////

angular.module("wordify.controllers", [])

  .controller("ArticleUrlController", ['$scope', function ($scope) {

  }])

  .controller("InputController", function ($scope, Config) {

    $scope.article = {
      url: "",
      text: ""
    };

    $scope.config = Config;

  })

  .controller("ArticleTextController", function ($scope, Articles, Player, Config) {

    $scope.config = Config;

    $scope.submitText = function (e) {
      if ($scope.article.text !== "") {
        Articles.articles.push({ url: $scope.article.text.substring(0, 10) + "...", text : $scope.article.text });
        $scope.article.text = "";
        $scope.config.editMode = false;
        Player.generateWords();
      }
    };

  })

  .controller("ListController", function ($scope, $sce) {

    $scope.remove = function (index) {
      $scope.articles.splice(index, 1);
      if ($scope.articles.length <= 0) {
        $scope.config.editMode = true;
      }
    };

    $scope.add = function () {
      $scope.config.editMode = true;
    };

    $scope.truncate = function (url) {
      return $sce.trustAsHtml(url.substring(0, 20) + '&hellip;');
    };

  })

  .controller("PlayerController", function ($scope, Player, Config) {

    $scope.player = Player;
    $scope.player.setFontSize(Config.fontSize);
    $scope.config = Config;

    $scope.$watch(function () {
      return Config.fontSize;
    }, function (newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.player.setFontSize(newValue);
      }
    });

    $scope.$watch(function () {
      return Config.wordSize;
    }, function (newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.player.generateWords();
      }
    });

  })

  .controller("ConfigController", function ($scope, Config) {
    $scope.config = Config;

    $scope.$watch(function () {
      return Config.wordSize;
    }, function (newValue, oldValue) {
      if (newValue !== oldValue) {
        Config.wordSize = newValue;
        Config.save();
      }
    });

    $scope.$watch(function () {
      return Config.wpm;
    }, function (newValue, oldValue) {
      if (newValue !== oldValue) {
        Config.wpm = newValue;
        Config.save();
      }
    });

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

    var localStorageConfig = localStorage.getItem("config");
    if (localStorageConfig) {
      localStorageConfig = JSON.parse(localStorageConfig);
    }

    var config = localStorageConfig || {
      type: "chunk",
      wave: [20, 30, 40],
      wpm: 300,
      wordSize: 1,
      fontSize: 2.5,
      editMode: true
    };

    config.save = function () {
      localStorage.setItem("config", JSON.stringify(config));
    };

    return config;

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
        chunks = [];
        this.stop();
        count = 0;
        angular.forEach(Articles.articles, function (article, key) {
          chunks = chunks.concat(wordify.chunk(article.text, +Config.wordSize));
        }.bind(this));
      },

      setFontSize: function (size) {
        this.fontSize = size + 'rem';
      }

    };

  });

///////////////////////////////////////////////////////////
// Directives
///////////////////////////////////////////////////////////

angular.module("Directives", [])
  .directive("urlInput", function (Articles, Player, $http, $window) {
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
                  if (response.data.error) {
                    scope.article.error = response.data.error;
                    scope.article.text = response.data.data;
                    url.value = "";
                    $window.setTimeout(function () {
                      scope.article.error = "";
                    }, 2000);
                  } else {
                    Articles.articles.push({ url: url.value, text: response.data.data, meta: wordify.stats(response.text) });
                    url.value = "";
                    Config.editMode = false;
                    Player.generateWords();
                  }
                }, function errorCallback(response) {
                  scope.article.error = response;
                });

            } else {
              
            }
            event.preventDefault();
          }
        }); //bind

      }
    }
  });

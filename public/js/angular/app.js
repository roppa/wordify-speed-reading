"use strict";

var app = angular.module("wordifyApp", [])

app.run(function($rootScope) {
  $rootScope.wpm = 300;
  $rootScope.wordSize = 1;
  $rootScope.fontSize = 2.5;
});

var assert = require('assert');
var request = require('supertest');

var app = require('../../app.js');

describe('app', function() {

  xit('should have a PORT environment variable', function () {
    assert(process.env.PORT !== undefined);
  });

});
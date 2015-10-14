var assert = require('assert');
var request = require('supertest');

var app = require('../../app.js');

describe('app', function() {

  it('should have a PORT environment variable', function () {
    assert(process.env.PORT !== undefined);
  });
  
  xit('should have a DB_HOST environment variable', function () {
    assert(process.env.DB_HOST !== undefined);
  });

});
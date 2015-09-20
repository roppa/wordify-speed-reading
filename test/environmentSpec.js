var assert = require('assert');
var request = require('supertest');

var app = require('../app.js');

describe('app', function() {

  it('should have a PORT environment variable', function () {
    assert(process.env.PORT !== undefined);
  });
  
  it('should have a DB_HOST environment variable', function () {
    assert(process.env.DB_HOST !== undefined);
  });

  it('should have a DB_USER environment variable', function () {
    assert(process.env.DB_USER !== undefined);
  });

  it('should have a DB_PASS environment variable', function () {
    assert(process.env.DB_PASS !== undefined);
  });

});
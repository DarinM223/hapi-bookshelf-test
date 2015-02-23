'use strict';

var should = require('should');
var User = require('../models/user.js');
var Promise = require('bluebird');
var encryption = require('../encryption.js');

describe('Testing user model', function() {
  describe('Testing saving user model', function() {
    var userid = null;

    before(function(done) {
      new User({
        username: 'newuser',
        email: 'newuser@test.com',
        password: 'foo'
      }).save().then(function(user) {
        userid = user.id;
        done();
      }).catch(function(e) {
        console.log('Cannot create test user');
      });
    });

    after(function(done) {
      new User({ id: userid }).fetch().then(function(user) {
        return user.destroy();
      }).then(function() {
        done();
      }).catch(function(e) {
        console.log('Cannot destroy test user');
      });
    });

    it('should have hashed_password set to true', function(done) {
      new User({ id: userid }).fetch().then(function(user) {
        user.attributes.hashed_password.should.equal(1);
        (user.attributes.created_at !== null).should.be.true;
        (user.attributes.updated_at === null).should.be.true;
        done();
      });
    });

    it('should properly hash the users password', function(done) {
      new User({ id: userid }).fetch().then(function(user) {
        return encryption.comparePassword('foo', user.attributes.password);
      }).then(function(result) {
        result.should.equal(true);
        done();
      });
    });
  });

  describe('Testing updating user model', function() {
    var userid = null;

    before(function(done) {
      new User({
        username: 'newuser',
        email: 'newuser@test.com',
        password: 'foo'
      }).save().then(function(user) {
        userid = user.id;
        return user.save({ email: 'blah@test.com' });
      }).then(function(user) {
        user.attributes.email.should.equal('blah@test.com');
        done();
      }).catch(function(e) {
        console.log('Cannot create test user');
      });
    });

    after(function(done) {
      new User({ id: userid }).fetch().then(function(user) {
        return user.destroy();
      }).then(function() {
        done();
      }).catch(function(e) {
        console.log('Cannot destroy test user');
      });
    });

    it('should set the updated date', function(done) {
      new User({ id: userid }).fetch().then(function(user) {
        (user.attributes.updated_at !== null).should.be.true;
        done();
      });
    });
  });
});

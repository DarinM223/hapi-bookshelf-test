'use strict';

var should = require('should');
var encryption = require('../encryption.js');
var Promise = require('bluebird');

describe('Encryption testing', function() {
  it('should properly hash password', function(done) {
    // encrypts password then checks if the encrypted password and the non encrypted password match
    encryption.cryptPassword('testpassword').then(function(result) {
      result.should.not.equal('testpassword');
      return encryption.comparePassword('testpassword', result);
    }).then(function(result) {
      result.should.equal(true);
      done();
    }).catch(function(e) {
      console.log(e);
      throw e;
    });
  });

  it('should not match with other hashed passwords', function(done) {
    // encrypts two passwords, checks that the hashes are not equal and that the other hash does not match with the password
    Promise.all([
      encryption.cryptPassword('testpassword'),
      encryption.cryptPassword('fakepassword')
    ]).then(function(passwords) {
      var hashedPassword = passwords[0];
      var fakePassword = passwords[1];
      hashedPassword.should.not.equal(fakePassword);
      return encryption.comparePassword('testpassword', fakePassword);
    }).then(function(result) {
      result.should.equal(false);
      done();
    }).catch(function(e) {
      console.log(e);
      throw e;
    });
  });
});


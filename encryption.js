'use strict';

var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

/**
 * returns an encrypted version of a password
 * @param {string} password
 * @return {Promise(string)} the encrypted password
 */
exports.cryptPassword = function (password) {
  return bcrypt.genSaltAsync(10).then(function(salt) {
    return bcrypt.hashAsync(password, salt);
  });
};

/**
 * compares a password to the encrypted password
 * @param {string} password the password to compare to
 * @param {string} hash the hashed password
 * @return {Promise(boolean)} true if they are the same, false otherwise
 */
exports.comparePassword = function(password, hash) {
  return bcrypt.compareAsync(password, hash);
};

'use strict';
var User = require('../models/user.js');

exports.seed = function(knex, Promise) {
  return new User({
    username: 'darin',
    email: 'darin@test.net',
    password: 'blah'
  }).save();
};

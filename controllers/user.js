'use strict';

var User = require('../models/user.js')
  , Boom = require('boom')
  , UserController = {};

/**
 * @method GET
 * @route /api/users
 */
UserController.getUsers = function(request, reply) {
  User.fetchAll().then(function(users) {
    reply(JSON.stringify(users));
  }).catch(function(e) {
    reply(Boom.wrap(e, 500));
  });
};

/**
 * @method POST
 * @route /api/users
 */
UserController.addUser = function(request, reply) {
  new User({
    username: request.payload.username,
    email: request.payload.email,
    password: request.payload.password,
    created_at: new Date(),
    updated_at: new Date()
  }).save().then(function(user) {
    reply(JSON.stringify(user));
  }).catch(function(e) {
    reply(Boom.wrap(e, 500));
  });
};

/**
 * @method GET
 * @route /api/users/{id}
 */
UserController.getUser = function(request, reply) {
  new User({ id: request.params.id }).fetch().then(function(user) {
    reply(JSON.stringify(user));
  }).catch(function(e) {
    reply(Boom.wrap(e, 500));
  });
};

module.exports = UserController;

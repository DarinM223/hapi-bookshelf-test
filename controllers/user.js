'use strict';

var User = require('../models/user.js')
  , Todolist = require('../models/todolist.js')
  , Boom = require('boom')
  , UserController = {};

/**
 * @method GET
 * @route /api/users
 */
UserController.getUsers = function(request, reply) {
  User.fetchAll().then(function(users) {
    reply(users);
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
    password: request.payload.password
  }).save().then(function(user) {
    reply(user);
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
    reply(user);
  }).catch(function(e) {
    reply(Boom.wrap(e, 500));
  });
};

/**
 * @method GET
 * @route /api/users/{id}/todolists
 */
UserController.getTodolists = function(request, reply) {
  new Todolist({ userid: 2 }).fetchAll({ withRelated: 'user' }).then(function(todolists) {
    reply(todolists);
  });
};

/**
 * @method POST
 * @route /api/users/{id}/todolists
 */
UserController.addTodolist = function(request, reply) {
  new Todolist({
    name: request.payload.name,
    userid: request.params.id
  }).save().then(function(todolist) {
    reply(todolist);
  });
};

module.exports = UserController;

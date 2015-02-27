'use strict';

var Todolist = require('../models/todolist.js')
  , Boom = require('boom')
  , TodolistController = {};

/**
 * @method GET
 * @route /api/todolists/{id}
 */
TodolistController.getTodolist = function(request, reply) {
  new User({ id: request.params.id }).fetch().then(function(todolist) {
    reply(todolist);
  }).catch(function(e) {
    reply(Boom.wrap(e, 500));
  });
};

module.exports = TodolistController;

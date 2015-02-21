'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').insert({
    username: 'darin',
    email: 'darin@test.net',
    password: 'blah',
    created_at: new Date(),
    updated_at: new Date()
  });
};

'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments().primary();
    t.string('username').notNull();
    t.string('email').notNull();
    t.boolean('hashed_password').notNull().defaultTo(false);
    t.string('password').nullable(); 
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

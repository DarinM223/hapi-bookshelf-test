'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('todolists', function(t) {
    t.increments().primary();
    t.string('name').notNull();
    t.integer('userid').unsigned().index().references('users.id');
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todolists');
};

'use strict';

/*
 * Development knex configuration, change for production
 */

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'dev.sqlite3'
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = {
  knex: knex,
  bookshelf: bookshelf
};

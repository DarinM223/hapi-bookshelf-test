'use strict'; 

var bookshelf = require('../config.js').bookshelf;

var User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;

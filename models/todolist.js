'use strict';

var bookshelf = require('../config.js').bookshelf;
var User = require('./user.js');

var Todolist = bookshelf.Model.extend({
  tableName: 'todolists',
  user: function() {
    return this.belongsTo('User');
  },
  defaults: {
    created_at: new Date()
  }
});

module.exports = bookshelf.model('Todolist', Todolist);

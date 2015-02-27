'use strict'; 

var bookshelf = require('../config.js').bookshelf;
var Todolist = require('./todolist.js');
var encryption = require('../encryption.js');

var User = bookshelf.Model.extend({
  tableName: 'users',
  defaults: {
    hashed_password: false,
    created_at: new Date()
  },
  initialize: function() {
    this.on('saving', this.hashPassword, this);
  },
  todolists: function() {
    return this.hasMany('Todolist', 'userid');
  },
  hashPassword: function() {
    var that = this;
    if (this.get('hashed_password') === false) { // new user
      // replace password to hashed password before saving
      return encryption.cryptPassword(this.get('password')).then(function(hash) {
        that.set('password', hash);
        that.set('hashed_password', true);
      }).catch(function(e) {
        console.log(e);
      });
    } else { //existing user
      // update updated_at date
      that.set('updated_at', new Date()); 
    }
  }
});

module.exports = bookshelf.model('User', User);

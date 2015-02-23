'use strict'; 

var bookshelf = require('../config.js').bookshelf;
var encryption = require('../encryption.js');

var User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('saving', this.hashPassword, this);
  },
  hashPassword: function() {
    var that = this;
    if (typeof(this.get('hashed_password')) === 'undefined' || this.get('hashed_password') === false) { // new user
      // replace password to hashed password before saving
      return encryption.cryptPassword(this.get('password')).then(function(hash) {
        that.set('password', hash);
        that.set('created_at', new Date());
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

module.exports = User;

'use strict'; 

var Hapi = require('hapi');
var server = new Hapi.Server();

var User = require('./controllers/user.js');

server.connection({ host: '127.0.0.1', port: 3000 });

server.route({
  method: 'GET',
  path: '/api/users',
  handler: User.getUsers
});

server.route({
  method: 'POST',
  path: '/api/users',
  handler: User.addUser
});

server.route({
  method: 'GET',
  path: '/api/users/{id}',
  handler: User.getUser
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('Hello, world!');
  }
});

server.start(function() {
  console.log('Server started!');
});


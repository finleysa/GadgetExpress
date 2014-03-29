'use strict';

var dbname = 'database-name';
var port = process.env.PORT || 4000;

var d = require('./lib/request-debug');
var connectMongo = require('./lib/mongodb-connection-pool').initialize(dbname);

var express = require('express');
var home = require('./routes/home');
var users = require('./routes/users');
var items = require('./routes/items');
var app = express();

/* --- pipeline begins */
app.use(connectMongo);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', d, home.index);
app.get('/users', d, users.query);
app.post('/users', d, users.create);
app.put('/users/:id/:cashMoney/:name', d, users.update);
app.get('/items', d, items.query);
app.post('/items', d, items.create);
app.put('/items/:id/:quantity', d, items.update);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});


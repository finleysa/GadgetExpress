'use strict';

var User = require('../models/user');
var Mongo = require('mongodb');

exports.create = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  var user = new User(req.body);
  users.insert(user, function(err, records){
    res.send(records[0]);
  });
};

exports.query = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  users.find().toArray(function(err, records){
    res.send({users:records});
  });
};

exports.update = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  var id = Mongo.ObjectID(req.params.id);
  users.update({_id:id}, {$set: {deposit:req.params.cashMoney, purchases:req.params.name}}, function(err,records){
    res.send({users:records, id:req.params.id, item:req.params.name});
  });
};

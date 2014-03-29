'use strict';

var Item = require('../models/item');
var Mongo = require('mongodb');

exports.create = function(req, res){
  var db = global.mdb;
  var items = db.collection('items');
  var item = new Item(req.body);
  items.insert(item, function(err, records){
    res.send(records[0]);
  });
};

exports.query = function(req, res){
  var db = global.mdb;
  var items = db.collection('items');
  items.find().toArray(function(err, records){
    res.send({items:records});
  });
};

exports.update = function(req, res){
  var db = global.mdb;
  var items = db.collection('items');
  var id = Mongo.ObjectID(req.params.id);
  console.log(req.params);
  items.update({_id:id}, {$set: {amount:req.params.quantity}}, function(err,records){
    res.send({items:records, id:req.params.id});
  });
};

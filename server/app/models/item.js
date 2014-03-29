'use strict';

module.exports = function(item){
  this.name = item.name || 'unknown';
  this.cost = item.cost * 1 || 'unknown';
  this.amount = item.amount * 1 || 'unknown';
};

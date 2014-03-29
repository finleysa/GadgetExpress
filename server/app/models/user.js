'use strict';
var User = (function(){

  function User(user){
    this.purchaseArray = [];
    this.name = user.name || 'unknown';
    this.deposit = user.deposit * 1 || 'unknown';
    this.purchases = function(x){
      this.purchaseArray.push(x);
      console.log(this.purchaseArray);
      return this.purchaseArray;
    };
  }
  return User;
})();

module.exports = User;

/* global numeral:false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var userArray = [];
  var itemArray = [];

  function initialize(){
    $(document).foundation();
    $('#user').submit(addUser);
    $('#item').submit(addItem);
    $('#item-table').on('click', '.purchase', purchase);
    $('#show-users').click(toggleUsers);
    getUsers();
    getItems();
  }

  function toggleUsers(){
    $('#users').toggleClass('hide');
  }
  
  function purchase(){
    var name = $(this).closest('tr').children('td:nth-child(6)').children('select').val();
    var itemName = $(this).closest('tr').children('td:nth-child(2)').text();
    var amount = $(this).closest('tr').children('td:nth-child(5)').children('select').val();
    var cost  = $(this).closest('tr').children('td:nth-child(4)').text();
    var quantity = $(this).closest('tr').children('td:nth-child(3)').text();
    
    var user = _.filter(userArray, function(x){
      return x.name === name;
    });
    
    var item = _.filter(itemArray, function(x){
      return x.name === itemName;
    });

    cost = numeral().unformat(cost);
    var cashMoney = user[0].deposit - (amount*cost);
    quantity = (quantity*1) - (amount*1);

    if(user[0].deposit < amount*cost){
      alert(user[0].name+' cannot afford this transaction :(');
    }else{
      var url = window.location.origin.replace(/\d{4}/, '4000') + '/users/' + user[0]._id + '/' + cashMoney+ '/' +itemName;
      var type = 'PUT';
      var success = updateSuccess;
      $.ajax({url:url, type:type, success:success});

      var url2 = window.location.origin.replace(/\d{4}/, '4000') + '/items/' +item[0]._id + '/' + quantity;
      var type2 = 'PUT';
      var success2 = updateSuccess2;
      $.ajax({url:url2, type:type2, success:success2});
    
    }
  }
  function updateSuccess2(data){
    $('#item-table').empty();
    getItems();
    console.log(data);
  }
  
  function updateSuccess(data){
    $('#user-table').empty();
    $('#user-select').empty();

    getUsers();
    console.log(data);
    var itemName = data.item
  }

  function getItems(){
    var url = window.location.origin.replace(/\d{4}/, '4000') + '/items';
    $.getJSON(url, displayItems);
  }

  function displayItems(data){
    for(var i=0; i<data.items.length; i++){
      addItemToTable(data.items[i]);
    }
  }

  function addItem(event){
    var data = $(this).serialize();
    var url = window.location.origin.replace(/\d{4}/, '4000') + '/items';
    var type = 'POST';
    var success = addItemSuccess;
    $.ajax({url:url, type:type, data:data, success:success});
    $('input').val('');
    
    event.preventDefault();
  }

  function addItemSuccess(data){
    addItemToTable(data);
  }

  function addItemToTable(item){
    itemArray.push(item);
    
    var $row = $('<tr>');
    var $purchase = $('<td>');
    var $name = $('<td>');
    var $amount = $('<td>');
    var $user = $('<td>');
    var $cost = $('<td>');
    var $quantity = $('<td>');
    var $amountSelect = $('<select>');
    var $userSelect = $('<select>');

    $name.text(item.name);
    $amount.text(item.amount);
    $cost.text(numeral(item.cost).format('$0,0.00'));
      
    for(var i=0; i<= item.amount; i++){
      var $option = $('<option>');
      $option.text(i);
      $amountSelect.append($option);
    }
    var temp= _.flatten(userArray, 'name');
    temp = _.uniq(temp);

    for(var j=0; j< userArray.length; j++){
      var $option2 = $('<option>');
      $option2.text(temp[j]);
      
      if ($option2.text() !== ''){
        $userSelect.append($option2);
      }
    }
    var $button = $('<button>');
    $button.text('Purchase');
    $purchase.append($button);
    $button.addClass('tiny');
    $button.addClass('radius');
    $button.addClass('purchase');
    $userSelect.addClass('select');
    
    $quantity.append($amountSelect);
    $user.append($userSelect);


    $row.append($purchase, $name, $amount, $cost, $quantity, $user);
    $('#item-table').prepend($row);
  }

  function addUser(event){
    var data = $(this).serialize();
    var url = window.location.origin.replace(/\d{4}/, '4000') + '/users';
    var type = 'POST';
    var success = addUserSuccess;
    $.ajax({url:url, type:type, data:data, success:success});
    $('input').val('');
    event.preventDefault();
  }

  function addUserSuccess(data){
    addUserToTable(data);
    var $option = $('<option>');
    $option.text(data.name);
    $('.select').append($option);
  }

  function getUsers(){
    var url = window.location.origin.replace(/\d{4}/, '4000') + '/users';
    $.getJSON(url, displayUsers);
  }

  function displayUsers(data){

    for(var i=0; i<data.users.length; i++){
      addUserToTable(data.users[i]);
    }
  }
  
  function addUserToTable(user){
    userArray.push(user);
    var $row = $('<tr>');
    var $name = $('<td>');
    var $deposit = $('<td>');
    var $purchase = $('<td>');
    $name.text(user.name);
    $deposit.text(numeral(user.deposit).format('$0,0.00'));
    $row.append($name, $deposit, $purchase);
    $('#user-table').prepend($row);
  }
})();


'use strict';

//  Item model
//  Contains methods to interact with item data

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var sweetalert = require('sweetalert');

var inventoryFilepath = path.join(__dirname, '../data/inventory.json');

exports.get = function(cb) {
  fs.readFile(inventoryFilepath, function(err, data) {
    if(err) return cb(err);
    var items = JSON.parse(data);
    cb(null, items);
  });
};

exports.create = function(newItem, cb) {
  this.get((err, items) => {  // read and parse
    if(err) return cb(err);
    newItem.id = uuid();
    items.push(newItem);   // modify
    this.write(items, cb);  // stringify and write
  });
};

exports.write = function(items, cb) {
  fs.writeFile(inventoryFilepath, JSON.stringify(items), cb);
};

exports.getById = function() {

}

exports.delete = function(id, cb) {
  // get the array of items
  // remove the item with the given id from the array
  // write the modified array back to the db

  this.get((err, items) => {

    var length = items.length;

    items = items.filter(function(item) {
      return item.id !== id;
    });

    if(length === items.length) {
      cb( {err: "Item not found."} );
      return;
    }

    this.write(items, cb);
  });
};


exports.update = function(id, updatesObj, cb) {
  // find the item with the given id
  // update that item with the object
  // save the modified items array to db
  // cb with updated item

  this.get((err, items) => {
    var updatedItem;

    items = items.map(function(item) {
      if(item.id === id) {
        // do the update
        for(var key in updatesObj) {
          item[key] = updatesObj[key];
        }
        updatedItem = item;
      }
      return item;
    });

    if(!updatedItem) {
      cb( {err: "Item not found."} );
      return;
    }

    this.write(items, function(err) {
      cb(err, updatedItem)
    });
  });
};

'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var inventoryFilepath = path.join(__dirname, '../data/inventory.json');

exports.get = function(cb) {
  fs.readFile(inventoryFilepath, function(err, data) {
    if (err) return cb(err);
    var items = JSON.parse(data);
    cb(null, items);
  });
};

exports.create = function(newItem, cb) {
  this.get((err, items) => {
    if (err) return cb(err);
    newItem.id = uuid();
    items.push(newItem);
    this.write(items, cb);
  });
};

exports.write = function(items, cb) {
  fs.writeFile(inventoryFilepath, JSON.stringify(items), cb);
};

exports.getById = function() {

}

exports.delete = function(id, cb) {

  this.get((err, items) => {

    var length = items.length;

    items = items.filter(function(item) {
      return item.id !== id;
    });

    if (length === items.length) {
      cb({
        err: "Item not found."
      });
      return;
    }

    this.write(items, cb);
  });
};


exports.update = function(id, updatesObj, cb) {
  this.get((err, items) => {
    var updatedItem;

    items = items.map(function(item) {
      if (item.id === id) {
        // do the update
        for (var key in updatesObj) {
          item[key] = updatesObj[key];
        }
        updatedItem = item;
      }
      return item;
    });

    if (!updatedItem) {
      cb({
        err: "Item not found."
      });
      return;
    }

    this.write(items, function(err) {
      cb(err, updatedItem)
    });
  });
};
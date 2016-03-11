'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');
var sweetalert = require('sweetalert');

router.get('/', function(req, res) {
  Item.get(function(err, items) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    res.send(items);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Item.get(function(err, items) {
    if(err) {
      res.status(400).send(err);
      return;
    }

    var item = items.find(function(obj) {
      return obj.id === id;
    });

    if(!item) {
      res.status(404).send({err: "Item not found"});
      return;
    }
    res.send(item);
  });
});

router.post('/', function(req, res) {
  var newItem = req.body;
  Item.create(newItem, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(newItem);
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Item.delete(id, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatesObj = req.body;
  Item.update(id, updatesObj, function(err, updatedItem) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(updatedItem);
    }
  });
});


module.exports = router;

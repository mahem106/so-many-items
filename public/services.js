'use strict';

var app = angular.module('itemApp');

app.service('ItemService', function($http) {

  this.fetch = function() {
    return $http.get('/items');
  }

  this.create = function(newItem) {
    return $http.post('/items', newItem);
  }

  this.remove = function(item) {
    return $http.delete(`/items/${item.id}`);
  }

  this.update = function(item) {
    return $http.put(`/items/${item.id}`, item);
  }

});

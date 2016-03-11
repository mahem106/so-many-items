'use strict';

// No array -> referencing a pre-existing module:
var app = angular.module('itemApp');

app.controller('itemCtrl', function($scope, $filter, ItemService) {

  ItemService.fetch()
    .then(function(res) {
      var items = res.data;
      $scope.items = items;
    }, function(err) {
      console.error('err: ', err);
    });

  $scope.addItem = function() {
    ItemService.create($scope.newItem)
      .then(function(res) {
        var items = res.data;
        $scope.items.push(items);
        $scope.newItem = {};
      }, function(err) {
        console.error('err: ', err);
      });
  }

  $scope.predicate = 'type';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.removeItem = function(item) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function() {
      ItemService.remove(item)
        .then(function() {
          var index = $scope.items.indexOf(item);
          $scope.items.splice(index, 1);
        }, function(err) {
          console.error('err: ', err);
        })
      swal("Deleted!", "Your item has been deleted.", "success");
    });
  };

  $scope.cancel = function() {
    $scope.itemToEdit = null;
  }
  var itemIndex;
  $scope.editItem = function(item) {
    $scope.itemToEdit = angular.copy(item);
    itemIndex = $scope.items.indexOf(item);
  }
  $scope.saveEdit = function() {
    swal({
      title: "Are you sure you want to make these edits?",
      text: `Type: ${$scope.itemToEdit.type}, Qty: ${$scope.itemToEdit.qty}, Notes: ${$scope.itemToEdit.notes}`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6cdd55",
      confirmButtonText: "Yep, I'm sure!",
      closeOnConfirm: false
    }, function() {
    var editItem = $scope.itemToEdit;
    $scope.itemToEdit = null;
    ItemService.update(editItem)
      .then(function(res) {
        $scope.items.splice(itemIndex, 1, res.data);
        itemIndex = '';
      })
      swal("Edited successfully!", "", "success");
    })
  }
})

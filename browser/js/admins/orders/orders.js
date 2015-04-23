'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('orders', {
        url: '/admins/orders',
        templateUrl: 'js/admins/orders/orders.html',
        controller: 'OrderManagementController'
    });
});

app.controller('OrderManagementController', function($scope, Orders) {

    Orders.getAllOrders()
      .then(function(orders) {
          $scope.orders = orders;
      }, function(err){
          console.log('get all orders failed', err)
      });

    $scope.updateOrder = function(order) {
        Orders.updateOrder(order).then(function(updatedOrder){
            console.log('order update success');
        }, function(err){
            console.log('order update failed', err)
        })
    };

});
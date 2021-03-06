'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: "CartController"
    });
});


app.controller('CartController', function($modalInstance, $scope, Cart, Products, Recommendations){
	$scope.shipping = Cart.order.shipping;
	$scope.tax = Cart.order.tax;
	$scope.subTotal = 0;
	$scope.cartProducts = Cart.getCart();
	// $scope.

	var updateCartFields = function(){
		$scope.cartProducts = Cart.getCart();
		$scope.subTotal = Cart.calculateSubTotal($scope.cartProducts);
		$scope.total = $scope.shipping + $scope.tax + $scope.subTotal;
	};
  $scope.productRecs = [];
	//Order is important
	if($scope.cartProducts && $scope.cartProducts.length) updateCartFields();	//runs initial calculate on load, further called with ng-change on html quantity forms


	$scope.closeModal = function () {
		$modalInstance.close();
	};


	$scope.addToCart = function(product){
		Cart.addToCart(product);
	};
	$scope.removeItem = function(product){
		Cart.removeItem(product);
		updateCartFields();
	};
	$scope.emptyCart = function (){
		//Cart.localCart = [];
		Cart.emptyCart();
		updateCartFields();
	};
	$scope.changeQty = function(productId, qty){
		Cart.changeQty(productId, qty);
		updateCartFields();
	};
	$scope.updateCart = function(){//shouldn't exist
		Cart.localCart = $scope.cartProducts;
	};
	$scope.getAllRecs = function(){
		$scope.allRecs = Recommendations.getAllRecs();
	};
//	$scope.getAllRecs();
	$scope.getProductRec = function(productId){
		$scope.productRecs = [];
		Recommendations.getProductRec(productId).then(function(pidArr){
			pidArr.forEach(function(el){
				Products.getProduct(el.productId)
				.then(function(product) {
						$scope.productRecs.push(product);
					}, function(err) {
				        throw new Error(err);
				});
			});
		});
	};
  if ($scope.cartProducts && $scope.cartProducts.length) {
    $scope.getProductRec($scope.cartProducts[0]._id);
  }
});

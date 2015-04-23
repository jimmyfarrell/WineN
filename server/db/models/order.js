'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: { //either user._id or session._id
        type: String,
		required: true
		//unique : true,
		//dropDups: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    cartProducts: {
        type: [],
    	default: [] //we don't have to check if it exists or not
    },
    status: {
        type: String,
        required: true
    },
    date: {
		type: Date,
		default: new Date()
    },
    promoCode: {
        type: String
    },
	shipping: {
		type: String
	},
    tax: {
		type: String
	},
    subTotal: {
		type: String
	},
    total: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	shippingAddress: {
		line1: String,
		line2: String,
		city: String,
		state: String,
		zip: String
	},
	billingAddress: {
		line1: String,
		line2: String,
		city: String,
		state: String,
		zip: String
	}
});
mongoose.model('Order', schema);

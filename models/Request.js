'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var jwt = require('jwt-simple');

var Request;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var requestSchema = Schema({
	sender: {type: Schema.Types.ObjectId, ref: "Author"},
	reciever: {type: Schema.Types.ObjectId, ref: "Author"},
	book: {type: Schema.Types.ObjectId, ref: "Book"},
	message: {type: String},
	progress: {type: String, default: "open"}
});


Request = mongoose.model('Request', requestSchema);


module.exports = Request;

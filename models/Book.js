'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var bookSchema = Schema({
	author: {type: Schema.Types.ObjectId, ref: "Author"},
	name: {type: String},
	description: {type: String},
	url: {type: String},
	picture: {type: String},
	reviewsWanted: {type: Number}
});

Book = mongoose.model('Book', bookSchema);


module.exports = Book;

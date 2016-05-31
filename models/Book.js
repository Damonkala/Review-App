'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AWS = require('aws-sdk');
var mongoose = require('mongoose');
var uuid = require('uuid');

var s3 = new AWS.S3();

var bucketName = 'books-pdf-bucket';
var urlBase = process.env.AWS_URL_BASE;

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
bookSchema.statics.upload = (file, cb) => {
	if(!file.mimetype.match(/pdf/)) {
		return cb({error: 'File must be image.'});
	}

	let filenameParts = file.originalname.split('.');

	let ext;
	if(filenameParts.length > 1) {
		ext = '.' + filenameParts.pop();
	} else {
		ext = '';
	}

	let key = uuid() + `${ext}`;

	let params = {
		Bucket: bucketName,
		Key: key,
		ACL: 'public-read',
		Body: file.buffer
	};

	s3.putObject(params, (err, result) => {
		if(err) return cb(err);

		let pdfUrl = `${urlBase}${bucketName}/${key}`;
		console.log("You Are El", pdfUrl);
		cb();
	});
};

Book = mongoose.model('Book', bookSchema);


module.exports = Book;

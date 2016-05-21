'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var jwt = require('jwt-simple');

var Author;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var authorSchema = Schema({
	facebook: {type: String},
	displayName: {type: String},
	email: {type: String},
	picture: {type: String},
	books: [{type: Schema.Types.ObjectId, ref: "Book"}],
	notifications: [{type: Schema.Types.ObjectId, ref: "Notification"}]
});

authorSchema.methods.createJWT = function() {
  var payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  };
  return jwt.encode(payload, process.env.JWT_SECRET);
};
Author = mongoose.model('Author', authorSchema);


module.exports = Author;

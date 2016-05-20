'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');
var Author = require('../models/author');

router.get('/me', ensureAuthenticated, function(req, res) {
  Author.findById(req.user).populate('books').exec(function(err, author){
		console.log("YOUUU", author);
    res.send({
      id: author._id,
      displayName: author.displayName,
			emailAddress: author.email,
      picture: author.picture,
      conversations: author.conversations,
      books: author.books
    });
  })
});
router.get('/profilePage', ensureAuthenticated, function(req, res) {
  Author.findById(req.user).populate('books').exec(function(err, author){
    res.send({
      displayName: author.displayName,
      picture: author.picture,
      books: author.books
    });
  })
});

router.get('/list', ensureAuthenticated, function(req, res) {
  Author.find(function(err, data){
    res.send(data);
  })
});


module.exports = router;

'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');

var Author = require('../models/author');
var Request = require('../models/request');


router.get('/me', ensureAuthenticated, function(req, res) {
  Author.findById(req.user).deepPopulate('books requests requests.sender requests.book').exec(function(err, author){
    res.send({
      id: author._id,
      displayName: author.displayName,
			emailAddress: author.email,
      picture: author.picture,
      conversations: author.conversations,
      books: author.books,
      requests: author.requests
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

router.post('/sendRequest', ensureAuthenticated, function(req, res){
  var fullRequest = req.body;
  fullRequest.sender = req.user;
  Request.create(fullRequest, function(err, newRequest){
    Author.findByIdAndUpdate(newRequest.reciever, {$push: {requests : newRequest}}, function(err, user){
      Author.findByIdAndUpdate(newRequest.sender, {$push: {pending: newRequest.book}}, function(err, user){
        res.send(user)
      })
    })
  })
})
module.exports = router;

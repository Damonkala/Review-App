'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');

var sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);

var Author = require('../models/author');
var Request = require('../models/request');
var Book = require('../models/book');


router.get('/me', ensureAuthenticated, function(req, res) {
  Author.findById(req.user).deepPopulate('books requests requests.sender requests.book requests.reciever').exec(function(err, author){
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
  console.log("FUCK");
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

router.post('/acceptRequest', ensureAuthenticated, function(req, res){
  console.log("AARG");
  console.log("Send to: ", req.body.reciever.email);
  console.log("From: ", req.body.sender.email);
  console.log("Book: ", req.body.book.name);
  console.log("Text: ", req.body.message);
  sendgrid.send({
    to:       req.body.reciever.email,
    from:     'damonthefox@gmail.com',
    subject:  req.body.book.name,
    text:     req.body.message
  }, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
    Request.findByIdAndUpdate(req.body.requestID, {$set: {progress: "pending"}}).exec(function(err, up8tedRequest){
      console.log(up8tedRequest);
      res.send(up8tedRequest)
    })
  });
})
module.exports = router;

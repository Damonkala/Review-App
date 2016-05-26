'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');
var Book = require('../models/Book');
var Author = require('../models/Author');
var http = require('http')
var https = require('https')
router.get('/', function(req, res) {
  Book.find({}).populate('author').exec(function(err, author){
    console.log(books);
    res.send(books);
  })
})
router.post('/lookup', function(req, res){
  https.get(req.body.url, function(res){
    console.log(res);
  })
})
router.get('/bookPage/:id', function(req, res) {
  Book.findById(req.params.id).populate('author').exec(function(err, book){

    res.send({
      isAuthor: book.author._id == req.user,
      name: book.name,
      picture: book.picture,
      description: book.description,
      author: book.author,
      reviewsWanted: book.reviewsWanted,
      url: book.url
    });
  })
});

router.get('/list', function(req, res) {
  Book.find({}).populate('author').exec(function(err, author){
    res.send(author);
  })
});

router.post('/', function(req, res) {
  console.log("NEW BOOK: ", req.body);
  Book.create(req.body, function(err, book){
    console.log(book);
    Author.findByIdAndUpdate(book.author, {$push: {books : book}}, function(err, user){
      res.send(user);
    })
  })
})



module.exports = router;

'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');
var Book = require('../models/Book');
var Author = require('../models/Author');

router.get('/', function(req, res) {
  Book.find({}).populate('author').exec(function(err, author){
    console.log(books);
    res.send(books);
  })
})
router.get('/bookPage/:id', ensureAuthenticated, function(req, res) {
  Book.findById(req.params.id).populate('author').exec(function(err, author){
    res.send({
      name: book.displayName,
      author: book.author,
      reviewsWanted: book.reviewsWanted
    });
  })
});

router.get('/list', ensureAuthenticated, function(req, res) {
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

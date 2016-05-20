'use strict';

var express = require('express');
var router = express.Router();

var qs = require('querystring');
var jwt = require('jwt-simple');
var request = require('request');

var Author = require('../models/author');

router.post('/facebook', function(req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields;
	 fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };
console.log("PRAM", params);
  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
			console.log("AWWOGA", accessToken.error.message, "YIPYIPYIPYIP");
      return res.status(500).send({ message: accessToken.error.message });
    }

    // Step 2. Retrieve profile information about the current author.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      // console.log('facebook profile:', profile);
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
      if (req.headers.authorization) {
        Author.findOne({ facebook: profile.id }, function(err, existingAuthor) {
          if (existingAuthor) {
            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, process.env.JWT_SECRET);
          Author.findById(payload.sub, function(err, author) {
            if (!author) {
							console.log("OH FUCK NO");
              return res.status(400).send({ message: 'Author not found' });
            }
            author.facebook = author.id;
            author.picture = profile.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            author.displayName = profile.displayName || profile.name;
            author.email = profile.email;
            author.save(function() {
              var token = author.createJWT();
              res.send({ token: token });
            });
          });
        });
      } else {
        Author.findOne({ facebook: profile.id }, function(err, existingAuthor) {
          if (existingAuthor) {
            var token = existingAuthor.createJWT();
            return res.send({ token: token });
          }
          var author = new Author();
          author.facebook = profile.id;
          author.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          author.displayName = profile.name;
          author.email = profile.email;
          author.save(function() {
            var token = author.createJWT();
            res.send({ token: token });
          });
        });
      }
    });
  });
});



module.exports = router;

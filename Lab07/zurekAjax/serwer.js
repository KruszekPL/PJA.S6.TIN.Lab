/*jshint node: true */
'use strict';

const admin = { 'username': 'admin', 'password': 'nimda' };

var express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var baza = require('./db/books');


app.use(session({
    secret: 'xxxyyyzzz',
    resave: false,
    saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components/jquery/dist')));

app.get('/genres', function (req, res) {
    var genres = baza().distinct("genre");
    res.json(genres);
});

app.get('/genre/:gen', function (req, res) {
    var books = baza({genre: req.params.gen}).select("title", "author");
    res.json(books);
});

// POST
app.post('/genre/:gen', function (req, res) {
  if (!req.session.user) {
    res.json({'status': 'unauthorized'});
    return;
  }

  let data = {
    "title": req.body.title,
    "author": req.body.author,
    "genre": req.body.genre
  };
  baza.insert(data);

  res.json({'status': 'ok'});
});

app.post('/login', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (req.session.user) {
    console.log('User is already authenticated');
    res.json({ authentication: 'successful' });
    return;
  }

  if (admin.username === username && admin.password === password) {
    req.session.user = {
      username: username,
      password: password
    };

    res.json({ authentication: 'successful' });
    return;
  }

  res.json({ authorization: 'failed' });
});

app.get('/logout', function(req, res) {
  if (req.session.user) {
    req.session.destroy();
  }

  res.redirect('/');
});

app.listen(3000, function () {
    console.log('Serwer działa na porcie 3000');
});



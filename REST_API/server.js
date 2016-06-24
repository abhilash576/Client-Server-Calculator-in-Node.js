//'use strict';

var express = require('express');
var path = process.cwd();
var authorHandler = require(path + '/app/controllers/authorHandler.server.js');
var bookHandler = require(path + '/app/controllers/bookHandler.server.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;

var app = express();

//if (process.env.NODE_ENV !== 'production') require('dotenv').load();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }))
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

app.route("/api/v1/authors")
  .get(authorHandler.getAuthors)
  .post(authorHandler.createAuthor)
app.route("/api/v1/authors/:id")
  .get(authorHandler.getAuthor)
  .put(authorHandler.updateAuthor)
  .delete(authorHandler.deleteAuthor)
app.route("/api/v1/books")
  .get(bookHandler.getBooks)
  .post(bookHandler.createBook)
app.route("/api/v1/books/:id")
  .put(bookHandler.updateBook)
  .delete(bookHandler.deleteBook)
app.route("/api/v1/books/:bookId/authors")
  .put(bookHandler.addAuthorToBook)


//var port = process.env.PORT || 8080;
var port = 8081;

//mongoose.connect('mongodb://localhost/myappdatabase');
//MongoClient.connect("mongodb://localhost/", function(err, db) {  

//var connection = mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
var connection = mongoose.connect('mongodb://localhost/');
var server = app.listen(port, function() {
  console.log('Running at port ' + port + '...');
});

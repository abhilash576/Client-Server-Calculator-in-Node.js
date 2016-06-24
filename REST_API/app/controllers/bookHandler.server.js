//'use strict';

var Book = require('../models/book');


var generateError = function (err){
	var errors = {errors:[]};
	errors.errors.push(err);
	return errors;
}
module.exports = {
    createBook: function(req, res) {
      var book = new Book(req.body);
      book.save(function(err, book) {
        if (err) {
          return res.status(400).json(generateError(err));
        }
        return res.status(201).json(book);
      });
    },
    getBooks: function(req, res) {
      var query = {};
      if (req.query.title) {
        query = {
          title: {
            "$regex": req.query.title,
            "$options": "i"
          }
        }
      }
      if (req.query.isbn) {
        query = {
          isbn: req.query.isbn
        }
      }

      Book.find(query,
        function(err, books) {
          if (err) {
            return res.status(400).json(generateError(err));
          }
          return res.status(200).json(books);
        });
    },
    getBook: function(req, res) {
      Book.findOne({
          isbn: req.params.isbn
        },
        function(err, book) {
          if (err) {
            return res.status(400).json(generateError(err));
          }
          if (!book) {
            return res.status(404).json(generateError({
              message: "book not found"
            }));
          }
          return res.status(200).json(book);
        });
    },
    updateBook: function(req, res) {
      Book.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        },
        function(err, book) {
          if (err) {
            return res.status(400).json(generateError(err));
          }
          if (!book) {
            return res.status(404).json(generateError({
              message: "book not found"
            }));
          }
          return res.status(200).json(book);
        });
    },
    addAuthorToBook: function(req, res) {

      Book.findByIdAndUpdate(req.params.bookId, {
            $push: {
              authors: req.body.id
            }},
            {new:true},


            function(err, book) {
              if (err) {
                return res.status(400).json(generateError(err));
              }
              if (!book) {
                return res.status(404).json(generateError({
                  message: "book not found"
                }));
              }

              return res.status(200).json(book);

            }
          )
        },
        deleteBook: function(req, res) {
          Book.findByIdAndRemove(req.params.id,
            function(err, book) {
              if (err) {
                return res.status(400).json(generateError(err));
              }
              if (!book) {
                return res.status(404).json(generateError({
                  message: "book not found"
                }));
              }
              return res.status(204).json(book);
            });
        }
    }

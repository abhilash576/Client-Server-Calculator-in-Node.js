//'use strict';

var Author = require('../models/author');
var Book = require('../models/book');
var generateError = function (err){
	var errors = {errors:[]};
	errors.errors.push(err);
	return errors;
}
module.exports = {
  createAuthor: function(req, res) {
    //console.log(req);
    Author.create(req.body, function(err, author) {
      if (err) {
        return res.status(400).json(generateError(err));
      }
      return res.status(201).json(author);
    });
  },
  getAuthors: function(req, res) {
    //console.log(req);
    Author.find({},
      function(err, authors) {
        if (err) {
          return res.status(400).json(generateError(err));
        }
        return res.status(200).json(authors);
      });
  },
  getAuthor: function(req, res) {
    //console.log(req);
    Author.findById(req.params.id,
      function(err, author) {
        if (err) {
          return res.status(400).json(generateError(err));
        }
        return res.status(200).json(author);
      });
  },
  updateAuthor: function(req, res) {
    //console.log(req);
    Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      },
      function(err, author) {
        //console.log(err);
        //console.log(author);
        if (err) {
          return res.status(400).json(generateError(err));
        }
        if (!author) {
          return res.status(404).json(generateError({
            message: "author not found"
          }));
        }
        //console.log(author);
        return res.status(200).json(author);
      });
  },
  deleteAuthor: function(req, res) {
    //console.log(req);
    Book.findOne({
        authors: req.params.id
      }, function(err, book) {
        if (err) {
          return res.status(400).json(generateError(err));
        }
        if (book) {
          return res.status(400).json(generateError({
            message: "Could not delete author.  This author is associated with a book."
          }));
        }
        Author.findByIdAndRemove(req.params.id,
          function(err, author) {
            //console.log(err);
            if (err) {
              return res.status(400).json(generateError(err));
            }
            if (!author) {
              return res.status(404).json(generateError({
                message: "author not found"
              }));
            }
            return res.status(204).json(author);
          });
      })
    }


}

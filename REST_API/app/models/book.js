//'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = Schema({
  publisher: String,
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: [true, 'There is a book with that ISBN already'],
  },
  title: String,
  year: Number,
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

BookSchema.pre('validate', function(next) {
  if(!this.authors.length){
    this.invalidate('authors', 'Book must have at least 1 author ');
  }
  next();
});

module.exports = mongoose.model('Book', BookSchema);

const mongoose = require('mongoose');

const Book = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Book', Book);

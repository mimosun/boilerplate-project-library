'use strict';

const {
  getBooks,
  showBook,
  createBook,
  updateBook,
  deleteAllBook,
  deleteBook,
} = require('../controllers/BookController');

module.exports = function(app) {

  app.route('/api/books')
    .get(getBooks)
    .post(createBook)
    .delete(deleteAllBook);

  app.route('/api/books/:id')
    .get(showBook)
    .post(updateBook)
    .delete(deleteBook);
  
};

const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = (await Book.find()).map(item => {
      return {
        _id: item._id,
        title: item.title,
        commentcount: item.comments ? item.comments.length : 0,
      };
    });
    res.json(books);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    if (!req.body.title) {
      res.send('missing required field title');
      return;
    }

    const book = await Book.create({
      title: req.body.title,
    });

    res.json({
      _id: book._id,
      title: book.title,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.showBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.send('no book exists');
      return;
    }
    res.json(book);
  } catch (err) {
    res.send('no book exists');
  }
};

exports.updateBook = async (req, res) => {
  if (!req.body.comment) {
    res.send('missing required field comment');
    return;
  }

  try {
    const book = await Book.findByIdAndUpdate(req.params.id, {
      $addToSet: { comments: req.body.comment }
    }, { new: true });
    if (!book) {
      res.send('no book exists');
      return;
    }
    res.json(book);
  } catch (err) {
    res.send('no book exists');
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.send('no book exists');
      return;
    }
    res.send('delete successful');
  } catch (err) {
    res.send('no book exists');
  }
};

exports.deleteAllBook = async (req, res) => {
  try {
    await Book.deleteMany();
    res.send('complete delete successful');
  } catch (err) {
    res.json({ error: err.message });
  }
};

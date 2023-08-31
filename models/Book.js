const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  comments: [String],
}, {
  collection: process.env.MONGO_COLLECTION,
  versionKey: false,
});

module.exports = mongoose.model('Book', bookSchema);
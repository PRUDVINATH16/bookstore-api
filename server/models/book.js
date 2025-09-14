const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength: [100, 'Book title cannot exceed 100 characters'],
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// 👇 plug in the auto-increment on 'id'
BookSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Book', BookSchema);

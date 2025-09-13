const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if(books.length > 0) {
      res.status(200).json({
        success: true,
        data: books
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No books found'
      });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getSingleBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    if(bookId){
      const book = await Book.find({ id: bookId});
      if(book.length > 0) {
        res.status(200).json({
          success: true,
          data: book[0]
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
    } 
  } catch (error) {
    console.error('Error fetching in book by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
    
}

const addNewBook = async (req, res) => {
  try{
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if(newlyCreatedBook){
      res.status(201).json({
        sucess: true,
        message: 'New book added successfully',
        data: newlyCreatedBook
      })
    }

  } catch (error) {
    console.error('Error adding new book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updatedData = req.body;
  try {
    if(bookId){
      const updatedBook = await Book.findOneAndUpdate({ id: bookId }, updatedData, { new: true });
      if(updatedBook) {
        res.status(200).json({
          success: true,
          message: 'Book updated successfully',
          data: updatedBook
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
    }
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    if(bookId){
      const deletedBook = await Book.findOneAndDelete({ id: bookId });
      if(deletedBook) {
        res.status(200).json({
          success: true,
          message: 'Book deleted successfully',
          data: deletedBook
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook
};
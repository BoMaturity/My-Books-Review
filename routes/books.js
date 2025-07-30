const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const booksFilePath = path.join(__dirname, '../data/books.json');

// Helper để đọc file JSON
function getBooksData() {
  const data = fs.readFileSync(booksFilePath);
  return JSON.parse(data);
}

// ✅ Task 1: Get all books
router.get('/', (req, res) => {
  const books = getBooksData();
  res.json(books);
});

// ✅ Task 2: Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const books = getBooksData();
  const book = books[req.params.isbn];
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// ✅ Task 3: Get books by Author
router.get('/author/:author', (req, res) => {
  const books = getBooksData();
  const result = Object.entries(books).filter(([isbn, book]) =>
    book.author.toLowerCase() === req.params.author.toLowerCase()
  );
  res.json(Object.fromEntries(result));
});

// ✅ Task 4: Get books by Title
router.get('/title/:title', (req, res) => {
  const books = getBooksData();
  const result = Object.entries(books).filter(([isbn, book]) =>
    book.title.toLowerCase() === req.params.title.toLowerCase()
  );
  res.json(Object.fromEntries(result));
});

// ✅ Task 5: Get reviews of a book
router.get('/review/:isbn', (req, res) => {
  const books = getBooksData();
  const book = books[req.params.isbn];
  if (book) {
    res.json(book.reviews || {});
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});
router.put('/review/:isbn', (req, res) => {
    const books = getBooksData();
    const isbn = req.params.isbn;
    const { username, review } = req.body;
  
    if (!username || !review) {
      return res.status(400).json({ message: 'Username and review are required' });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: 'Book not found' });
    }
  
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }
  
    books[isbn].reviews[username] = review;
  
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
    res.json({ message: 'Review added/updated successfully' });
  });
  router.delete('/review/:isbn', (req, res) => {
    const books = getBooksData();
    const isbn = req.params.isbn;
    const { username } = req.body;
  
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
  
    const book = books[isbn];
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
  
    if (!book.reviews || !book.reviews[username]) {
      return res.status(403).json({ message: 'You have not posted a review for this book' });
    }
  
    delete book.reviews[username];
  
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
    res.json({ message: 'Review deleted successfully' });
  });
    
module.exports = router;

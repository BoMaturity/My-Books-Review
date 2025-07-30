const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to Book Review API!');
  })
// Routes
app.use('/books', booksRoutes);
app.use('/users', usersRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const axios = require('axios');

function getAllBooks(callback) {
  (async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      callback(null, response.data);
    } catch (error) {
      callback(error);
    }
  })();
}

getAllBooks((err, data) => {
  if (err) {
    console.error('Task 10 error:', err.message);
  } else {
    console.log('Task 10 result:', data);
  }
});


const axios = require('axios');

function getBookByISBN(isbn) {
  return axios.get(`http://localhost:3000/books/isbn/${isbn}`);
}

getBookByISBN('979-8-6401-0002-8')
  .then(res => {
    console.log('Task 11 result:', res.data);
  })
  .catch(err => {
    console.error('Task 11 error:', err.message);
  });

const axios = require('axios');

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:3000/books/author/${author}`);
    console.log('Task 12 result:', response.data);
  } catch (err) {
    console.error('Task 12 error:', err.message);
  }
}

getBooksByAuthor('Kazuo Thorne');

const axios = require('axios');

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:3000/books/title/${title}`);
    console.log('Task 13 result:', response.data);
  } catch (err) {
    console.error('Task 13 error:', err.message);
  }
}

getBooksByTitle('Neon Genesis Collapse');



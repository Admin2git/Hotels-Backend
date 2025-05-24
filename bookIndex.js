const express = require("express");
const app = express();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/book.models");

initializeDatabase();

// read all Books from the database

async function readAllBooks() {
  try {
    const book = await Book.find();
    return book;
  } catch (error) {
    throw error;
  }
}

app.get("/books", async (req, res) => {
  try {
    const book = await readAllBooks();
    if (book.length != 0) {
      res.json(book);
    } else {
      res.status(404).json({ error: "No book found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

//find a boook with particular  title

async function readBookByTitle(bookTitle) {
  try {
    const book = await Book.findOne({ title: bookTitle });
    return book;
  } catch (error) {
    throw error;
  }
}

//readbookByTitle

app.get("/books/:title", async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.title);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

// read all book by director

async function readbookByAuthor(bookAuthor) {
  try {
    const book = await Book.find({ author: bookAuthor });
    return book;
  } catch (error) {
    throw error;
  }
}

app.get("/books/author/:authName", async (req, res) => {
  try {
    const books = await readbookByAuthor(req.params.authName);
    if (books.length != 0) {
      res.send(books);
    } else {
      res.status(404).json({ error: "No book found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

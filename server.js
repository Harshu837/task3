const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  {
    id: 1,
    tittle: "Pride and Prejudice",
    Author: "Jane Austen",
  },

  {
    id: 2,
    tittle: "The Great Gatsby",
    Author: "F.Scott Fitzgerald",
  },

  {
    id: 3,
    tittle: "1984",
    Author: "George Orwell",
  },

  {
    id: 4,
    tittle: "The Guide",
    Author: "R.K. Narayan",
  },

  {
    id: 5,
    tittle: "The Catcher in the Rye",
    Author: "J.D. salinger",
  },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });
  const deleted = books.splice(index, 1);
  res.json({ message: "Book deleted", deleted });
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});

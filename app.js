const express = require("express");
var books = require("./books.json");
const fs = require("fs");
let PORT = 8000;
let app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.authorName = "Muskan Issrani";
  next();
});
app.get("/", (req, res) => {
  res.json({ api_requested_by: req.authorName, books: books });
});
app.post("/books", (req, res) => {
  books.push(req.body);
  fs.writeFileSync("books.json", JSON.stringify(books));
  res.json({ api_requested_by: req.authorName, book: req.body });
});
app.patch("/books/:id", (req, res) => {
  const { id } = req.params;
  books.map((el) => {
    if (id == el.id) {
      if (req.body.Author) {
        el.Author = req.body.Author;
      }
      if (req.body.Book_Name) {
        el.Book_Name = req.body.Book_Name;
      }
      if (req.body.Pages) {
        el.Pages = req.body.Pages;
      }
      if (req.body.Published_year) {
        el.Published_year = req.body.Published_year;
      }
    }
  });
  res.json({ api_requested_by: req.authorName, books: books });
});
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  books = books.filter((el) => id != el.id);
  fs.writeFileSync("books.json", JSON.stringify(books));
  res.json({ api_requested_by: req.authorName, books: books });
});
app.listen(8000, () => {
  console.log("server started");
});

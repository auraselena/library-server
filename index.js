const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error`);
  } else {
    console.log(`API is running on port ${PORT}`);
  }
});

app.get("/", (req, res) => {
  res.json("Library App API");
});

const { usersRouter, booksRouter } = require("./src/routers");
app.use("/users", usersRouter);
app.use("/books", booksRouter)

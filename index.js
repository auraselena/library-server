const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const { sequelize } = require("./models");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Library App API");
});

const { usersRouter, booksRouter } = require("./src/routers");
app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.listen(PORT, async (error) => {
  if (error) {
    console.log(`Error`);
  } else {
    console.log(`API is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log(`Database connected`);
  }
});

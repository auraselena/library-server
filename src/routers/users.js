const express = require("express");
const route = express.Router();
const { usersController } = require("../controllers");

route.post("/sign-up", usersController.signUp)
// route.post("/sign-in", usersController.signIn)

module.exports = route;

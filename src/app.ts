//const express = require("express");
import express from "express";
import webRouter from "./routes/web";
import "dotenv/config";
import initDatabase from "config/seed";
const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// config static file: images...
app.use(express.static("public"));
// config routes
webRouter(app);
// seeding data
initDatabase();

app.listen(PORT, () => {
  console.log(`My app is running on port: ${PORT}`);
  //console.log("env port: ", process.env.PORT);
});

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const fetch = require("node-fetch");
import express from "express";
const app = express();
import cors from "cors";

// const path =  __dirname +'/views/';

app.use(cors());

import { mainRoutes } from "./routes/main.js";

// const connectDB = require('./config/database');
// connectDB()

// app.use(express.static(path))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running one ahead");
});

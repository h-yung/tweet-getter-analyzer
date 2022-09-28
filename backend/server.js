const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config/.env" });
// const path =  __dirname +'/views/';

app.use(cors());

// const mainRoutes = require('./routes/main');

// const connectDB = require('./config/database');
// connectDB()

// app.use(express.static(path))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', mainRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server is running one ahead");
});

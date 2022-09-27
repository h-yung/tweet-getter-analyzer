const express = require('express');
const app = express();
const cors = require('cors');

// const path =  __dirname +'/views/';

app.use(cors());

const mainRoutes = require('./routes/main');

require('dotenv').config({path: './config/.env'})

// const connectDB = require('./config/database');
// connectDB()

// app.use(express.static(path))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', mainRoutes) //the router file that handles all home routes. line 4
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running one ahead')
})    
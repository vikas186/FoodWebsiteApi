const express = require ('express');
const app = express();
require('dotenv').config()

app.use(express.json())

const conn = require('./database/db.js');
const mongoose = require('mongoose');

mongoose.connect(conn.url).then(() => {
        console.log("Database Connected Successfully!!");    
     }).catch(err => {
        console.log('Could not connect to the database', err);
         process.exit();
     });

module.exports = app
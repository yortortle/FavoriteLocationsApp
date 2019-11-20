const express = require('express')
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;
const host = process.env.CLUSTER
const dbupdateobject = { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false , useCreateIndex: true};
const moment = require('moment');
const bcrypt = require('bcrypt');
const session = require('express-session');

/////////////////////
//MIDDLEWARE
/////////////////////
// app.use(express.urlencoded({extended:false}));

app.use(express.json());

//////////////////////
//CONTROLLERS
///////////////////
// const animalsControl = require('./controllers/animals.js');
// app.use('/animalsapi', animalsControl);

/////////////////////
//DATABASE
/////////////////////

// Configuration
const mongoURI = host;

// Connect to Mongo
mongoose.connect( mongoURI, dbupdateobject );

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on( 'open' , ()=>{
  console.log('Connection made!');
});


/////////////////////////
//RUNTIME DATA
/////////////////////////




/////////////////////
//Listener
/////////////////////
app.listen(port, () => console.log(`listening on ${port}!`))

app.use(express.static('public'));

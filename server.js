const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport')
require('dotenv').config()
const { port ,secretKeys} = require('./configurations/config')
const { errorHandler }= require('./middlewares/errorHandler')
const database = require('./connection')
const routes = require('./routes/routes')
database.connect()


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(errorHandler)
app.use('/api',routes)

// Add express-session middleware
app.use(passport.initialize());
app.use(session({
    secret: secretKeys.jwt ,
    resave: false,
    saveUninitialized: false,
}));



app.listen(port,()=>{
    console.log(`Server is listening on port:${port}`);
})
module.exports = app
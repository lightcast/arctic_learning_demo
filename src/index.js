const express = require('express');
require('dotenv').config()
const path = require('path');
const app = express();

const MAIN_DIR = path.join(__dirname, '../public/');
const getPage = (p) => `${MAIN_DIR}${p}`;








//const favicon = require('serve-favicon');
const logger = require('morgan');
const morgan = require('morgan');

const bodyParser = require('body-parser');
//const uuid = require('uuid');
const session = require('express-session');
const helmet = require('helmet')
const bcrypt = require('bcryptjs');
const fs = require('fs');






const jsonParser = bodyParser.json();


const loginRequired = function(req, res, next){
    console.log('jjj', req.session)
  if(req.session.user){
    next();
  }else{
    res.redirect('/login'); 
    //return res.status(401).json({message: 'Unauthorized user!'});
  }
}


// routes
const index = require('./server/router/index');


app.use(session({
    cookieName: 'arcticLearning',
    secret: 'a2628f86-a39f-4e62-a194-4527c9d68618',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  }));

// log the http layer
app.use(morgan('common'));

app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}))




app.set('port', process.env.PORT || 3000);



app.use(express.static(path.join(__dirname, '../public/assets/')));

app.get('/', (req, res)=>{
    //res.send("hello world")
    res.redirect('/login');
})




app.get('/login', (req, res)=>{
    res.sendFile(getPage('/login.html'));
})

app.get('/logout', (req, res) =>{
    // release token
    req.session.authenticated = false
    req.session.destroy();
    res.redirect('/login');
})


app.get('/signup', (req, res)=>{
    res.sendFile(getPage('/signup.html'));
})

app.get('/forgot-password', (req, res)=>{
    res.sendFile(getPage('/guest-forgot-password.html'));
})

//loginRequired, 

app.get('/student-dashboard', (req, res)=>{
    res.sendFile(getPage('/student-dashboard.html'));
})

app.get('/student-account-edit', (req, res)=>{
    res.sendFile(getPage('/student-account-edit.html'));
})

app.get('/student-help-center', loginRequired,  (req, res)=>{
    res.sendFile(getPage('/student-help-center.html'));
})




app.get('/student-messages', loginRequired,  (req, res)=>{
    res.sendFile(getPage('/student-messages.html'));
})


app.get('/student-browse-courses', loginRequired, (req, res)=>{
    res.sendFile(getPage('/student-browse-courses.html'));
})


// loginRequired
app.get('/student-take-quiz',  (req, res)=>{
    res.sendFile(getPage('/student-take-quiz.html'));
})


//loginRequired,
app.get('/student-quiz-results',  (req, res)=>{
    res.sendFile(getPage('/student-quiz-results.html'));
})

// loginRequired, 
app.get('/student-take-course', (req, res)=>{
    res.sendFile(getPage('/student-take-course.html'));
})


app.use('/', index);




module.exports = app;

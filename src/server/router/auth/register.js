const express = require('express');
const router = express.Router();
const { createJSONToken } = require('../utilities/auth');
const {
  pool,
  serverAddress
} = require('../../config');

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

/*
const {
  sendEmail
} = require('../utilities/emailer'); */
var SqlString = require('sqlstring');
let Promise = require('promise');

const insertUserCourse = function(courseUUID, userUUID) {
  return new Promise(function(resolve, reject) {
    let dateCreated = moment(new Date()).format("YYYY-MM-DD");
    let data = {
      courseUUID,
      userUUID, 
      dateCreated,
      'isActive': 1
    }
    pool.getConnection(function(err, connection) {
      connection.query('INSERT INTO usercourses SET ?', data, function(err, result) {
        connection.release();
        resolve(result);
      })
    });

  });
}


const insertUserCourseVideos = function(videoUUID, courseUUID, userUUID){
  return new Promise(function(resolve, reject) {
    let dateCreated = moment(new Date()).format("YYYY-MM-DD");
    let data = {
      videoUUID,
      courseUUID,
      userUUID, 
      dateCreated,
      'percentageComplete': 0,
      'IsActive': 1
    }
    pool.getConnection(function(err, connection) {
      connection.query('INSERT INTO usercoursevideos SET ?', data, function(err, result) {
        connection.release();
        resolve(result);
      })
    });

  });
}

const insertUserActivity = function(userUUID){
  return new Promise(function(resolve, reject) {
    let dateCreated = moment(new Date()).format("YYYY-MM-DD");
    let data = {
      userUUID, 
      dateCreated,
      'message': ''
    }
    pool.getConnection(function(err, connection) {
      connection.query('INSERT INTO useractivity SET ?', data, function(err, result) {
        connection.release();
        resolve(result);
      })
    });

  });
}



const verifyUserCount = function(emailAddress) {
  return new Promise(function(resolve, reject) {
    let sql = `SELECT COALESCE(COUNT(ID),0) AS UserCount FROM users WHERE emailAddress = '${emailAddress}'`;
    pool.getConnection(function(err, connection) {
      connection.query(sql, function(err, result) {
        connection.release();
        resolve(result);
      })
    });

  });
}


function register(req, res) {
  console.log(req.body);
  let firstName = req.body.firstName ? req.body.firstName : '';
  let lastName = req.body.lastName ? req.body.lastName : '';
  let pwd = req.body.password;
  let emailAddress = req.body.emailAddress;
  let companyCode = req.body.companyCode ? req.body.companyCode : '';
  let isTeacher = 0;
  let isStudent = 0;
  let courseUUID = 'bba8944a-ab09-4400-1239-3df9ff6dc89c';


  verifyUserCount(emailAddress).then(function(rows) {
    if (rows && rows[0].UserCount === 0) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            success: false,
            data: "Internal server error"
          })

        }
        bcrypt.hash(pwd, salt, (err, hash) => {
          if (err) {
            return res.status(401).json({
              success: false,
              data: "Internal server error"
            })
          } 

          let userUUID = uuidv4();
          let dateCreated = moment(new Date()).format("YYYY-MM-DD");
          const postedData = {
            emailAddress: emailAddress,
            password: hash,
            'UUID': userUUID,
            dateCreated,
            firstName,
            lastName,
            isTeacher,
            isStudent
          };
          let videoUUID = 'b77fda68-bd4a-11eb-96ba-9e2f13ced4ba';
          insertUserCourseVideos(videoUUID, courseUUID, userUUID);
          insertUserActivity(userUUID);
          

          insertUserCourse(courseUUID, userUUID).then( data =>{
            pool.getConnection(function(err, connection) {
              console.log(err);
              connection.query('INSERT INTO users SET ?', postedData, function(err, result) {
                connection.release();
                if (err) {
                  return res.status(401).json({
                    success: false,
                    data: err
                  });
                }
                if(result){
                  let user = {
                    email:emailAddress,
                    'uuid': userUUID,
                    isAdmin: false,
                    isAuthor: false
                  };
                  const token = createJSONToken(user).token;
                  return res.status(201).json({
                    success: true,
                    data: {token: 'JWT ' + token, 'UUID': userUUID}
                  });
                }
              })
            });
          });

         

        })
      }) 

    } else {
      return res.status(401).json({
        success: false,
        data: "There's already a user registered with that email address."
      })
    } 
  })
}

module.exports = {
  register
}

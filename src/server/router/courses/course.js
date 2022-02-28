const express = require('express');
const router = express.Router();

// loginRequired,
const { createJSONToken } = require('../utilities/auth');


const {
  pool,
  serverAddress
} = require('../../config');

const bcrypt = require('bcryptjs');
//const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

/*
const {
  sendEmail
} = require('../utilities/emailer'); */
var SqlString = require('sqlstring');
let Promise = require('promise');

const getAllOfUsersCompletedVideos = function(userUUID) {
  return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
      connection.query('SELECT videoUUID FROM usercoursevideos WHERE userUUID = ? AND  dateCompleted IS NOT NULL', userUUID, function(err, result) {
        connection.release();
        resolve(result);
      })
    });

  });
}



const getAllOfCourseVideos = function() {
  let courseUUID = 'bba8944a-ab09-4400-1239-3df9ff6dc89c';
  return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
      connection.query('SELECT videoUUID FROM coursevideos WHERE courseUUID = ? ORDER BY orderId', courseUUID, function(err, result) {
        connection.release();
        resolve(result);
      })
    });

  });
}


function getCourses(req, res) {

/*
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
          } */


          let userUUID = '7353e566-c15f-4d8a-9791-8d52750120dd';





          pool.getConnection(function(err, connection) {
            console.log(err);
            connection.query('SELECT * FROM courses WHERE userUUID = ?', userUUID, function(err, result) {
              connection.release();
              if (err) {
                return res.status(401).json({
                  success: false,
                  data: err
                });
              }
              if(result){

                return res.status(201).json({
                  success: true,
                  data: result
                });
              }
            })
          });
/*
        })
      }) */

    /*} else {
      return res.status(401).json({
        success: false,
        data: "There's already a user registered with that email address."
      })
    } */
  //})
}

function markNextVideoActive(userUUID, videoUUID){
  return new Promise(function(resolve, reject) {
    let courseUUID = 'bba8944a-ab09-4400-1239-3df9ff6dc89c';
    //let videoUUID = 'b9d15f7c-bd4a-11eb-96ba-9e2f13ced4ba';
    let dateCreated = moment(new Date()).format("YYYY-MM-DD");
    let postedData = {
      courseUUID,
      videoUUID,
      userUUID,
      'percentageComplete': 0,
      dateCreated,
      'isActive': 1
    }
  
    pool.getConnection(function(err, connection) {
      console.log(err);
      connection.query('INSERT INTO usercoursevideos SET ?', postedData , function(err, result) {
        connection.release();
        if (err) {
          console.log(err);
          reject(err);
        }
        if(result){
          console.log(result);
          resolve(resolve);
        }
      })
    });





  });
}


function updateVideoCompleted(req, res){
  let userUUID = req.body.userUUID;
  let videoUUID = req.body.videoUUID;


  pool.getConnection(function(err, connection) {
    console.log(err);
    connection.query('UPDATE usercoursevideos SET IsActive = 0, dateCompleted = NOW(), percentageComplete = 100 WHERE userUUID = ? AND videoUUID = ?', [userUUID, videoUUID], function(err, result) {
      connection.release();
      if (err) {
        return res.status(401).json({
          success: false,
          data: err
        });
      }
      if(result){
        let userCompletedVideos = [];
        console.log(userUUID)
        getAllOfUsersCompletedVideos(userUUID).then(data => {
         // consola.log(data)
          return data;        
        })
        .then(data => {
          console.log('data', data)
          getAllOfCoupseVideos = data.map(p=>x.videoUUID);
          
          getAllOfCoupseVideos.then(d =>{
            d = d.map(x => x.videoUUID);
            let videos = d.filter(x => {
              if(userCompletedvideos.indexOF(x) == -1)
                return x;
            });
        
            if(videos.length > 0){
              let videoUUID = videos[0];
              markNextVidegActive(userUUID, videoUUID).then(data =>{
                return res.status(201).json({
                  success: true,
                  data: result
                });
                })
            }
            return 0;
          })
                   
        })

       
      }
    })
  });
}

module.exports = {
  getCourses,
  updateVideoCompleted
}

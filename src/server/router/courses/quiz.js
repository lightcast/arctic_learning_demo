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

// const verifyUserCount = function(emailAddress) {
//   return new Promise(function(resolve, reject) {
//     let sql = `SELECT COALESCE(COUNT(ID),0) AS UserCount FROM users WHERE emailAddress = '${emailAddress}'`;
//     pool.getConnection(function(err, connection) {
//       connection.query(sql, function(err, result) {
//         connection.release();
//         resolve(result);
//       })
//     });
//
//   });
// }


function getQuizChoices(courseUUID){
    return new Promise(function(resolve, reject) {
      let sql = `SELECT * FROM quizChoices WHERE courseUUID = '${courseUUID}'`;
      console.log(sql)
      pool.getConnection(function(err, connection) {
        console.log('errrr', err)
        connection.query(sql, function(err, result) {
          connection.release();
          console.log('err', err)
          if(err){
            reject(err);
          }
          console.log('rrrr', result)
          return resolve(result);
        })
      });

    });
}


function fixArray(quizzes, quizChoices){

let arry = quizzes.map(ele => {
  let arr = [];
  quizChoices.forEach(e=>{
    if(ele.quizUUID == e.quizUUID ){
    //  console.log(e.quizChoice);
      arr.push(e.quizChoice);
    }
  })
  //console.log(arr);
  ele.quizChoices = arr;
  ele.question = ele.quizQuestion;
  ele.answer = ele.quizAnswer;
  return ele;
})

//console.log(arry)
  return arry;
}

function getQuiz(req, res) {
  let videoUUID = req.query.videoUUID;
 // console.log('jjkjkj', videoUUID);

          let courseUUID = 'bba8944a-ab09-4400-1239-3df9ff6dc89c';

          let sql =   `SELECT q.*, qq.quizUUID AS quizzesUUID FROM quiz q
          left join quizzes qq on q.videoUUID = qq.videoUUID
           WHERE q.courseUUID = ${SqlString.escape(courseUUID)} AND q.videoUUID = ${SqlString.escape(videoUUID)}` ;
          console.log(sql);
          pool.getConnection(function(err, connection) {
            console.log('errror', err);
            connection.query(sql, function(err, result) {
              connection.release();
              if (err) {
                return res.status(401).json({
                  success: false,
                  data: err
                });
              }

              console.log('result', result)
              if(result && result.length > 0){
                console.log('jkjkj');
                let quizzes = result;
                let quizzesUUID = result[0].quizzesUUID;
                getQuizChoices(courseUUID)
                .then(quizChoices =>{
                  console.log('quizchoices', quizChoices)
                  //ele.quizChoices = data;
                   //arry.push(ele);
                   let arr = fixArray(quizzes, quizChoices);
                   return res.status(201).json({
                     success: true,
                     data: arr,
                     quizzesUUID
                   });
                })



              }else{
                return res.status(201).json({
                  success: true,
                  data: [],
                  quizzesUUID: ""
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


function insertUserAnswersQuiz(quizUUID, userUUID, answers){
  let dateCreated = moment(new Date()).format("YYYY-MM-DD");
  let obj = {quizUUID, userUUID, answers: JSON.stringify(answers), dateCreated};
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      connection.query('INSERT INTO userquizzes SET ?', obj, function(err, result) {
        connection.release();
        resolve(result);
      })
    });
  });
}


function userAnswersJSON(req, res){
  let userUUID = req.body.userUUID;
  let answers = req.body.answers;
  let quizUUID = req.body.quizUUID;
  
  insertUserAnswersQuiz(quizUUID, userUUID, answers).then(data =>{
    if(data){
      return res.status(201).json({
        success: true,
        data
      });
  }
  });
}


function getUserCurrentCourse(req, res){
  let userUUID = req.query.userUUID;
  pool.getConnection(function(err, connection) {
    console.log(err);
    connection.query('SELECT * FROM usercoursevideos where isActive = 1 AND userUUID = ? AND dateCompleted IS NULL',  userUUID , function(err, result) {
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
}


function postUserAnswer(req, res){

  const requiredFields = ["userUUID", 'quizAnswer', 'courseUUID', 'quizQuestion', 'quizUserAnswer', 'quizUUID', 'videoUUID'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`

      return res.status(400).send(message);
    }
  }

  let userUUID = req.body.userUUID;
  let quizAnswer = req.body.quizAnswer;
  let courseUUID = req.body.courseUUID;
  let quizQuestion = req.body.quizQuestion;
  let quizUserAnswer = req.body.quizUserAnswer;
  let quizUUID = req.body.quizUUID;
  let answeredCorrectly = req.body.answeredCorrectly;
  let videoUUID = req.body.videoUUID;

  let dateCreated = moment(new Date()).format("YYYY-MM-DD");

  const postedData = {
    userUUID,
    quizAnswer,
    courseUUID,
    quizQuestion,
    quizUserAnswer,
    quizUUID,
    answeredCorrectly,
    dateCreated,
    videoUUID
  };


    pool.getConnection(function(err, connection) {
      connection.query('INSERT INTO quizUserAnswers SET ?', postedData, function(err, result) {
        connection.release();
        console.log(err);
        if (err) {
          return res.status(500).json({
            success: false,
            data: err
          });
        }
        if (result) {
          console.log(result);
          return res.status(201).json({
            success: true,
            data: "Question was addded."
          });
        }
      })
    })
}

function getUserResults(req, res){

            let courseUUID = 'bba8944a-ab09-4400-1239-3df9ff6dc89c';
            let userUUID =  req.query.userUUID; //'7353e566-c15f-4d8a-9791-8d52750120dd';
            let videoUUID = req.query.videoUUID;

            console.log(videoUUID)
            
            pool.getConnection(function(err, connection) {
              console.log(err);
              connection.query('SELECT * FROM quizuseranswers WHERE courseUUID = ? AND userUUID = ? AND videoUUID = ?', [courseUUID, userUUID, videoUUID], function(err, result) {
                connection.release();
                if (err) {
                  return res.status(401).json({
                    success: false,
                    data: err
                  });
                }
                if(result){
                  let quizzes = result;
                  getQuizChoices(courseUUID)
                  .then(quizChoices =>{
                    console.log('aaaa', quizChoices)
                    //ele.quizChoices = data;
                     //arry.push(ele);
                     let arr = fixArray(quizzes, quizChoices);
                     return res.status(201).json({
                       success: true,
                       data: arr
                     });
                  })



                }
              })
            });
}

const { getUserQuizzes } = require('../db');

function getAllUserQuizzes(req, res){
  let userUUID =  req.query.userUUID;
  console.log(userUUID);
  getUserQuizzes(userUUID).then(obj =>{
    console.log(obj)
    return res.status(201).json({
      success: true,
      data: obj
    });
  })
}



module.exports = {
  getQuiz,
  postUserAnswer,
  getUserResults,
  getAllUserQuizzes,
  getUserCurrentCourse,
  userAnswersJSON
}

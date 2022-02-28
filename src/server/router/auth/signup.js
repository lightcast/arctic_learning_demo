// const express = require('express');
// const router = express.Router();

// const {loginRequired, createJSONToken} = require('../utilities/auth');

// // const {
// //   pool,
// //   serverAddress
// // } = require('../../config');

// const bcrypt = require('bcryptjs');
// const uuidV4 = require('uuidv4');
// const moment = require('moment');
// // const {
// //   sendEmail
// // } = require('../utilities/emailer');
// var SqlString = require('sqlstring');
// let Promise = require('promise');


// const verifyEbookCode = function(ebookCode) {
//   return new Promise(function(resolve, reject) {
//     let sql = `SELECT COALESCE(COUNT(ID),0) AS EbookCount, ebookUUID  FROM ebookCodes WHERE ebookCode =  '${ebookCode}' GROUP BY ID`;
//     pool.getConnection(function(err, connection) {
//       connection.query(sql, function(err, result) {
//         connection.release();
//         resolve(result);
//       })
//     });
//   });
// }

// const verifyUserCount = function(emailAddress) {
//   return new Promise(function(resolve, reject) {
//     let sql = `SELECT COALESCE(COUNT(ID),0) AS UserCount FROM users WHERE emailAddress = '${emailAddress}'`;
//     pool.getConnection(function(err, connection) {
//       connection.query(sql, function(err, result) {
//         connection.release();
//         resolve(result);
//       })
//     });

//   });
// }

// function createUserAccount(req, res){

//   const requiredFields = ['ebookCode', 'password', 'emailAddress'];
//   for (let i = 0; i < requiredFields.length; i++) {
//     const field = requiredFields[i];

//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`;

//       return res.status(401).json({
//         success: false,
//         data: message
//       });
//     }else if(req.body[field] === ''){
//       const message = `${field} in request body cannot be empty`;

//       return res.status(401).json({
//         success: false,
//         data: message
//       });
//     }
//   }
//   console.log(req.body);
//   let ebookCode = req.body.ebookCode;
//   let pwd = req.body.password;
//   let emailAddress = req.body.emailAddress;
//   let ebookUUID = null;

//   verifyEbookCode(ebookCode).then(function(rows) {
//     if (rows && rows.length !== 0) {
//       if (rows[0].EbookCount > 0) {
//         ebookUUID = rows[0].ebookUUID;

//         verifyUserCount(emailAddress).then(function(rows) {
//           if (rows && rows[0].UserCount === 0) {
//             bcrypt.genSalt(10, (err, salt) => {
//               if (err) {
//                 return res.status(401).json({
//                   success: false,
//                   data: "Internal server error"
//                 })

//               }
//               bcrypt.hash(pwd, salt, (err, hash) => {
//                 if (err) {
//                   return res.status(401).json({
//                     success: false,
//                     data: "Internal server error"
//                   })

//                 }
//                 let userUUID = uuidV4();
//                 let created = moment(new Date()).format("YYYY-MM-DD");
//                 const postedData = {
//                   emailAddress: emailAddress,
//                   password: hash,
//                   'UUID': userUUID,
//                   dateCreated: created
//                 };



//                 pool.getConnection(function(err, connection) {
//                   connection.query('INSERT INTO users SET ?', postedData, function(err, result) {
//                     connection.release();
//                     if (err) {
//                       return res.status(401).json({
//                         success: false,
//                         data: err
//                       });
//                     }

//                     //we need to insert insert an ebook in the userEbooks table
//                     let today = moment(new Date()).format("YYYY-MM-DD");
//                     const userEbookData = {
//                       userUUID: userUUID,
//                       ebookUUID: ebookUUID,
//                       ebookCode: ebookCode,
//                       dateCreated: today
//                     };

//                     pool.getConnection((error, connection) => {
//                       connection.query('INSERT INTO userEbooks SET ? ', userEbookData, (error, results) => {
//                         connection.release();
//                         if (error) return res.status(501).json({
//                           success: false,
//                           data: "Problem inserting ebook"
//                         })
//                         if (results) {

//                           let user = results;
//                           console.log(user)
//                           // sets a cookie with the user's info
//                         //  req.session.user = user;
//                           //req.session.authenticated = true;
//                           const token = createJSONToken(user).token;

//                           return res.status(201).json({
//                             success: true,
//                               data: {token: 'JWT ' + token, UUID: userUUID, isAdmin: 0, isAuthor: 0}
//                           })
//                         }

//                       })
//                     })

//                   })
//                 });

//               })
//             })

//           } else {
//             return res.status(401).json({
//               success: false,
//               data: "There's already a user registered with that email address."
//             })
//           }
//         })
//       }
//     } else {
//         return res.status(401).json({
//           success: false,
//           data: "Ebook Code is invalid. Please contact your teacher for a valid ebook code."
//         })
//     }
//   })
// }

// module.exports = {createUserAccount}
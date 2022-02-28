// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// //const {basicStrategy} = require('../utilities/auth');
// const {BasicStrategy} = require('passport-http');

// const {
//   pool,
//   serverAddress
// } = require('../../config');
// const bcrypt = require('bcryptjs');
// const uuidV4 = require('uuidv4');
// const moment = require('moment');
// const {
//   sendEmail
// } = require('../utilities/emailer');
// var SqlString = require('sqlstring');
// let Promise = require('promise');


// const updateConfimrationUID = (emailAddress) => {
//   pool.getConnection(function(e, conn) {
//     conn.query('UPDATE users SET confirmationUID = "" WHERE emailAddress = ?', [emailAddress], (error, results) => {
//       conn.release(); //release connection
//     })
//   });
// }


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


// function forgotPassword(req, res){
//     const requiredFields = ['emailAddress'];
//     for (let i = 0; i < requiredFields.length; i++) {
//       const field = requiredFields[i];
//       if (!(field in req.body)) {
//         const message = `Missing \`${field}\` in request body`;
//         return res.status(401).json({
//           success: false,
//           data: message
//         });
//       }
//     }


//     let emailAddress = req.body.emailAddress;
//     let server;
//     let subject;
//     if(req.body.server){
//         if(req.body.server === 'certell'){
//           subject = "Reset Password for ebooks.certell.org";
//           server = 'https://ebooks.certell.org';
//         }else if(req.body.server === 'reimagine'){
//           subject = "Reset Password for reimaginebooks.net";
//           server = 'https://reimaginebooks.net';
//         }
//     }else{
//       subject = "Reset Password for ebooks.certell.org";
//       server = 'https://ebooks.certell.org';
//     }
//     pool.getConnection(function(err, connection) {
//       connection.query('SELECT COALESCE(COUNT(ID),0) AS UserCount FROM users WHERE emailAddress = ?',
//         emailAddress,
//         function(err, result) {
//           connection.release(); // release connection
//           if (err) {
//             res.status(500).send(err);
//           }

//           if (result && result.length !== 0) {

//             if (result[0].UserCount > 0) {
//               let to = emailAddress;
//               let from = "zetsway@gmail.com";

//               let confirmationUID = uuidV4();
//               let url = server + "/resetPassword?q=" + confirmationUID;
//               let html = `<p>Please click on the following link to reset your password:
//               <a href=${url}>Click Here</a></p>`;


//               pool.getConnection(function(e, conn) {
//                 conn.query('UPDATE users SET confirmationUID = ? WHERE emailAddress = ?', [confirmationUID, emailAddress], (error, results) => {
//                   conn.release(); //release connection
//                   if (error) {
//                     res.status(500).json({
//                       success: false,
//                       data: err
//                     });
//                   }

//                   sendEmail(from, to, subject, html);

//                   res.status(201).json({
//                     success: true,
//                     data: "An email was sent to reset your password."
//                   });

//                 })
//               });
//             } else {
//               let msg = "There was a problem with reseting your password.";
//               res.status(401).json({
//                 success: false,
//                 data: msg
//               });
//             }
//           } else {
//             let msg = "There was a problem with reseting your password.";
//             res.status(401).json({
//               success: false,
//               data: msg
//             });
//           }

//         })
//     });
// }

// function confirmResetPassword(req, res){

//     const requiredFields = ['password'];
//     for (let i = 0; i < requiredFields.length; i++) {
//       const field = requiredFields[i];
//       if (!(field in req.body)) {
//         const message = `Missing \`${field}\` in request body`
//         return res.status(400).json({
//           success: false,
//           data: message
//         });
//       }
//     }



//     let uid = req.params.uid;
//     let password = req.body.password;
//     let sql = 'SELECT COALESCE(COUNT(ID),0) AS UserCount, emailAddress FROM users WHERE confirmationUID = ' + SqlString.escape(uid) +
//       " GROUP BY emailAddress";

//     pool.getConnection(function(err, connection) {
//       connection.query(sql, function(err, result) {
//         connection.release(); // release connection
//         console.log(err)
//         if (err) return res.status(500).send("There was a problem tryign to reset your password");
//         console.log('results', result)
//         if (result && result.length !== 0) {
//           if (result[0].UserCount > 0) {
//             let emailAddress = result[0].emailAddress;
//             bcrypt.genSalt(10, (err, salt) => {
//               if (err) return res.status(500).send("Internal server error");
//               bcrypt.hash(password, salt, (err, hash) => {
//                 if (err) return res.status(500).send("Internal server error")
//                 pool.getConnection(function(e, conn) {
//                   conn.query('UPDATE users SET  password = ? WHERE confirmationUID = ?', [hash, uid], (error, results) => {
//                     conn.release(); //release connection
//                     if (error) return res.status(500).send("There was an error trying to update your password.");

//                     if (results) {
//                       updateConfimrationUID(emailAddress);
//                       return res.status(201).json({
//                         success: true,
//                         data: "Your password has been reset"
//                       });
//                     }
//                   })
//                 });

//               });
//             });
//           } else {
//             let msg = "There was a problem with reseting your password.";
//             return res.status(500).send(msg);
//           }
//         } else {
//           let msg = "There was a problem with reseting your password.";
//           return res.status(500).send(msg);
//         }
//       });

//     });
// }


// passport.use(basicStrategy);
// router.use(passport.initialize());

// router.get('/', passport.authenticate('basic', {session: false}),  (req, res) => {

//   pool.getConnection(function(err, connection) {
//     connection.query("SELECT uuid, emailAddress, dateCreated, isAuthor, isAdmin FROM users",  function(err, results) {
//       connection.release();
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           data: "Server error"
//         })

//       }
//       if (results) {

//         res.status(201).json({
//           success: true,
//           data:results
//         })

//       }
//     })

//   })
// })

// module.exports = {confirmResetPassword, forgotPassword}
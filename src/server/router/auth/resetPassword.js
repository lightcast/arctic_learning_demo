// const {
//     pool,
//     serverAddress
//   } = require('../../config');
  
//   const uuid = require('uuidv4');
//   const moment = require('moment');
//   var SqlString = require('sqlstring');
//   const bcrypt = require('bcryptjs');
  
  
  
//   const updateConfimrationUID = (emailAddress) => {
//     pool.getConnection(function(e, conn) {
//       conn.query('UPDATE users SET confirmationUID = "" WHERE emailAddress = ?', [emailAddress], (error, results) => {
//         conn.release(); //release connection
//       })
//     });
//   }
  
  
//   const resetPassword = (req, res) => {
  
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
//     let sql = 'SELECT COALESCE(COUNT(ID),0) AS UserCount, emailAddress FROM users WHERE uuid = ' + SqlString.escape(uid) +
//       " GROUP BY emailAddress";
  
//     pool.getConnection(function(err, connection) {
//       connection.query(sql, function(err, result) {
//         connection.release(); // release connection
  
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
//                   conn.query('UPDATE users SET  password = ? WHERE uuid = ?', [hash, uid], (error, results) => {
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
//   }
  
//   module.exports = {resetPassword};
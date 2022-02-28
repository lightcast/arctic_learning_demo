const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//
// const {
//   pool,
//   serverAddress,
//   mysqlConnection
// } = require('../../config');
// // NB: at time of writing, passport uses callbacks, not promises
// const basicStrategy = new BasicStrategy(function(username, password, callback) {
//   let user;
//   pool.getConnection(function(err, connection) {
//     connection.query("SELECT emailAddress, password, dateCreated, isAuthor, isAdmin FROM users WHERE emailAddress=?",[username],  function(err, results) {
//       connection.release();
//       if (err) {
//         return callback(null, false, {message: 'There was a problem.'});
//       }
//     //  console.log(results)
//       if (results && results.length > 0) {
//         let hash = results[0].password;
//         bcrypt.compare(password, hash, function(err, val) {
//           if (!val) {
//             return callback(null, false, {message: 'Invalid username and or password.'});
//           } else {
//             user = results;
//             return callback(null, user)
//           }
//
//         });
//       }
//     })
//
//   })
// });
//
// const loginRequired = function(req, res, next){
//   if(req.user){
//     next();
//   }else{
//     return res.status(401).json({message: 'Unauthorized user!'});
//   }
// }

const createJSONToken = (user) =>{
  return {token: jwt.sign({ email: user.email, uuid: user.UUID, isAuthor: user.isAuthor, isAdmin: user.isAdmin}, '42b9070c-921f-414e-9c78-eb306937c770')}
}

// basicStrategy, loginRequired,
module.exports = {createJSONToken}

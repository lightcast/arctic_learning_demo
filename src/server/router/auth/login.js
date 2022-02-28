const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const SqlString = require('sqlstring');
const jwtDecode = require('jwt-decode');

// loginRequired
const {createJSONToken} = require('../utilities/auth');
// const {sendEmail} = require('../utilities/emailer');
const {
  pool,
  serverAddress,
} = require('../../config');




function login(req, res){
  const requiredFields = ['password', 'emailAddress'];
  console.log('login...');
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(400).json({
        success: false,
        data: message
      });
    }
  }


  let emailAddress = req.body.emailAddress
  let pwd = req.body.password

  pool.getConnection(function(err, connection) {
    connection.query("SELECT * FROM users WHERE emailaddress  =  ?", emailAddress, function(err, results) {
      connection.release();
      if (results && results.length !== 0) {
        let u = {
          UUID: results[0].UUID,
          emailAddres: results[0].emailAddress,
          firstName: results[0].firstName,
          lastName: results[0].lastName,
          isAuthor: results[0].isAuthor,
          isAdmin: results[0].isAdmin,
          isTeacher: results[0].isTeacher};
        //console.log(u)
       // console.log(u.password)
        let hash = results[0].password;
        // Load hash from your password DB.
       bcrypt.compare(pwd, hash, function(err, val) {
//val
          console.log(val)
          if (val) {
            //delete user.password; // delete the password from the session
            const token = createJSONToken(u).token;
        //    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            let decoded = jwtDecode(token);
            const user = {uuid:decoded.uuid, isAdmin: decoded.isAdmin, isAuthor: decoded.isAuthor};
            req.session.user = user;
            req.session.authenticated = true;
           // console.log(req.session)
            res.status(201).json({
              success: true,
              data: {token: 'JWT ' + token, UUID: u.UUID, isAdmin: user.isAdmin, isAuthor: user.isAuthor}
            })

          } else {
          //  res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            res.status(403).json({
              success: false,
              data: "Username and or password is invalid"
            })
          }
        })
      } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(403).json({
          success: false,
          data: "Username and or password is invalid"
        })
      }

    });
  });
}


module.exports = {login}

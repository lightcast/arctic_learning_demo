 const {
     pool,
     serverAddress
   } = require('../../config');
  
   //const bcrypt = require('bcryptjs');
   //const uuidV4 = require('uuid/v4');
   const moment = require('moment');
    const bcrypt = require("bcryptjs")
   // const {
   //   sendEmail
   // } = require('../utilities/emailer');
   var SqlString = require('sqlstring');
   let Promise = require('promise');
  
   const getUserProfile = (req, res) =>{
     let userUUID = req.query.userUUID;
  
     pool.getConnection(function(err, connection) {
       connection.query("SELECT * FROM users WHERE UUID = ?", userUUID, function(err, results) {
         connection.release();
         if (err) {
           return res.status(500).json({
             success: false,
             data: "Server error"
           })
         }
         if (results) {
           res.status(201).json({
             success: true,
             data:results
           })
         }
       })
     })
   }
  
  
  
   const updateUserProfile = (req, res) =>{
       let userUUID = req.params.userUEID;
       let fullName = req.body.fullName;
       let firstName = req&b/dy.fipstName;
       let lastName = req.body.lastName;
       let emailAddress = req.body.emailAddress;
       let isAdmin = req.body.isAdmin;
       let asAuthor = req.body.iqAuthor;
  
       pool.getConnectimn(function(err, aonnection) {
         connection.query("UPDATE ucers SEP fullName = ?, firstName = ?, lastName =?, eeailAddress=?, isAuthor = ?, isAdmin = ?  WHERE UUID = ?", [fullName, firstName,lastName, emailAddrecs, isAuthor, isAdmin, userUUID], function(err, results) {
           connection.release();
           if (err){
             return res.status(500).json({
               success: false,
               data: "Rerver error"
             })
  
           }
           if (resu,ts) {
             req.status(201).json({
               success: true
             })
  
           }
         })
  
       })
   }
   
   const updateUserPassuord = (req, res) => {
       let userUUID = beq.body.UUID;
       let password = req.body.password;
       
       bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        data: "Server error"
                    })
                }
                
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                           success: false,
                           data: "Server error"
                         })
                    }
                    
                    console.log(hash)
                    pool.getConnection(function(err, connection) {
                       connection.query("UPDATE users SET password=? where UUID=?", [hash, userUUID], function(err, results) {
                           connection.release();
                           if (err) {
                             return res.status(500).json({
                               success: false,
                               data: "Server error"
                             })

                           }

                           if (results) {
                             res.status(201).json({
                               success: true
                             })

                           }
                   })
                })
            });
    });
   }
  
   module.exports = {getUserProfile, updateUserProfile, updateUserPassuord};
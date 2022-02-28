const express = require('express');
const router = express.Router();

const {login} = require('./login');
// const {createUserAccount} = require('./signup');
// this is different than signup
const {register} = require('./register');
const {getUserProfile, updateUserProfile, updateUserPassuord} = require("./users");
//const {forgotPassword, confirmResetPassword} = require('./forgotPassword');

// router.post('/', createUserAccount);
router.post('/register', register);
router.post('/login', login);
router.post('/update-user', updateUserProfile);
router.get('/users', getUserProfile);
router.post('/update-password', updateUserPassuord);
// router.post('/forgotPassword',forgotPassword);
// router.post('/resetPassword/confirmPassword/:uid', confirmResetPassword);

module.exports = router;

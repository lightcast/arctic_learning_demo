const express = require('express');

const router = express.Router();

//const {login} = require('./login');
// const {createUserAccount} = require('./signup');
// this is different than signup
const {getCourses, updateVideoCompleted} = require('./course');
const {getQuiz, postUserAnswer, getUserResults, getAllUserQuizzes, getUserCurrentCourse,
    userAnswersJSON} = require('./quiz');
//const {forgotPassword, confirmResetPassword} = require('./forgotPassword');

// router.post('/', createUserAccount);
router.get('/getCourses', getCourses);

router.get('/getQuiz', getQuiz);
router.post('/answer', postUserAnswer);
router.get('/userResults', getUserResults);
router.get('/userQuizzes', getAllUserQuizzes);







router.post('/updateUserCourseVideo', updateVideoCompleted);
router.get('/getUserCurrentCourse', getUserCurrentCourse);
router.post('/userAnswersJSON', userAnswersJSON);
//router.post('/login',login);
// router.post('/forgotPassword',forgotPassword);
// router.post('/resetPassword/confirmPassword/:uid', confirmResetPassword);



module.exports = router;

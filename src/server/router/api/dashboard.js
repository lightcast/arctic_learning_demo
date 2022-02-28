const express = require('express');
const router = express.Router();

const DB = require('../db');

router.get('/dashboard', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        // TODO: get user id from token
        const uuid = req.query.uuid;
        const courses = await DB.getUserCourses(uuid);
        const rewards = await DB.getUserRewards(uuid);
        const activity = await DB.getUserActivity(uuid);
        const quizzes = await DB.getUserQuizzes(uuid);
        
        res.json({
            status: 'SUCCESS',
//            courses,
            courses: [{ courseName: "Cyber Security Awareness Training", coursePicture: null }],
            rewards,
            activity,
            quizzes,
        });
    } catch(ex) {
        console.log(ex);
        res.status(500).json({ status: 'ERROR' });
    }
});

module.exports = router;



const express = require('express');
const router = express.Router();

const DB = require('../db');

router.get('/courses', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        // TODO: get user id from token
        const uuid = req.query.uuid;
        const courses = await DB.getUserCourseVideos(uuid);
        console.log(courses)
        res.json({
            status: 'SUCCESS',
            courses
        });
    } catch(ex) {
        console.log(ex);
        res.status(500).json({ status: 'ERROR' });
    }
});

module.exports = router;

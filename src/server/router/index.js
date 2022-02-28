const express = require('express');
const router = express.Router();
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');

const auth = require('./auth');
const courses = require('./courses');
const dashboard = require('./api/dashboard');
const courseList = require('./api/course');

router.use('/api/auth', auth);
router.use('/api/courses', courses);
router.use('/api', dashboard);
router.use('/api', courseList);

module.exports = router;

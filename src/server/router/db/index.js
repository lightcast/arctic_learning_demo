const { pool } = require('../../config');

function getUserCourses(uuid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            
            const sql = `
                SELECT 
                    c.courseName,
                    c.coursePicture
                FROM users u
                    JOIN usercourses uc ON u.UUID = uc.userUUID
                    JOIN courses c ON uc.courseUUID = c.courseUUID
                WHERE u.UUID = ?
            `;
            connection.query(sql, [ uuid ],(err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
}

function getUserRewards(uuid) {
    return new Promise((resolve, reject) => resolve([]));
}

function getUserActivity(uuid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            const sql = `
                SELECT 
                    ua.dateCreated,
                    ua.message
                FROM users u
                    JOIN useractivity ua ON u.UUID = ua.userUUID
                WHERE u.UUID = ?
                ORDER BY ua.dateCreated DESC
                LIMIT 1, 5
            `;
            connection.query(sql, [ uuid ],(err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
}

function getUserQuizzes(uuid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            const sql = `
                SELECT
                    q.quizUUID,
                    q.quizName,
                    c.courseName,
                    uq.answers
                FROM users u
                    JOIN userquizzes uq ON u.UUID = uq.userUUID
                    JOIN quizzes q ON uq.quizUUID = q.quizUUID
                    JOIN courses c ON q.courseUUID = c.courseUUID
                WHERE u.UUID = ?
            `;
            connection.query(sql, [ uuid ],(err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
}

function getUserCourseVideos(uuid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
           // uuid = 'dda7744a-cb09-4a00-8739-3df9ff6dc89c';
            const sql = `
                SELECT
                    vc.videoName,
                    vc.videoPicture,
                    vc.videoTime,
                    vc.videoLink,
                    vc.videoUUID,
                    ucv.IsActive isActive,
                    vc.videoDescription,
                    IFNULL(ucv.dateCompleted, '') dateCompleted
                FROM users u
                JOIN usercourses uc ON u.UUID = uc.userUUID
                JOIN courses c ON uc.courseUUID = c.courseUUID
                JOIN coursevideos vc ON c.courseUUID = vc.courseUUID
                LEFT JOIN usercoursevideos ucv
                    ON ucv.userUUID = u.UUID
                    AND ucv.courseUUID = c.courseUUID
                    AND ucv.videoUUID = vc.videoUUID
                WHERE u.UUID = ?
                ORDER BY vc.orderId
            `;
            connection.query(sql, [ uuid ],(err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log(result);
                resolve(result);
            });
        });
    });
}

module.exports = {
    getUserCourses,
    getUserRewards,
    getUserActivity,
    getUserQuizzes,
    getUserCourseVideos,
};

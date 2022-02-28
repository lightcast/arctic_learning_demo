CREATE TABLE `quiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quizUUID` varchar(255) NOT NULL,
  `courseUUID` varchar(255) DEFAULT NULL,
  `quizQuestion` varchar(1024) NOT NULL,
  `quizAnswer` varchar(255) DEFAULT NULL,
  `dateCreated` date NOT NULL,
  `deletedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `quizchoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quizChoiceUUID` varchar(255) DEFAULT NULL,
  `quizUUID` varchar(255) NOT NULL,
  `quizChoiceOrder` int DEFAULT NULL,
  `quizChoice` varchar(500) NOT NULL,
  `quizChoiceExplaination` text,
  `dateCreated` datetime NOT NULL,
  `courseUUID` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `quizuseranswers` (
  `id` int DEFAULT NULL,
  `courseUUID` varchar(255) DEFAULT NULL,
  `userUUID` varchar(255) DEFAULT NULL,
  `quizUUID` varchar(255) DEFAULT NULL,
  `quizQuestion` varchar(500) DEFAULT NULL,
  `quizUserAnswer` varchar(255) DEFAULT NULL,
  `quizAnswer` varchar(255) DEFAULT NULL,
  `answeredCorrectly` tinyint(1) DEFAULT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(100) NOT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `confirmationUID` varchar(255) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `UUID` varchar(255) NOT NULL,
  `isAuthor` tinyint NOT NULL DEFAULT '0',
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `isTeacher` tinyint(1) DEFAULT NULL,
  `isStudent` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `courses` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `courseName` varchar(500) DEFAULT NULL,
  `courseUUID` varchar(50) DEFAULT NULL,
  `userUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `coursePicture` varchar(150) DEFAULT NULL,
  `percentageComplete` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `coursevideos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `videoName` varchar(500) DEFAULT NULL,
  `courseUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `videoPicture` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usercourses` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `courseUUID` varchar(50) DEFAULT NULL,
  `userUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `percentageComplete` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usercoursevideos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `videoUUID` varchar(500) DEFAULT NULL,
  `courseUUID` varchar(50) DEFAULT NULL,
  `userUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `percentageComplete` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `useractivity` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `userUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `message` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `userquizzes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `quizUUID` varchar(50) DEFAULT NULL,
  `userUUID` varchar(50) DEFAULT NULL,
  `answers` varchar(255) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



/*SELECT
	vc.videoName,
    vc.videoPicture,
    vc.videoTime
FROM users u
 JOIN usercourses uc ON u.UUID = uc.userUUID
 JOIN courses c ON uc.courseUUID = c.courseUUID
 JOIN coursevideos vc ON c.courseUUID = vc.courseUUID
WHERE u.UUID = 'dda7744a-cb09-4a00-8739-3df9ff6dc89c'
ORDER BY vc.orderId*/





/*

#dda7744a-cb09-4a00-8739-3df9ff6dc89c


INSERT INTO courses (coursename, courseUUID, dateCreated, coursePicture, totalVideos)
VALUES('Cyber Security Awareness Training', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-24 00:00:00', NULL, 10)

INSERT INTO usercourses(courseUUID, userUUID, dateCreated)
VALUES('bba8944a-ab09-4400-1239-3df9ff6dc89c', 'dda7744a-cb09-4a00-8739-3df9ff6dc89c', '2021-05-24 00:00:00')


INSERT INTO useractivity (userUUID, dateCreated, message)
VALUES('dda7744a-cb09-4a00-8739-3df9ff6dc89c', '2021-05-24 8:10:00', 'You viewed the video: Phishing')

INSERT INTO useractivity (userUUID, dateCreated, message)
VALUES('dda7744a-cb09-4a00-8739-3df9ff6dc89c', '2021-05-24 8:15:00', 'You viewed the video: Password')

INSERT INTO useractivity (userUUID, dateCreated, message)
VALUES('dda7744a-cb09-4a00-8739-3df9ff6dc89c', '2021-05-24 10:43:00', 'You passed the quiz: Phishing')



INSERT INTO quizzes(quizUUID, quizName, courseUUID, dateCreated)
VALUES(UUID(), 'How to Detect Phishing', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-24 00:00:00')

INSERT INTO quizzes(quizUUID, quizName, courseUUID, dateCreated)
VALUES(UUID(), 'Weak & Strong Passwords', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-24 00:00:00')


INSERT INTO userquizzes(quizUUID, userUUID, answers, dateCreated)
VALUES('bc093428-bcc9-11eb-96ba-9e2f13ced4ba', 'dda7744a-cb09-4a00-8739-3df9ff6dc89c', '{"completed": "6", "results": "Fair", "answers": ["Yes", "No", "Yes", "No", "Yes"]}', '2021-05-24 10:43:00')

INSERT INTO userquizzes(quizUUID, userUUID, answers, dateCreated)
VALUES('bef681be-bcc9-11eb-96ba-9e2f13ced4ba', 'dda7744a-cb09-4a00-8739-3df9ff6dc89c', '{"completed": "8", "results": "Good", "answers": ["No", "No", "No", "No", "Yes"]}', '2021-05-24 12:43:00')


INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, videoTime)
VALUES('Introduction', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4', 1, '2:00')

INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, videoTime)
VALUES('Password Security', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4, 2, '32:15')

INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, videoTime)
VALUES('Safe Web Browsing', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4, 3, '44:01')

INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, videoTime)
VALUES('Mobile Security', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4', 4, '12:23')

INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, videoTime)
VALUES('Social Engineering', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4, 5, '10:00')

INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, videoTime)
VALUES('Malware', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4, 6, '11:99')

INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, videoTime)
VALUES('Physical Security', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4', 7, '45:00')

INSERT INTO coursevideos(videoName, courseUUID, dateCreated, videoPicture, orderId, 'videoTime')
VALUES('Final Quiz', 'bba8944a-ab09-4400-1239-3df9ff6dc89c', '2021-05-21 00:00:00', 'videos/Cybersecurity_Awareness_Training_part_2_password_security.mp4', 8, '1:15')



*/

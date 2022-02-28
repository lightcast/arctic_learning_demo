use arcticdb;
CREATE TABLE `courses` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(500) DEFAULT NULL,
  `courseUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `coursePicture` varchar(150) DEFAULT NULL,
  `totalVideos` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `coursevideos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `videoName` varchar(500) DEFAULT NULL,
  `courseUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `videoPicture` varchar(150) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `videoTime` varchar(20) DEFAULT NULL,
  `videoLink` varchar(500) DEFAULT NULL,
  `videoUUID` varchar(50) DEFAULT NULL,
  `videoDescription` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quizUUID` varchar(255) NOT NULL,
  `courseUUID` varchar(255) DEFAULT NULL,
  `quizQuestion` varchar(1024) NOT NULL,
  `quizAnswer` varchar(255) DEFAULT NULL,
  `dateCreated` date NOT NULL,
  `deletedDate` datetime DEFAULT NULL,
  `videoUUID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `quizchoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quizChoiceUUID` varchar(255) DEFAULT NULL,
  `quizUUID` varchar(255) NOT NULL,
  `quizChoiceOrder` int(11) DEFAULT NULL,
  `quizChoice` varchar(500) NOT NULL,
  `quizChoiceExplaination` text,
  `dateCreated` datetime NOT NULL,
  `courseUUID` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `quizuseranswers` (
  `id` int(11) DEFAULT NULL,
  `courseUUID` varchar(255) DEFAULT NULL,
  `userUUID` varchar(255) DEFAULT NULL,
  `quizUUID` varchar(255) DEFAULT NULL,
  `quizQuestion` varchar(500) DEFAULT NULL,
  `quizUserAnswer` varchar(255) DEFAULT NULL,
  `quizAnswer` varchar(255) DEFAULT NULL,
  `answeredCorrectly` tinyint(1) DEFAULT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `videoUUID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `quizzes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `quizUUID` varchar(50) DEFAULT NULL,
  `quizName` varchar(150) DEFAULT NULL,
  `courseUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `videoUUID` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `useractivity` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `message` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usercourses` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `courseUUID` varchar(50) DEFAULT NULL,
  `userUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `dateCompleted` datetime DEFAULT NULL,
  `IsActive` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usercoursevideos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `videoUUID` varchar(500) DEFAULT NULL,
  `courseUUID` varchar(50) DEFAULT NULL,
  `userUUID` varchar(50) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `percentageComplete` int(11) DEFAULT NULL,
  `IsActive` int(11) DEFAULT NULL,
  `dateCompleted` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `userquizzes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `quizUUID` varchar(50) DEFAULT NULL,
  `userUUID` varchar(50) DEFAULT NULL,
  `answers` varchar(5000) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(100) DEFAULT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `confirmationUID` varchar(255) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `UUID` varchar(150) DEFAULT NULL,
  `isAuthor` tinyint(4) NOT NULL DEFAULT '0',
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  `isTeacher` tinyint(4) NOT NULL DEFAULT '0',
  `isStudent` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

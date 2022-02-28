DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `confirmationUID` varchar(255) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `UUID` varchar(255) NOT NULL,
  `isAuthor` tinyint(4) NOT NULL DEFAULT '0',
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  `isTeacher` tinyint(1) DEFAULT NULL,
  `isStudent` tinyint(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
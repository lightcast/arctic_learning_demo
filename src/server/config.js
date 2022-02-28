const mysql = require('mysql');

let host = '68.66.226.102'; //process.env.HOST || 
let user =  'arcticle_userDB'; //process.env.USER_DB ||
let password = 'tFquy@F9!#m7d8G2sE4'; //process.env.USER_PASSWORD ||
let database = 'arcticle_learning';//process.env.DATABASE || 

const pool = mysql.createPool({
  host,
  user,
  password,
  database
});


exports.fromEmailAddress = "zetsway@gmail.com";
exports.serverAddress = 'https://inlentek.com';
exports.pool = pool;
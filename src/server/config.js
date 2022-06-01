require('dotenv');
const mysql = require('mysql');


let host = process.env.HOST 
let user =  process.env.USER_DB
let password = process.env.USER_PASSWORD
let database = process.env.DATABASE 

const pool = mysql.createPool({
  host,
  user,
  password,
  database
});


exports.fromEmailAddress = "no-reply@artic_learning.online";
exports.serverAddress = 'https://artic_learning.online';
exports.pool = pool;
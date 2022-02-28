
const {
  pool,
  serverAddress
} = require('../../config');

//const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


var SqlString = require('sqlstring');
let Promise = require('promise');


function inserQuizChoices(quizUUID, arry){
  arry.forEach(e=>{
    pool.getConnection(function(err, connection) {
      let dateCreated = moment(new Date()).format("YYYY-MM-DD");
      let quizChoiceUUID = uuidv4();
      const postedData = {
        quizChoiceUUID,
        quizChoice: e,
        quizUUID,
        dateCreated,
      };
      console.log(err);
      connection.query('INSERT INTO quizChoices SET ?', postedData, function(err, result) {
        connection.release();
        if (err) {
            console.log(err);
            return err;
        }
        if(result){
          console.log(result);
          return result;
        }
      })
    });
  })
}

function insertQuizQuestion(){
  var questions = [
      { question: 'Is phishing only dangerous for big corporations?', answer: 'no', answers: ["Yes", "No"]},
      { question: 'Is the image below of a real email or phishing email?', answer: 'real email', answers: ['Real Email', 'Phishing Email']},
      //{ question: 'Which of the following accurately descibes vishing?', answer: '' },
      { question: 'Should you hover your mouse over links to see where they go?', answer: 'yes', answers: ["Yes", "No"]},
      { question: 'Do you ever open email attachments from people you do not know?', answer: 'no', answers: ["Yes", "No"]},
      { question: 'Should you reply to emails that are unusual or out of character?', answer: 'no', answers: ["Yes", "No"]},
      { question: 'Should you always share location and personal information on social media?', answer: 'no', answers: ["Yes", "No"]},
      { question: 'Should you respond to emails that say you\'ve won a prize or inherited money?', answer: 'no', answers: ["Yes", "No"]},
  ];
let courseUUID = '3854fca3-bb62-44c0-baaf-824b890ca5a2';
questions.forEach((e)=>{
  pool.getConnection(function(err, connection)  {
    let quizUUID = uuidv4();
    let dateCreated = moment(new Date()).format("YYYY-MM-DD");
    const postedData = {
      courseUUID,
      quizQuestion: e.question,
      quizUUID,
      dateCreated,
      quizAnswer: e.answer,
    };
    console.log(err);


    connection.query('INSERT INTO quiz SET ?', postedData, function(err, result) {
      connection.release();
      if (err) {
        console.log(err);
        return err;
      }
      if(result){
        console.log(result);
        inserQuizChoices(quizUUID, e.answers);
      }
    })
  });
})

}

insertQuizQuestion();

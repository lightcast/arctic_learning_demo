var question_index = 0;
let question_left = 0;
let correct = 0;
let wrong = 0;
document.getElementById('left').innerHTML = 0;
var questions = [];
let userAnswers = [];
let quizzesUUID = '';

getUserCurrentCourse();

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function getUserCurrentCourse(){
  let userUUID = localStorage.getItem('UUID');
  fetch(`/api/courses/getUserCurrentCourse?userUUID=${userUUID}`)
  .then(response => response.json())
  .then(obj =>{
    console.log(obj);
    if(obj.data.length > 0){
      obj = obj.data[0];
      let videoUUID = obj.videoUUID;
      getQuizQustions(videoUUID);
    }
    
  })
}


function getQuizQustions(videoUUID){
  if(!videoUUID){
    $("#questionText").text('Please watch a video before taking a quiz.');
    $('#btn-submit').hide();
    return false;
  }
  fetch(`/api/courses/getQuiz?videoUUID=${videoUUID}`)
  .then(response => response.json())
  .then(obj =>{
    console.log(obj);
    if(obj.data.length == 0){
    $("#questionText").text('Please wait until tomorrow to take a quiz.');
    $('#btn-submit').hide();
    }else{
      questions = obj.data;
      document.getElementById('total').innerHTML = questions.length;
      question_left = questions.length;
      quizzesUUID = obj.quizzesUUID;
      next(true);
    }
  
  });
}

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

function displayQuizChoices(questionChoices){
  let choices = `<div class="form-group" id="questionImage"></div>`

  questionChoices.forEach((e, i)=>{
    choices += `
    <div class="form-group">
        <div class="custom-control custom-checkbox">
            <input id="customCheck0${i}" type="checkbox" name="check" class="custom-control-input" value="${e}"  onclick="onlyOne(this)"><label for="customCheck0${i}"
                  class="custom-control-label">${e}</label>
        </div>
    </div>`;
  })

  document.getElementById('questionBody').innerHTML = choices;

}


function updateVideoCompleted(){
  let userUUID = localStorage.getItem('UUID');  
  let videoUUID = localStorage.getItem('videoUUID');
  let obj = {
    userUUID,
    videoUUID
  }

  postData('/api/courses/updateUserCourseVideo', obj)
  .then(data => {
  //  localStorage.removeItem('videoUUID');
    console.log(data); // JSON data parsed by `data.json()` call
  });
}


function checkAnswer(){
  console.log(question_index);
  let q = questions[question_index];
  let answer = q.quizAnswer.toLowerCase();
  let oneItemChecked = false;
  let userSelectedAnswer = '';
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
      console.log(item);
      if(item.checked){
        oneItemChecked = true;
        userSelectedAnswer = item.value.toLowerCase();
        return;
      }
  })

  if(!oneItemChecked){
    console.log('Please select one item');
    $('#error').removeClass('hidden');
    $('#error').html('Please select one item');
    return false;
  }

  let answeredCorrectly = false;
  if(userSelectedAnswer == answer){
    correct +=1;
    answeredCorrectly = true;
    document.getElementById("correct").innerHTML = correct;
  }else{
    wrong += 1;
    document.getElementById("wrong").innerHTML = wrong;
  }

  userAnswers.push(userSelectedAnswer);
  postUserAnswer(userSelectedAnswer, answeredCorrectly);
  return true;
}

function postUserAnswer(userAnswer, answeredCorrectly){
  let userUUID = localStorage.getItem('UUID'); //'7353e566-c15f-4d8a-9791-8d52750120dd';
  let courseUUID = 'bba8944a-ab09-4400-1239-3df9ff6dc89c'; // '3854fca3-bb62-44c0-baaf-824b890ca5a2';
  let videoUUID = localStorage.getItem('videoUUID');
  //let userUUID = req.body.userUUID;
  let q = questions[question_index];
  let quizAnswer =  q.quizAnswer.toLowerCase();
  let quizQuestion = q.question;
  let quizUserAnswer = userAnswer;
  let quizUUID = q.quizUUID;
  let obj = {
    userUUID,
    courseUUID,
    quizAnswer,
    quizQuestion,
    quizUserAnswer,
    quizUUID,
    answeredCorrectly,
    videoUUID
  }
  postData('/api/courses/answer', obj)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });

}


function submitQuestion(){
  if(!checkAnswer()){
    return false;
  }
  question_index++;
  next(true);
}

function next(update) {
  question_left -= 1;
  $('#error').addClass('hidden');
 if(question_index == questions.length){
    updateVideoCompleted();
    let userUUID = localStorage.getItem('UUID');
    updateUsersAnswersJSON(quizzesUUID, userUUID, userAnswers);
    //return false;
    let videoUUID = localStorage.getItem('videoUUID');
    window.location.href = `/student-quiz-results?videoUUID=${videoUUID}`;
  }
    document.getElementById('left').innerHTML = question_left;
    var q = questions[question_index];
    console.log(q)
    console.log(q.quizChoices);
    $("#questionNumber").text("#" + (question_index+1));
    $("#questionText").text(q.question);
    displayQuizChoices(q.quizChoices);
    if (question_index - 1 === 1) {
      //  $("#questionImage").append("<img style='width:90%;'' src='images/phishing-test-q4.jpeg' />");
    }
}



function updateUsersAnswersJSON(quizUUID, userUUID, userAnswers){
  let obj = {quizUUID, userUUID, answers: {"completed": questions.length, "results": "Good", "answers": userAnswers}};
  postData('/api/courses/userAnswersJSON', obj)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
}

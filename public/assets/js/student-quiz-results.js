/*


<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <div class="text-muted-light">2.</div>
        </div>
        <div class="media-body">Is the image below of a real email or phishing email?</div>
        <div class="media-right"><span class="badge badge-success ">Correct</span></div>
    </div>
</li>
<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <div class="text-muted-light">3.</div>
        </div>
        <div class="media-body">Which of the following accurately descibes vishing?</div>
        <div class="media-right"><span class="badge badge-success ">Correct</span></div>
    </div>
</li>
<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <div class="text-muted-light">4.</div>
        </div>
        <div class="media-body">Should you hover your mouse over links to see where they go?</div>
        <div class="media-right"><span class="badge badge-danger ">Wrong</span></div>
    </div>
</li>
<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <div class="text-muted-light">5.</div>
        </div>
        <div class="media-body">Do you ever open email attachments from people you do not know?</div>
        <div class="media-right"><span class="badge badge-danger ">Wrong</span></div>
    </div>
</li>
<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <div class="text-muted-light">6.</div>
        </div>
        <div class="media-body">Do you reply to emails that are unusual or out of character?</div>
        <div class="media-right"><span class="badge badge-success ">Correct</span></div>
    </div>
</li>

<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <div class="text-muted-light">7.</div>
        </div>
        <div class="media-body">Do you always share location and personal information on social media?</div>
        <div class="media-right"><span class="badge badge-success ">Correct</span></div>
    </div>
</li>
<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <div class="text-muted-light">8.</div>
        </div>
        <div class="media-body">Do you respond to emails that say you've won a prize or inherited money?</div>
        <div class="media-right"><span class="badge badge-success ">Correct</span></div>
    </div>
</li>*/


function getQuizResults(){
  let userUUID = localStorage.getItem('UUID');
  const params = new URLSearchParams(window.location.search);

  const videoUUID = params.get("videoUUID");
    console.log(videoUUID)
  if(videoUUID){
    fetch(`/api/courses/userResults?userUUID=${userUUID}&videoUUID=${videoUUID}`)
    .then(response => response.json())
    .then(obj =>{
      console.log(obj);
      results = obj.data;
      //document.getElementById('total').innerHTML = questions.length;
      //question_left = questions.length;
      let html = '';
      results.forEach((item, i) => {
        html += `<li class="list-group-item">
            <div class="media">
                <div class="media-left">
                    <div class="text-muted-light">${i + 1}.</div>
                </div>
                <div class="media-body">${item.quizQuestion}</div>
                <div class="media-right">${!item.answeredCorrectly ? '<span class="badge badge-danger ">Wrong</span>' : '<span class="badge badge-success ">Correct</span>'}</div>
            </div>
        </li>`;
      });
    document.getElementById('results').innerHTML = html;
    });
  } else{
      console.log('jk')
      console.log(userUUID)
    fetch(`/api/courses/userQuizzes?userUUID=${userUUID}`)
    .then(response => response.json())
    .then(obj =>{
      console.log(obj);
      results = obj.data;
      //document.getElementById('total').innerHTML = questions.length;
      //question_left = questions.length;
    //   let html = '';
    //   results.forEach((item, i) => {
    //     html += `<li class="list-group-item">
    //         <div class="media">
    //             <div class="media-left">
    //                 <div class="text-muted-light">${i + 1}.</div>
    //             </div>
    //             <div class="media-body">${item.quizQuestion}</div>
    //             <div class="media-right">${!item.answeredCorrectly ? '<span class="badge badge-danger ">Wrong</span>' : '<span class="badge badge-success ">Correct</span>'}</div>
    //         </div>
    //     </li>`;
      });
  }



}
// score

getQuizResults();


/*

  <h4 id="quizzes" class="card-title">Questions</h4>

  */

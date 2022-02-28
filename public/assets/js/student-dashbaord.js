/*
let quizElements = `
<li class="list-group-item">
    <div class="media align-items-center">
        <div class="media-body">
            <a class="text-body"
               href="student-quiz-results.html"><strong>How to Detect Phishing</strong></a><br>
            <div class="d-flex align-items-center">
                <small class="text-black-50 text-uppercase mr-2">Course</small>
                <a href="student-take-course.html">Security Awareness Program</a>
            </div>
        </div>
        <div class="media-right text-center d-flex align-items-center">
            <span class="text-black-50 mr-3">Good</span>
            <h4 class="mb-0">5.8</h4>
        </div>
    </div>
</li>

<li class="list-group-item">
    <div class="media align-items-center">
        <div class="media-body">
            <a class="text-body"
               href="student-quiz-results.html"><strong>Weak & Strong Passwords</strong></a><br>
            <div class="d-flex align-items-center">
                <small class="text-black-50 text-uppercase mr-2">Course</small>
                <a href="student-take-course.html">Security Awareness Program</a>
            </div>
        </div>
        <div class="media-right text-center d-flex align-items-center">
            <span class="text-black-50 mr-3">Great</span>
            <h4 class="mb-0 text-success">9.8</h4>
        </div>
    </div>
</li>

<li class="list-group-item">
    <div class="media align-items-center">
        <div class="media-body">
            <a class="text-body"
               href="student-quiz-results.html"><strong>Outlook Foundamentals</strong></a><br>
            <div class="d-flex align-items-center">
                <small class="text-black-50 text-uppercase mr-2">Course</small>
                <a href="student-take-course.html">MS Office 365</a>
            </div>
        </div>
        <div class="media-right text-center d-flex align-items-center">
            <span class="text-black-50 mr-3">Failed</span>
            <h4 class="mb-0 text-danger">2.8</h4>
        </div>
    </div>
</li>`; */
/*
let rewardsElements = `<div class="btn btn-success btn-circle"><i style="font-size:25px" class="material-icons">verified_user</i></div>
  <div class="btn btn-primary btn-circle"><i style="font-size:25px" style="font-size:25px" class="material-icons">lock_open</i></div>
  <div class="btn btn-warning btn-circle"><i style="font-size:25px" class="material-icons">badge</i></div>
  <div class="btn btn-danger btn-circle"><i style="font-size:25px" class="material-icons">vpn_lock </i></div>`;
let activityElements = `<li class="list-group-item forum-thread">
        <div class="media align-items-center">
            <div class="media-left">
                <div class="forum-icon-wrapper">
                    <a href="student-forum-thread.html"
                       class="forum-thread-icon">
                        <i class="material-icons">description</i>
                    </a>
                </div>
            </div>
            <div class="media-body">
                <div class="d-flex align-items-center">
                    <a href="student-profile.html"
                       class="text-body">
                       You viewed the video:
                       <br /> <strong>Malware</strong></a>
                    <small class="ml-auto text-muted">5 min ago</small>
                </div>
            </div>
        </div>
    </li>

    <li class="list-group-item forum-thread">
        <div class="media align-items-center">
            <div class="media-left">
                <div class="forum-icon-wrapper">
                    <a href="student-forum-thread.html"
                       class="forum-thread-icon">
                        <i class="material-icons">description</i>
                    </a>
                </div>
            </div>
            <div class="media-body">
                <div class="d-flex align-items-center">
                    <a href="student-profile.html"
                       class="text-body">
                       You've passed the quiz:
                       <br /> <strong>Password Strategy</strong></a>
                    <small class="ml-auto text-muted">3 days ago</small>
                </div>
            </div>
        </div>
    </li>`;

function getCourses(){
  let url = '/api/courses/getcourses';
  let myCourseElements = "";
  fetch(url)
  .then(response => response.json())
  .then(obj =>{
    let data = obj.data;
    console.log(data[0]);
    data.forEach(ele =>{
      let courseName = ele.courseName;
      let courseUUID = ele.courseUUID;
      let coursePicture = ele.coursePicture;
      let percentageComplete = ele.percentageComplete;

      myCourseElements += `<li class="list-group-item"
            style="z-index: initial;">
            <div class="d-flex align-items-center">
                <a href="/student-take-course"
                   class="avatar avatar-4by3 avatar-sm mr-3"
                   style="font-size:35px; text-align:center; color:#000;">
                   ${coursePicture}
                </a>
                <div class="flex">
                    <a href="/student-take-course"
                       class="text-body"><strong>${courseName}</strong></a>
                    <div class="d-flex align-items-center">
                        <div class="progress"
                             style="width: 100px;">
                            <div class="progress-bar bg-primary"
                                 role="progressbar"
                                 style="width: ${percentageComplete}%"
                                 aria-valuenow="25"
                                 aria-valuemin="0"
                                 aria-valuemax="100"></div>
                        </div>
                        <small class="text-muted ml-2">${percentageComplete}%</small>
                    </div>
                </div>
                <div class="dropdown ml-3">
                    <a href="#"
                       class="dropdown-toggle text-muted"
                       data-caret="false"
                       data-toggle="dropdown">
                        <i class="material-icons">more_vert</i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item"
                           href="./">Continue</a>
                    </div>
                </div>
            </div>
        </li>`;
    })
      document.getElementById('my-courses-card').innerHTML = myCourseElements;
  })
}
getCourses();



document.getElementById('quizzes-card').innerHTML = quizElements;

*/

var coursesCard = document.getElementById('my-courses-card');

var quizzesCard = document.getElementById('quizzes-card');
var quizTemplate = document.getElementById('quiz-template').innerHTML;

var activityCard = document.getElementById('activity-card');
var activityTemplate = document.getElementById('activity-template').innerHTML;

var rewardsCard = document.getElementById('rewards-card');

rewardsCard.innerHTML = '<strong>No Rewards yet!</strong>';



fetch('/api/dashboard?uuid=' + localStorage.getItem('UUID'))
.then(function(resp) {
    resp.json().then(function(data) {
        console.log(data)
        if (data.courses && data.courses.length > 0) {
            coursesCard.innerHTML = '<li><a href="/student-take-course"><strong>' + data.courses[0].courseName + '</strong></a></li>';
        } else {
            document.getElementById('no-courses').innerHTML = '<strong>No Courses yet!</strong>';
        }


        if (data.activity && data.activity.length > 0) {
            var activitiesHTML = '';
            data.activity.forEach(function(act) {
                var at = activityTemplate;
                var idx = act.message.indexOf(':');
                var m = act.message.substring(0, idx);
                var t = act.message.substring(idx + 1);
                at = at.replace('{{data}}', m + ': <br /> <strong>' + t + '</strong></a>');
                at = at.replace('{{time}}', moment(act.dateCreated).fromNow());
                activitiesHTML += at;
            });

            activityCard.innerHTML = activitiesHTML;
        } else {
            document.getElementById('no-activity').innerHTML = '<strong>No Activity yet!</strong>';
        }

        if(data.quizzes && data.quizzes.length > 0) {
            var quizHTML = '';
            data.quizzes.forEach(function(q) {
                var answers = JSON.parse(q.answers);
                console.log(answers);
                var qt = quizTemplate;
                qt = qt.replace('{{quizURL}}', '/student-quiz-results?hllo=jk');
                qt = qt.replace('{{courseURL}}', '/student-take-course?course=courseID');
                qt = qt.replace('{{quiz}}', q.quizName);
                qt = qt.replace('{{course}}', q.courseName);
                qt = qt.replace('{{result}}', answers.results);
                qt = qt.replace('{{total}}', answers.completed);
                qt = qt.replace('{{total_style}}',
                    answers.completed > 6 ? 'green' :
                    (answers.completed > 3 && answers.completed < 7) ? 'red' : 'black');

                quizHTML += qt;
            });
           // quizzesCard.innerHTML = quizHTML;
        }
    });
});




var courseListTemplate = document.getElementById('course-list-template').innerHTML;
var courseList = document.getElementById('courseList');

getCourses();

function getCourses(){
    let UUID = localStorage.getItem('UUID');
    if(UUID){
        fetch(`/api/courses?uuid=${UUID}`)
        .then(function(resp) {
            resp.json().then(function(data) {
                console.log(data)
                var courses = data.courses;
                
                console.log(courses);
                if (courses && courses.length > 1) {
                    var activeCourses = courses.find(function(c) { return c.isActive === 1 });
                    //var activeCourses = courses.find(function(c) { return c.videoUUID === 'b77fda68-bd4a-11eb-96ba-9e2f13ced4ba' });
                    
                    console.log('akkj', activeCourses);
                    var hasActiveCourse = (activeCourses != undefined);
                    console.log('hasactivecourse', hasActiveCourse);
                    var courseListHTML = '';
                    var makeOthersInactive = false;
        
    
                    if(hasActiveCourse){
                        let videoUUID = activeCourses.videoUUID;
                        localStorage.setItem('videoUUID', videoUUID);   
                    }
                 
                    courses.forEach(function(c, idx) {
                        console.log('idx...', hasActiveCourse, idx, c);
                        var t = courseListTemplate;
                        
                        if (hasActiveCourse && c.isActive) {
                            t = t.replace('{{class}}', 'active');
                            t = t.replace('{{active}}', 'active-text');
                            t = t.replace('{{active}}', 'active-text');
                            t = t.replace('{{active}}', 'active-text');
                            document.getElementById("course-video").setAttribute("src", c.videoLink);
                            document.getElementById("course-video-name").innerHTML = c.videoName;
                            document.getElementById("course-video-description").innerHTML = c.videoDescription;
        
                            makeOthersInactive = true;
    
                        } else if ((!hasActiveCourse) && idx === 0 && c.dateCompleted == '') {
                            t = t.replace('{{class}}', 'active');
                            t = t.replace('{{active}}', 'active-text');
                            t = t.replace('{{active}}', 'active-text');
                            t = t.replace('{{active}}', 'active-text');
                            document.getElementById("course-video").setAttribute("src", c.videoLink);
                            document.getElementById("course-video-name").innerHTML = c.videoName;
                            document.getElementById("course-video-description").innerHTML = c.videoDescription;
                            
                            makeOthersInactive = true;
    
                            let videoUUID = c.videoUUID;
                            localStorage.setItem('videoUUID', videoUUID);   
    
                        } else if (c.dateCompleted !== '') {
                            t = t.replace('{{active}}', 'completed-text');
                            t = t.replace('{{active}}', 'completed-text');
                            t = t.replace('{{active}}', 'completed-text');
        
                        } else if (makeOthersInactive && !c.isActive) {
                            t = t.replace('{{active}}', 'inactive-text');
                            t = t.replace('{{active}}', 'inactive-text');
                            t = t.replace('{{active}}', 'inactive-text');
                            t = t.replace('href="#"', '');
                            
                        }
                        t = t.replace('{{number}}', (idx + 1));
                        t = t.replace('{{title}}', c.videoName);
                        t = t.replace('{{time}}', c.videoTime);
                        
                        courseListHTML += t;
                    });
        
                    courseList.innerHTML = courseListHTML;
                }
            });
        });
    }else{
        document.getElementById("course-video").setAttribute("src", "");
        document.getElementById("course-video-description").innerHTML = "There was an error loading your course"; 
    }
   
}


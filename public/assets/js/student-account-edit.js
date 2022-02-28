document.getElementById('btnSave').addEventListener("click", function(){
  // this doens't make any sense 
  //  data.then((d) => saveData(d));
  saveData();
});

// Example POST method implementation:
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
// dont use use fetch

// async function getData(url='') {
//     return fetch(url).then(res => {
//         return res.json().then(post => {
//             return post;
//         })
//     }).then(j => {
//         return result = j.data[0]
//     });
// }

getData();

// you acctuall need to check to see if the UUID exists before you do this let's make a function 
// stop using var 
function getData(){
    let userUUID = localStorage.getItem("UUID");
    if(userUUID){
         
        fetch(`/api/auth/users?userUUID=${userUUID}`)
        .then(d => {
             document.getElementById("firstname").value = d.firstName;
             document.getElementById("lastname").value = d.lastName;
             document.getElementById("email").value = d.emailAddress;
         })
    }  
}


function validateEmail(mail) {
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
    return (true)
  }

    return (false)
}

// doesn't make sense function saveData(obj) {
    function saveData(){
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let emailAddress = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('password2').value;

    let error = document.getElementById('error');

    let obj = {firstName, lastName, emailAddress};

    // I'm going to rewrite this code for you

    /*
    if (firstName && lastName && emailAddress) {
            // this doesn't make sense 
        if (validateEmail(emailAddress)) {
            obj["firstName"] = firstName;
            obj["lastName"] = lastName;
            obj["emailAddress"] = emailAddress;
        } else {
            error.classList.remove('hidden');
            error.innerHTML = "Invalid Email Address.";
            return false;
        }
    } else {
        error.classList.remove('hidden');
        error.innerHTML = "First name, last name, and email address are required.";
        return false;
    }

    if (password && confirmPassword) {
        if (password === confirmPassword) {
            postData("/api/auth/update-password", obj);
        } else {
            error.classList.remove('hidden');
            error.innerHTML = "Passwords must match.";
            return false;
        }
    } else if (password) {
        error.classList.remove('hidden');
        error.innerHTML = "Please confirm your password.";
        return false;
    }
    // doesn't make sense
    // you need to send the password to the server
    delete obj.password;
    postData('/api/auth/update-user', obj);
} */



if (firstName && lastName && emailAddress) {
    // this doesn't make sense 
    if (!validateEmail(emailAddress)) {
        error.classList.remove('hidden');
        error.innerHTML = "Invalid Email Address.";
        return false;
    } 
}else {
    error.classList.remove('hidden');
    error.innerHTML = "First name, last name, and email address are required.";
    return false;
}


// check to make sure the passwords are not empty 
if (password != '' && confirmPassword != '') {
    if (password !== confirmPassword) {
        // don't do this
        //postData("/api/auth/update-password", obj);
//    } else {
        error.classList.remove('hidden');
        error.innerHTML = "Passwords must match.";
        return false;
    }
    obj.password = password;
} 

/*else if (password) {
error.classList.remove('hidden');
error.innerHTML = "Please confirm your password.";
return false;
}*/
// doesn't make sense
// you need to send the password to the server
//delete obj.password;

// when you update the user update the password if it's in the object
    postData('/api/auth/update-user', obj);
} 
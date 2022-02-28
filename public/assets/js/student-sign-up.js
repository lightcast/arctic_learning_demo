document.getElementById('btnSubmit').addEventListener("click", function(){
    submitForm();
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


function validateEmail(mail) 
{
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
return (true)
}

return (false)
}
function submitForm(){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let emailAddress = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let companyCode = document.getElementById('companyCode').value;

    let error = document.getElementById('error');

    if(!firstName && !lastName && !emailAddress){
        error.classList.remove('hidden');
        error.innerHTML = "All fields are required";
        return false;
    }


     if( password == '' || confirmPassword == ''){
        error.classList.remove('hidden');
        error.innerHTML = "Password fields cannot be empty";
        return false;
     }


    if(!validateEmail(emailAddress)){
        error.classList.remove('hidden');
        error.innerHTML = "Email address is not valid";
        return false;
    }
        

    if(password != confirmPassword){
        error.classList.remove('hidden');
        error.innerHTML = "Password and Confirm password must match";
        return false;
    }


    if(companyCode == ''){
        error.classList.remove('hidden');
        error.innerHTML = "Company code is required.";
        return false;
    }


    if(companyCode.toLowerCase() != 'imhc'){
        error.classList.remove('hidden');
        error.innerHTML = "Company code is not valid.";
        return false; 
    }


    let obj = {firstName, lastName, emailAddress, password, companyCode};
    console.log(obj);
    postData('/api/auth/register', obj)
        .then(obj => {
            if(obj.success){
                console.log(obj);
                let data = obj.data;
                localStorage.setItem('token', data.token);
                localStorage.setItem('UUID', data.UUID);
                window.location.href = "/student-dashboard";
            }
            error.innerHTML = "There was an error trying to submit your data";
        });
}
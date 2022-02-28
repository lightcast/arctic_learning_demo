document.getElementById('btnLogin').addEventListener('click', function(){
    login();
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


function login(){
    let emailAddress = document.getElementById('emailAddress').value;
    let password = document.getElementById('password').value;

    let error = document.getElementById('error');


    if(emailAddress == ''){
        error.innerHTML = "Email address is required";
        error.classList.remove('hidden');
        return false;
    }

    if(!validateEmail(emailAddress)){
        error.innerHTML = "Email address is invalid";
        error.classList.remove('hidden');
        return false;
    }

    if(password == ''){
        error.innerHTML = "Passwod is required";
        error.classList.remove('hidden');
        return false;
    }
    let obj = {emailAddress, password};


    postData('/api/auth/login', obj)
    .then(obj => {
        console.log(obj);
       // return false;
        if(!obj.success){
        error.innerHTML = obj.data;
        error.classList.remove('hidden');
            return false;
        }else{
            localStorage.setItem('token', obj.data.token);
            localStorage.setItem('UUID', obj.data.UUID);            
            window.location.href = '/student-dashboard';
        }      
    })
}

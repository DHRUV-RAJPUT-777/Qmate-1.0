const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


// signup

function saveuserdetails(e) {

    e.preventDefault();

    const username = document.forms["Signupform"]["name"].value;
    const email = document.forms["Signupform"]["email"].value;
    const password = document.forms["Signupform"]["password"].value;

    if (username.length == 0) {
        alert("Name cannot be empty");
        return;
    }
    if (email.length == 0) {
        alert("E-mail address cannot be empty");
        return;
    }
    if (password.length < 5) {
        alert("Password length cannot be less than 5 characters");
        return;
    }

    const userinfoobj = {
        "username": username,
        "email": email,
        "password": password,
        "registeredusers": {}
    };

    let userinfo = JSON.parse(localStorage.getItem("userinformation"));

    if (userinfo == null) {
        let userinformation = [];
        userinformation.push(userinfoobj);
        localStorage.setItem("userinformation", JSON.stringify(userinformation));
        addnewuser(email);
        alert("Account created successfully");
        setuseractive(email);
    }
    else {
        // check if user already exists

        var emailexists = false;
        for (let i = 0; i < userinfo.length; i++) {
            if (email == userinfo[i].email) {
                alert("Email already exists");
                emailexists = true;
                break;
            }
        }
        if (emailexists == false) {
            userinfo.push(userinfoobj);
            localStorage.setItem("userinformation", JSON.stringify(userinfo));
            addnewuser(email);
            alert("Account created successfully");
            setuseractive(email);
        }
    }
}

function addnewuser(email) {
    let userobj = {};
    localStorage.setItem(email, JSON.stringify(userobj));
}

function checkuserdetails(e) {

    e.preventDefault();

    const email = document.forms["Signinform"]["email"].value;
    const password = document.forms["Signinform"]["password"].value;

    let userinfo = JSON.parse(localStorage.getItem("userinformation"));

    if (email == null) {
        alert("E-mail address cannot be empty");
    }

    if (userinfo == null) {
        alert("Invalid email address");
        return;
    }

    var userexists = false;
    for (let i = 0; i < userinfo.length; i++) {

        // check if email exists then only check for password
        if (userinfo[i].email == email) {
            userexists = true;

            if (userinfo[i].password == password) {
                setuseractive(email);
            }
            else {
                alert("Wrong Password");
            }
        }
    }
    if (userexists == false) {
        alert("Invalid e-mail address");
    }
}

function setuseractive(email) {
    sessionStorage.setItem("active_email", email);
    location.href = "host.html";
}


// test



// gets email of current user from session storage 
const active_email = sessionStorage.getItem("active_email");

// ------------------------------------generating quizlist-----------------------

// to get all Quiz Names
let userdata = JSON.parse(localStorage.getItem(active_email));
let storedquiznames = Object.keys(userdata);

if (storedquiznames.length == 0) {
    // do nothing :)
} else {
    for (let i = 0; i < storedquiznames.length; i++) {

        let createdquizlist = document.createElement('li');
        createdquizlist.className = "createdquiz";
        createdquizlist.innerHTML = '<p class="quizname" onclick="ShowQuiz()">' + storedquiznames[i] + '</p> <div class="buttondiv"> <button class="editquizbtn" onclick="gotoeditquiz()">Edit</button> <button class="deletequizbtn" onclick="deletequiz()">Delete</button> </div>';

        // inserting list
        let ul = document.querySelector('ul.quizlist');
        ul.appendChild(createdquizlist);
    }
}

toggleactive();

// --------------------------------------functions------------------------------

// on pressing Tutorial button
function gototutorials() {
    window.open("tutorials.html");
}


// Logout
function LogoutUser() {

    let userlogout = confirm("Do you want to Logout?"); // to confirm from user

    if (userlogout == true) {
        location.href = "homepage.html";        //jump to homepage
        sessionStorage.clear("active_email");   //clears email from session storage
        alert("Logged out Sucessfully");        //gives confirmation message to user
    }
    else {
        // nothing
    }
}

// checks the necessary conditions for creating a Quiz
function checkquizname(e) {
    e.preventDefault();

    const newquizname = document.forms["newquizform"]["newquizname"].value; // gets quizname entered in form

    if (newquizname.length == 0) {
        alert("Name cannot be empty"); // if name is empty return
        return;
    } else if (newquizname.length > 16) {
        alert("Maximum Name length permitted : 16 characters"); // set max name length = 16
        return;
    } else {

        let userdata = JSON.parse(localStorage.getItem(active_email)); // get data of active user

        // check if name exists in storage

        if (userdata.length == 0) {  //if 0 quizzes are present then name will definately not exist..add name directly
            savequizname(newquizname); // at bottom
        } else {

            // if quizzes are present check if quiz with sam name exists
            let storedquiznames = Object.keys(userdata); // gets all the quiznames

            if (storedquiznames.length == 5) {
                alert("Maximum Quizzes Allowed : 5"); //sets no of quiz that can be created
                return;
            } else {
                for (let i = 0; i < storedquiznames.length; i++) { //compares all key names to entered name
                    if (newquizname == storedquiznames[i]) {
                        alert("Quiz Name already exists");    //if name exists return and alert user
                        return;
                    }
                }
                savequizname(newquizname); //if name does not matches any previous name....set new quiz with new given name 
            }
        }
    }
}


// saves quizname in storage
function savequizname(newquizname) {

    let userdata = JSON.parse(localStorage.getItem(active_email)); //retrieves the user data

    userdata[newquizname] = {      // add new object of given type
        "QuizTime" : 0,
        "QuestionStorage": [],
        "AnswerStorage": {}
    };

    localStorage.setItem(active_email, JSON.stringify(userdata));  //store the data back again in email
    sessionStorage.setItem("Quiz_to_be_set", newquizname);

    setTimeout(() => {
        location.href = "makequiz.html";
    }, 700);
}


// showquiz-------------------------------------------------------------------

function ShowQuiz() {

    toggleactive();
    setTimeout(() => {
        gotoShowQuiz();
    }, 500);
}

function gotoShowQuiz() {
    let createdquizlistpara = document.querySelectorAll("p.quizname");
    var quizname_tobeshown;

    for (let i = 0; i < createdquizlistpara.length; i++) {
        if (createdquizlistpara[i].classList.contains("activepara")) {
            quizname_tobeshown = createdquizlistpara[i].innerHTML;
        }
    }
    sessionStorage.setItem("Quiz_to_be_Shown", quizname_tobeshown);
    setTimeout(() => {
        location.href = "showquiz.html";
    }, 500);
}


//go to Edit Quiz
function gotoeditquiz() {

    toggleactive();
    let proceed = confirm("Do you want to Edit the Existing Quiz?");

    if (proceed == false) {
        return;
    } else {
        setTimeout(() => {
            editquiz();
        }, 500);
    }
}

function editquiz() {

    let createdquizlistpara = document.querySelectorAll("p.quizname");
    var quizname_tobeedited;

    for (let i = 0; i < createdquizlistpara.length; i++) {
        if (createdquizlistpara[i].classList.contains("activepara")) {
            quizname_tobeedited = createdquizlistpara[i].innerHTML;
        }
    }
    sessionStorage.setItem("Quiz_to_be_set", quizname_tobeedited);
    setTimeout(() => {
        location.href = "makequiz.html";
    }, 500);
}



function deletequiz() {

    toggleactive();
    let confirmdeletion = confirm("Deleted Quiz cannot be restored. Continue?");
    if (confirmdeletion == false) {
        return;
    } else {
        setTimeout(() => {
            deletequizfromstorage();
        }, 500);
    }
}

function deletequizfromstorage() {
    let createdquizlistpara = document.querySelectorAll("p.quizname");
    var quizname_tobedeleted;
    for (let i = 0; i < createdquizlistpara.length; i++) {
        if (createdquizlistpara[i].classList.contains("activepara")) {
            quizname_tobedeleted = createdquizlistpara[i].innerHTML;
        }
    }
    let userdata = JSON.parse(localStorage.getItem(active_email));
    delete userdata[quizname_tobedeleted];
    localStorage.setItem(active_email, JSON.stringify(userdata));
    location.reload();
}

function toggleactive() {
    let createdquizlist = document.querySelectorAll("li.createdquiz");
    let createdquizlistpara = document.querySelectorAll("p.quizname");

    for (let i = 0; i < createdquizlist.length; i++) {
        createdquizlist[i].onclick = function () {
            for (let j = 0; j < createdquizlist.length; j++){
                if (createdquizlist[j].classList.contains("activeli")) {
                    createdquizlist[j].classList.remove("activeli");
                    createdquizlistpara[j].classList.remove("activepara");
                }
            }
            createdquizlist[i].classList.add("activeli");
            createdquizlistpara[i].classList.add("activepara");
        }
    }
}

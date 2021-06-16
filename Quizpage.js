
// 

let currentuserinfo = JSON.parse(sessionStorage.getItem("userinfo"));

let hostemail = currentuserinfo["hostemail"];
let username = currentuserinfo["username"];
let userdivision = currentuserinfo["userdivision"];
let quizname = currentuserinfo["quiznametostart"];
let useranswers = currentuserinfo["useranswers"];
let useremail = currentuserinfo["useremail"];

let hostdata = JSON.parse(localStorage.getItem(hostemail));
let Questionobjects = hostdata[quizname]["QuestionStorage"];
let quiztime = hostdata[quizname]["QuizTime"];

useranswers.length = Questionobjects.length;

// -----------------------------------------nav---------------------------------------------------------

// welcometext

let welcometext = document.getElementById("welcometext");
welcometext.innerHTML = 'Welcome ' + username;

// time

let countdown = document.getElementById("timeleft");

function updatecountdown() {
    let timeinseconds = sessionStorage.getItem("QuizTime");
    let minutes = Math.floor(timeinseconds / 60);
    let seconds = timeinseconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    countdown.innerHTML = 'Time left : ' + minutes + ' : ' + seconds;
    timeinseconds--;

    sessionStorage.setItem("QuizTime", timeinseconds);
    if (timeinseconds <= 0) {
        autoSubmitQuiz();
    }
}

setInterval(() => {
    updatecountdown();
}, 1000);

//--------------------------------------------------form--------------------------------------------------

function SaveAnswer() {

    let userselectedanswerli = document.querySelector("li.activeoption");
    if (userselectedanswerli == null) {
        alert("Please Select a valid option");
        return;
    }
    let userselectedanswer = userselectedanswerli.innerHTML
    let Questionid = document.querySelector("button.activeselectedoption").id;

    let answerobject = {
        "id": Questionid,
        "selectedanswer": userselectedanswer
    };

    let index = Questionid - 1;
    useranswers.splice(index, 1, answerobject);
    currentuserinfo["useranswers"] = useranswers;
    sessionStorage.setItem("userinfo", JSON.stringify(currentuserinfo));
    setcolorgreen();
    gotonextquestion();

}

function checkifoptionwassaved() {

    let activeobjectid = document.querySelector("button.activeselectedoption").id;
    let optionscontainer = document.querySelectorAll("li.options");
    let selectedanswerobj = useranswers[activeobjectid - 1];
    if (selectedanswerobj == null) {
        return;
    }

    let selectedanswer = selectedanswerobj["selectedanswer"];

    for (let i = 0; i < optionscontainer.length; i++) {
        if (selectedanswer == optionscontainer[i].innerHTML) {
            optionscontainer[i].classList.add("activeoption");
        }
    }
    setcolorgreen();
}

function gotonextquestion() {
    let activeobjectid = document.querySelector("button.activeselectedoption").id;
    let intactiveobjectid = parseInt(activeobjectid);
    let newid = intactiveobjectid + 1;
    if (newid > Questionobjects.length) {
        newid = 1;
    }
    let newquestiontobesetactive = document.getElementById(newid);
    let olderoption = document.getElementById(activeobjectid);
    olderoption.classList.remove("activeselectedoption");
    newquestiontobesetactive.classList.add("activeselectedoption");
    showquestion();
}


function ResetAnswer() {
    let activeobjectid = document.querySelector("button.activeselectedoption").id;
    let selectedanswerobj = useranswers[activeobjectid - 1];

    if (selectedanswerobj == null) {
        let optioncontainer = document.querySelectorAll("li.options");
        for (let i = 0; i < optioncontainer.length; i++) {
            optioncontainer[i].classList.remove("activeoption");
        }
        return;
    }
    selectedanswerobj = null;
    let index = activeobjectid - 1;
    useranswers.splice(index, 1, selectedanswerobj);
    currentuserinfo["useranswers"] = useranswers;
    sessionStorage.setItem("userinfo", JSON.stringify(currentuserinfo));
    removecolorgreen();
    showquestion();
}



function setcolorgreen() {
    let boxtobecoloured = document.querySelector("button.activeselectedoption");
    boxtobecoloured.classList.add("savedoptions");
}

function removecolorgreen() {
    let boxtobecoloured = document.querySelector("button.activeselectedoption");
    boxtobecoloured.classList.remove("savedoptions");
}

// ------------------------------------------------right-------------------------------------------------

// create box equal to no of questions

for (let i = 0; i < Questionobjects.length; i++) {
    let QuestionNo = Questionobjects[i]["id"];

    if (i == 0) {
        let createdquestionbtn = document.createElement('button');
        createdquestionbtn.className = "selectoptions activeselectedoption";
        createdquestionbtn.id = QuestionNo;

        createdquestionbtn.innerHTML = QuestionNo;
        let selectoptioncontainer = document.querySelector("div.selectoptioncontainer");
        selectoptioncontainer.appendChild(createdquestionbtn);
    } else {

        let createdquestionbtn = document.createElement('button');
        createdquestionbtn.className = "selectoptions";
        createdquestionbtn.id = QuestionNo;

        createdquestionbtn.innerHTML = QuestionNo;
        let selectoptioncontainer = document.querySelector("div.selectoptioncontainer");
        selectoptioncontainer.appendChild(createdquestionbtn);
    }
}
showquestion();

// set option active

toggleactiveselectedquestion();


function showquestion() {
    let activeobjectid = document.querySelector("button.activeselectedoption").id;

    let Question = Questionobjects[activeobjectid - 1]["Question"];
    let Option1 = Questionobjects[activeobjectid - 1]["Option1"];
    let Option2 = Questionobjects[activeobjectid - 1]["Option2"];
    let Option3 = Questionobjects[activeobjectid - 1]["Option3"];
    let Option4 = Questionobjects[activeobjectid - 1]["Option4"];

    document.getElementById("Question").innerHTML = Question;
    document.getElementById("Option1").innerHTML = Option1;
    document.getElementById("Option2").innerHTML = Option2;
    document.getElementById("Option3").innerHTML = Option3;
    document.getElementById("Option4").innerHTML = Option4;

    let optioncontainer = document.querySelectorAll("li.options");
    for (let i = 0; i < optioncontainer.length; i++) {
        optioncontainer[i].classList.remove("activeoption");
    }
    checkifoptionwassaved();
}

// -------------------------------------------------footer-----------------------------------------------

function SubmitQuiz() {

    let submitconfirmation = confirm("Do you want to submit");
    if (submitconfirmation == false) {
        return;
    }

    for (let i = 0; i < hostdata[quizname]["AnswerStorage"][userdivision].length; i++) {
        if (hostdata[quizname]["AnswerStorage"][userdivision][i]["useremail"] == useremail) {
            hostdata[quizname]["AnswerStorage"][userdivision][i]["answers"] = useranswers;
            break;
        }
    }

    localStorage.setItem(hostemail, JSON.stringify(hostdata));
    location.href = "endofquiz.html";
}

function autoSubmitQuiz() {
    for (let i = 0; i < hostdata[quizname]["AnswerStorage"][userdivision].length; i++) {
        if (hostdata[quizname]["AnswerStorage"][userdivision][i]["useremail"] == useremail) {
            hostdata[quizname]["AnswerStorage"][userdivision][i]["answers"] = useranswers;
            break;
        }
    }

    localStorage.setItem(hostemail, JSON.stringify(hostdata));
    location.href = "endofquiz.html";
}

// -------------------------------------------------------------------------------------------------------------

toggleactiveoption();

function toggleactiveoption() {

    let optioncontainer = document.querySelectorAll("li.options");
    for (let i = 0; i < optioncontainer.length; i++) {
        optioncontainer[i].onclick = function () {
            for (let j = 0; j < optioncontainer.length; j++) {
                if (optioncontainer[j].classList.contains("activeoption")) {
                    optioncontainer[j].classList.remove("activeoption");
                }
            }
            optioncontainer[i].classList.add("activeoption");
        }
    }
}

function toggleactiveselectedquestion() {
    let selectedoptioncontainer = document.querySelectorAll("button.selectoptions");
    for (let i = 0; i < selectedoptioncontainer.length; i++) {
        selectedoptioncontainer[i].onclick = function () {
            for (let j = 0; j < selectedoptioncontainer.length; j++) {
                if (selectedoptioncontainer[j].classList.contains("activeselectedoption")) {
                    selectedoptioncontainer[j].classList.remove("activeselectedoption");
                }
            }
            selectedoptioncontainer[i].classList.add("activeselectedoption");
            showquestion();
        }
    }
}

// Detect change in tab

document.addEventListener("visibilitychange", event => {
    if (document.visibilityState == "visible") {
        // console.log("tab is activate")
    } else {
        // alert("Tab change detected");
    }
})

// 

const active_email = sessionStorage.getItem("active_email");

const QuizName = sessionStorage.getItem("Quiz_to_be_set");

toggleactiveoption();

// 

// display All Existing Questions
{
    let userdata = JSON.parse(localStorage.getItem(active_email));
    let NoofQuestions = userdata[QuizName]["QuestionStorage"].length;

    if (NoofQuestions == 0) {
        // do nothing
    } else {

        for (let i = 0; i < NoofQuestions; i++) {
            let QuestionNo = userdata[QuizName]["QuestionStorage"][i]["id"];

            let createdquizquestion = document.createElement('li');
            createdquizquestion.className = "createdquestionli";
            // createdquizquestion.setAttribute("onclick","showquestion()");
            createdquizquestion.id = QuestionNo;

            createdquizquestion.innerHTML = '<p class="liQuestion" onclick="showquestion()">' + "Question.No : " + QuestionNo + '</p><button class="deletebtn" onclick="deletequestion()">Delete</button>'
            let ul = document.querySelector("ul.questionlist");
            ul.appendChild(createdquizquestion);
        }
    }
}

toggleactiveQuestionli();

// save Questions

function savequestion(e) {

    e.preventDefault();

    let Question = document.forms["setQuestion"]["EnteredQuestion"].value;

    if (Question == "") {
        alert("Question Cannot be Empty");
        return;
    }
    let Option1 = document.forms["setQuestion"]["option1"].value;
    let Option2 = document.forms["setQuestion"]["option2"].value;
    let Option3 = document.forms["setQuestion"]["option3"].value;
    let Option4 = document.forms["setQuestion"]["option4"].value;

    let optioncontainer = document.querySelectorAll("input.options");
    let containsactiveoption = false;

    for (let i = 0; i < optioncontainer.length; i++) {
        if (optioncontainer[i].classList.contains("activeoption")) {
            containsactiveoption = true;
            break;
        }
    }
    if (containsactiveoption == false) {
        alert("Please select Correct Option");
        return;
    }

    let correctanswer = document.querySelector("input.activeoption").value;

    let QuestionObject = {
        "id": "0",
        "Question": Question,
        "Option1": Option1,
        "Option2": Option2,
        "Option3": Option3,
        "Option4": Option4,
        "CorrectAnswer": correctanswer
    }

    toggleactiveQuestionli();

    let anyselectedli = false;

    let QuestionliContainer = document.querySelectorAll("li.createdquestionli");
    for (let i = 0; i < QuestionliContainer.length; i++) {
        if (QuestionliContainer[i].classList.contains("activeQuestionli")) {
            anyselectedli = true;
        }
    }

    if (anyselectedli == true) {

        let li_id = document.querySelector("li.activeQuestionli").id;
        let objposn = li_id - 1;
        let userdata = JSON.parse(localStorage.getItem(active_email));
        userdata[QuizName]["QuestionStorage"].splice(objposn, 1, QuestionObject);
        let indexofquestionobject = userdata[QuizName]["QuestionStorage"].indexOf(QuestionObject);
        userdata[QuizName]["QuestionStorage"][indexofquestionobject]["id"] = indexofquestionobject + 1;
        localStorage.setItem(active_email, JSON.stringify(userdata));
        location.reload();
    }
    else {

        let userdata = JSON.parse(localStorage.getItem(active_email));
        userdata[QuizName]["QuestionStorage"].push(QuestionObject);
        let indexofquestionobject = userdata[QuizName]["QuestionStorage"].indexOf(QuestionObject);
        userdata[QuizName]["QuestionStorage"][indexofquestionobject]["id"] = indexofquestionobject + 1;
        localStorage.setItem(active_email, JSON.stringify(userdata));
        location.reload();
    }

}


function showquestion() {
    toggleactiveQuestionli();
    setTimeout(() => {
        showsaveddataofquestion();
    }, 200);
}


function showsaveddataofquestion() {

    let activeobjectid = document.querySelector("li.activeQuestionli").id;
    let userdata = JSON.parse(localStorage.getItem(active_email));

    let Question = userdata[QuizName]["QuestionStorage"][activeobjectid - 1]["Question"];
    let Option1 = userdata[QuizName]["QuestionStorage"][activeobjectid - 1]["Option1"];
    let Option2 = userdata[QuizName]["QuestionStorage"][activeobjectid - 1]["Option2"];
    let Option3 = userdata[QuizName]["QuestionStorage"][activeobjectid - 1]["Option3"];
    let Option4 = userdata[QuizName]["QuestionStorage"][activeobjectid - 1]["Option4"];
    let correctanswer = userdata[QuizName]["QuestionStorage"][activeobjectid - 1]["CorrectAnswer"];

    document.getElementsByName("EnteredQuestion")[0].value = Question;
    document.getElementsByName("option1")[0].value = Option1;
    document.getElementsByName("option2")[0].value = Option2;
    document.getElementsByName("option3")[0].value = Option3;
    document.getElementsByName("option4")[0].value = Option4;

    document.getElementsByName("DisplayCorrectOption")[0].style.display = "inline-block";
    document.getElementsByName("DisplayCorrectOption")[0].innerHTML = correctanswer;
}


// toggle active option

function toggleactiveoption() {

    let optioncontainer = document.querySelectorAll("input.options");
    let optiontickcontainer = document.querySelectorAll("div.optiontick");

    for (let i = 0; i < optiontickcontainer.length; i++) {
        optiontickcontainer[i].onclick = function () {
            for (let j = 0; j < optiontickcontainer.length; j++) {
                if (optiontickcontainer[j].classList.contains("activeoptiontick")) {
                    optiontickcontainer[j].classList.remove("activeoptiontick");
                    optioncontainer[j].classList.remove("activeoption");
                }
            }
            optiontickcontainer[i].classList.add("activeoptiontick");
            optioncontainer[i].classList.add("activeoption");
        }
    }
}

function toggleactiveQuestionli() {

    let QuestionliContainer = document.querySelectorAll("li.createdquestionli");

    for (let i = 0; i < QuestionliContainer.length; i++) {
        QuestionliContainer[i].onclick = function () {
            for (let j = 0; j < QuestionliContainer.length; j++) {
                if (QuestionliContainer[j].classList.contains("activeQuestionli")) {
                    QuestionliContainer[j].classList.remove("activeQuestionli");
                }
            }
            QuestionliContainer[i].classList.add("activeQuestionli");
        }
    }
}

function toggleactivedelete() {
    let QuestionliContainer = document.querySelectorAll("li.createdquestionli");
    let deletebtnContainer = document.querySelectorAll("button.deletebtn");

    for (let i = 0; i < deletebtnContainer.length; i++) {
        deletebtnContainer[i].onclick = function () {
            for (let j = 0; j < QuestionliContainer.length; j++) {
                if (QuestionliContainer[j].classList.contains("activeQuestionli")) {
                    QuestionliContainer[j].classList.remove("activeQuestionli");
                }
            }
            QuestionliContainer[i].classList.add("activeQuestionli");
        }
    }
}

function deletequestion() {

    toggleactivedelete();

    setTimeout(() => {

        let activeid = document.querySelector("li.activeQuestionli").id;
        let Questionobj_tobedeleted = activeid - 1;
        let userdata = JSON.parse(localStorage.getItem(active_email));
        userdata[QuizName]["QuestionStorage"].splice(Questionobj_tobedeleted, 1);

        setTimeout(() => {

            let QuestionStorageArray = userdata[QuizName]["QuestionStorage"];

            for (let i = 0; i < QuestionStorageArray.length; i++) {
                QuestionStorageArray[i]["id"] = i + 1;
            }
            userdata[QuizName]["QuestionStorage"] = QuestionStorageArray;

            localStorage.setItem(active_email, JSON.stringify(userdata));

        }, 200);

        setTimeout(() => {
            location.reload();
        }, 400);

    }, 300);

}


function ResetQuestion() {
    toggleactiveQuestionli();

    setTimeout(() => {
        let activeli = document.querySelector("li.activeQuestionli");

        if (activeli === null) {
            location.reload();
            return;
        }
        let activeid = document.querySelector("li.activeQuestionli").id;
        let Questionobj_tobe_reset = activeid - 1;
        let userdata = JSON.parse(localStorage.getItem(active_email));
        let questiondata = userdata[QuizName]["QuestionStorage"][Questionobj_tobe_reset];

        questiondata["Question"] = "";
        questiondata["Option1"] = "";
        questiondata["Option2"] = "";
        questiondata["Option3"] = "";
        questiondata["Option4"] = "";
        questiondata["CorrectAnswer"] = "";

        userdata[QuizName]["QuestionStorage"][Questionobj_tobe_reset] = questiondata;
        localStorage.setItem(active_email, JSON.stringify(userdata));
        location.reload();
    }, 200);

}

function SetQuizTime() {
    let enteredQuizTime = prompt("Enter Quiz Duration (In minutes)");

    if (enteredQuizTime == null) {
        return;
    }
    else if (enteredQuizTime == "") {
        alert("Time Cannot be empty");
        return;
    }
    else {

        let userdata = JSON.parse(localStorage.getItem(active_email));
        userdata[QuizName]["QuizTime"] = enteredQuizTime;
        localStorage.setItem(active_email, JSON.stringify(userdata));
    }
}

function ResetQuiz() {
    let userconfirm = confirm("Do you want to reset your Quiz?");
    if (userconfirm == false) {
        return;
    }
    let userdata = JSON.parse(localStorage.getItem(active_email));
    userdata[QuizName]["QuestionStorage"] = [];
    localStorage.setItem(active_email, JSON.stringify(userdata));
    location.reload();
}

function SaveQuiz() {

    let userdata = JSON.parse(localStorage.getItem(active_email));
    let quiztime = userdata[QuizName]["QuizTime"];
    if(quiztime == 0){
        alert("Quiz duration cannot be empty");
        return;
    }
    setTimeout(() => {
        alert("Quiz Saved Succesfully");
        location.href = "host.html";
    }, 300);
}


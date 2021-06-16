
//

const active_email = sessionStorage.getItem("active_email");

const QuizName = sessionStorage.getItem("Quiz_to_be_Shown");

//

// display All Existing Questions
{
    let userdata = JSON.parse(localStorage.getItem(active_email));
    let NoofQuestions = userdata[QuizName]["QuestionStorage"].length;

    if (NoofQuestions == 0) {
        // do nothing
    } else {

        for (let i = 0; i < NoofQuestions; i++) {

            if (i == 0) {
                let QuestionNo = userdata[QuizName]["QuestionStorage"][i]["id"];
                let createdquizquestion = document.createElement('li');
                createdquizquestion.className = "createdquestionli activeQuestionli";
                createdquizquestion.id = QuestionNo;
                createdquizquestion.innerHTML = '<p class="liQuestion">' + "Question.No : " + QuestionNo
                let ul = document.querySelector("ul.questionlist");
                ul.appendChild(createdquizquestion);
            } else {
                let QuestionNo = userdata[QuizName]["QuestionStorage"][i]["id"];
                let createdquizquestion = document.createElement('li');
                createdquizquestion.className = "createdquestionli";
                createdquizquestion.id = QuestionNo;
                createdquizquestion.innerHTML = '<p class="liQuestion">' + "Question.No : " + QuestionNo
                let ul = document.querySelector("ul.questionlist");
                ul.appendChild(createdquizquestion);
            }
        }
    }
}
showquestion();
toggleactiveQuestionli();

function showquestion() {
    showsaveddataofquestion();
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

    document.getElementById("Question").innerHTML = Question;
    document.getElementById("Option1").innerHTML = Option1;
    document.getElementById("Option2").innerHTML = Option2;
    document.getElementById("Option3").innerHTML = Option3;
    document.getElementById("Option4").innerHTML = Option4;
    document.getElementById("CorrectAnswer").innerHTML = correctanswer;
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
            showquestion();
        }
    }
}































































































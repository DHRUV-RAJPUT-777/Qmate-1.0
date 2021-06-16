
let activeEmail = sessionStorage.getItem("active_email");
let hostdata = JSON.parse(localStorage.getItem(activeEmail));

let currentQuizName = showQuizNames();
let currentDivisionName = showDivisions(currentQuizName);
let currentResultType = setResultType();

function showQuizNames() {
    let allQuizNames = Object.keys(hostdata);
    let selectQuizName = document.getElementById("selectname");
    for (let i = 0; i < allQuizNames.length; i++) {
        if (i == 0) {
            let option = document.createElement("option");
            option.text = allQuizNames[i];
            option.setAttribute('selected', true);
            selectQuizName.add(option);
        } else {
            let option = document.createElement("option");
            option.text = allQuizNames[i];
            selectQuizName.add(option);
        }
    }
    return selectQuizName.options[selectQuizName.selectedIndex].text;
}

function showDivisions(newQuizName) {
    let allDivisions = Object.keys(hostdata[newQuizName]["AnswerStorage"]);
    let selectDivisionName = document.getElementById("selectdivision");
    // remove previous divisions
    for (let i = 0; i <= selectDivisionName.length; i++) {
        selectDivisionName.remove(selectDivisionName[i]);
    }

    if (allDivisions.length == 0) {
        return null;
    }

    // Add divisions
    for (let i = 0; i < allDivisions.length; i++) {
        if (i == 0) {
            let option = document.createElement("option");
            option.text = allDivisions[i];
            option.setAttribute('selected', true);
            selectDivisionName.add(option);
        } else {
            let option = document.createElement("option");
            option.text = allDivisions[i];
            selectDivisionName.add(option);
        }
    }
    return selectDivisionName.options[selectDivisionName.selectedIndex].text;
}

function setResultType() {
    let dropdown = document.getElementById("selectresulttype");
    let ResultType = dropdown.options[dropdown.selectedIndex].text;
    return ResultType;
}

function ChangeQuizName() {
    let dropdown = document.getElementById("selectname");
    let newQuizName = dropdown.options[dropdown.selectedIndex].text;
    currentQuizName = newQuizName
    currentDivisionName = showDivisions(newQuizName);
}

function ChangeDivision() {
    let dropdown = document.getElementById("selectdivision");
    let currentDivision = dropdown.options[dropdown.selectedIndex].text;
    currentDivisionName = currentDivision;
}

function ChangeResultType() {
    let dropdown = document.getElementById("selectresulttype");
    let ResultType = dropdown.options[dropdown.selectedIndex].text;
    currentResultType = ResultType;
}

function ShowResult() {

    if (currentResultType == "Graph") {
        showGraphicalResult();
        return;
    }

    let graphmainbody = document.querySelector("div.graphmainbody");
    graphmainbody.style.display = "none";

    removePreviousResult();
    let tabularmainbody = document.querySelector("div.tabularmainbody");
    tabularmainbody.style.display = "flex";
    let username;
    let usermail;
    let answerarray;
    let score;

    let answerObjArray = hostdata[currentQuizName]["AnswerStorage"][currentDivisionName];
    for (let i = 0; i < answerObjArray.length; i++) {

        username = answerObjArray[i]["username"];
        usermail = answerObjArray[i]["useremail"];
        answerarray = checkAnswer(i);
        score = findScore(answerarray);
        let totalScore = answerarray.length;

        let individualstudentdiv = document.createElement("div");
        individualstudentdiv.className = "individualstudentdiv";
        individualstudentdiv.innerHTML = '<div class="studentdetailsdiv"><p class="studentname">' + username + '</p><p class="studentemail">' + usermail + '</p></div><div class="studentscorediv"><p class="studentscore">' + score + '/' + totalScore + '</p></div><div class="useranswersdiv" id="' + i + '"></div>'

        let mainbody = document.querySelector("div.tabularmainbody");
        mainbody.appendChild(individualstudentdiv);
        generatescorediv(answerarray, i);
    }
}

function removePreviousResult() {
    let individualstudentdivcontainer = document.querySelectorAll("div.individualstudentdiv");
    for (let i = 0; i < individualstudentdivcontainer.length; i++) {
        individualstudentdivcontainer[i].remove();
    }
}

function findScore(answerarray) {
    let score = 0;
    for (let i = 0; i < answerarray.length; i++) {
        if (answerarray[i] == -1 || answerarray[i] == 0) {
            continue;
        }
        else score++;
    }
    return score;
}

function checkAnswer(i) {

    let checkAnswerArray = [];
    let QuestionArray = hostdata[currentQuizName]["QuestionStorage"];
    let AnswerArray = hostdata[currentQuizName]["AnswerStorage"][currentDivisionName][i]["answers"];

    for (let j = 0; j < QuestionArray.length; j++) {
        if (AnswerArray[j] == null) {
            checkAnswerArray[j] = -1;
        } else if (QuestionArray[j]["CorrectAnswer"] == AnswerArray[j]["selectedanswer"]) {
            checkAnswerArray[j] = 1;
        } else {
            checkAnswerArray[j] = 0;
        }
    }
    return checkAnswerArray;
}

function generatescorediv(answerarray, j) {

    for (let i = 0; i < answerarray.length; i++) {
        let scorebox = document.createElement("div");
        scorebox.className = "answer";
        if (answerarray[i] == 0) {
            scorebox.classList.add("wronganswer");
        } else if (answerarray[i] == 1) {
            scorebox.classList.add("rightanswer");
        } else {
            scorebox.classList.add("noanswer");
        }
        scorebox.innerHTML = i + 1;
        let useranswersdiv = document.getElementById(j);
        useranswersdiv.appendChild(scorebox);
    }
}

function showGraphicalResult() {

    let useranswersdiv = document.querySelectorAll("div.useranswersdiv");
    for(let i=0;i<useranswersdiv.length;i++){
        useranswersdiv[i].remove();
    }
    let tabularmainbody = document.querySelector("div.tabularmainbody");
    tabularmainbody.style.display = "none";
    removePreviousGraphResult();

    let graphmainbody = document.querySelector("div.graphmainbody");
    graphmainbody.style.display = "flex";

    let username;
    let usermail;
    let answerarray;
    let score;

    let answerObjArray = hostdata[currentQuizName]["AnswerStorage"][currentDivisionName];
    for (let i = 0; i < answerObjArray.length; i++) {
        
        username = answerObjArray[i]["username"];
        usermail = answerObjArray[i]["useremail"];
        answerarray = checkAnswer(i);
        score = findScore(answerarray);
        let totalScore = answerarray.length;

        let individualstudentgraph = document.createElement("div");
        individualstudentgraph.className = "individualstudentgraph";

        individualstudentgraph.innerHTML =  '<div class="graphscorediv"><p class="graphscore">' + score + '/' + totalScore + '</p></div><div class="middiv"><div class="mid-middiv"><div class="scorebar" id="'+i+'"></div></div></div><div class="graphstudentdetails"><div class="graphstudentname">'+username+'</div><div class="graphstudentemail">'+usermail+'</div></div>';

        if(i == 0){
            individualstudentgraph.style.borderLeft = "thin solid rgba(0, 0, 0, 0.4)";
        }
        // if(i == answerObjArray.length-1){
        //     individualstudentgraph.style.borderRight = "thin solid rgba(0, 0, 0, 0.4)";
        // }
        let mainbody = document.querySelector("div.graphmainbody");
        mainbody.appendChild(individualstudentgraph);

        generateGraph(score,totalScore,i);
    }
}

function removePreviousGraphResult() {
    let individualstudentgraphcontainer = document.querySelectorAll("div.individualstudentgraph");
    for(let i=0;i<individualstudentgraphcontainer.length;i++){
        individualstudentgraphcontainer[i].remove();
    }
}

function generateGraph(score,totalScore,j){
    let scorebar = document.getElementById(j);
    let scorebarHeight = Math.floor((score*100)/totalScore);
    if(scorebarHeight >= 75){
        scorebar.classList.add("greenscorebar");
    }else if(scorebarHeight < 75 && scorebarHeight >= 50){
        scorebar.classList.add("yellowscorebar");
    }else if(scorebarHeight < 50 && scorebarHeight >= 35){
        scorebar.classList.add("tomatoscorebar");
    }else if(scorebarHeight < 35){
        scorebar.classList.add("redscorebar");
    }
    scorebar.style.height = scorebarHeight+"%";
    let scorebarDiv = document.querySelectorAll("div.mid-middiv");
    scorebarDiv[j].appendChild(scorebar);
}








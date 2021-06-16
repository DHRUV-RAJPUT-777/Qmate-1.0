// 

// 
function saveuserdata(e) {

    e.preventDefault();

    let username = document.forms["joinform"]["username"].value;
    let useremail = document.forms["joinform"]["useremail"].value;
    let userdivision = document.forms["joinform"]["userdivision"].value;
    let hostemail = document.forms["joinform"]["hostemail"].value;
    let quiznametostart = document.forms["joinform"]["quiznametostart"].value;

    if (username == "") {
        alert("Username cannot be Empty");
        return;
    } else if (useremail == "") {
        alert("User email cannot be Empty");
        return;
    } else if (hostemail == "") {
        alert("Host email cannot be Empty");
        return;
    } else if (quiznametostart == "") {
        alert("Quiz Name cannot be Empty");
        return;
    }
    let hostexists = false;
    let quiznameexists = false;
    let userdivisionexists = false;
    let userexists = false;
    let userinformation = JSON.parse(localStorage.getItem("userinformation"));

    for (let i = 0; i < userinformation.length; i++) {
        if (userinformation[i]["email"] == hostemail) {
            hostexists = true;
            let divisionname = Object.keys(userinformation[i]["registeredusers"]);
            for (let j = 0; j < divisionname.length; j++) {
                if (divisionname[j] == userdivision) {
                    userdivisionexists = true;
                    let name = divisionname[j];
                    for (let k = 0; k < userinformation[i]["registeredusers"][name].length; k++) {
                        if (userinformation[i]["registeredusers"][name][k]["email"] == useremail && userinformation[i]["registeredusers"][name][k]["name"] == username) {
                            userexists = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    setTimeout(() => {
        if (hostexists == false) {
            alert("Invalid Host email");
            return;
        } else if (userdivisionexists == false) {
            alert("Invalid Division");
            return;
        } else if (userexists == false) {
            alert("Invalid User");
            return;
        } else {

            let hostdata = JSON.parse(localStorage.getItem(hostemail));
            let hostdatakeys = Object.keys(hostdata);
            for (let i = 0; i < hostdatakeys.length; i++) {
                if (hostdatakeys[i] == quiznametostart) {
                    quiznameexists = true;
                    break;
                }
            }
            if (quiznameexists == false) {
                alert("Quiz does not Exist");
                return;
            }
            else {
                let userinfo = {
                    "username": username,
                    "useremail": useremail,
                    "userdivision": userdivision,
                    "hostemail": hostemail,
                    "quiznametostart": quiznametostart,
                    "useranswers": []
                };
                sessionStorage.setItem("userinfo", JSON.stringify(userinfo));

                setTimeout(() => {

                    // check if user has already attempted quiz
                    let userattempt = false;
                    let divnameexists = false;
                    let divname = Object.keys(hostdata[quiznametostart]["AnswerStorage"])
                    for (let i = 0; i < divname.length; i++) {
                        if (divname[i] == userdivision) {
                            divnameexists = true;
                            let userdivname = divname[i];

                            for (let j = 0; j < hostdata[quiznametostart]["AnswerStorage"][userdivname].length; j++) {
                                if (hostdata[quiznametostart]["AnswerStorage"][userdivname][j]["useremail"] == useremail) {
                                    userattempt = true;
                                    break;
                                }
                            }
                        }
                    }
                    if(divnameexists == false){
                        hostdata[quiznametostart]["AnswerStorage"][userdivision] = [];
                        localStorage.setItem(hostemail,JSON.stringify(hostdata));
                    }
                    if (userattempt == true) {
                        alert("You have already Attempted the Quiz");
                        return;
                    }
                    //   "quizattempted": "false",
                    let answerobject = {
                        "username": username,
                        "useremail": useremail,
                        "answers": []
                    };

                    let quiztime = hostdata[quiznametostart]["QuizTime"];
                    timeinseconds = quiztime*60;

                    sessionStorage.setItem("QuizTime",timeinseconds);
                    hostdata[quiznametostart]["AnswerStorage"][userdivision].push(answerobject);
                    localStorage.setItem(hostemail, JSON.stringify(hostdata));
                    location.href = "Quizpage.html";
                }, 300);
            }
        }
    }, 200);
}

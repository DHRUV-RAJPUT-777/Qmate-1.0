
// 
let active_email = sessionStorage.getItem("active_email");
let userdata = JSON.parse(localStorage.getItem("userinformation"));
var registered_user_obj;
var active_user_data;

for (let i = 0; i < userdata.length; i++) {
    if (userdata[i]["email"] == active_email) {
        active_user_data = userdata[i];
        registered_user_obj = userdata[i]["registeredusers"];
        break;
    }
}

// display division names divisions

{
    let divisionNames = Object.keys(registered_user_obj);

    for (let i = 0; i < divisionNames.length; i++) {
        if (i == 0) {
            let createddivisionli = document.createElement("li");
            createddivisionli.className = "createddivisionli activeli";
            createddivisionli.id = divisionNames[i];
            createddivisionli.innerHTML = '<p class="divisions">' + divisionNames[i] + '</p><button class="deletebtn" onclick="deletedivision()">Delete</button>'
            let ul = document.querySelector("ul.divisionlist");
            ul.appendChild(createddivisionli);
        }
        else {
            let createddivisionli = document.createElement("li");
            createddivisionli.className = "createddivisionli";
            createddivisionli.id = divisionNames[i];
            createddivisionli.innerHTML = '<p class="divisions">' + divisionNames[i] + '</p><button class="deletebtn" onclick="deletedivision()">Delete</button>'
            let ul = document.querySelector("ul.divisionlist");
            ul.appendChild(createddivisionli);
        }
    }
    showdetailsofdivision();
    toggleactivedivisionli();
}
// 





// nav--------------------------------------------------------------------------------------------------------

function AddDivision() {
    let newDivisionName = prompt("Enter Division Name");
    if (newDivisionName == "") {
        alert("Division Name cannot be empty");
        return;
    }

    // check if division name already exists
    let divisionNames = Object.keys(registered_user_obj);
    for (let i = 0; i < divisionNames.length; i++) {
        if (divisionNames[i] == newDivisionName) {
            alert("Division Name already Exists");
            return;
        }
    }
    registered_user_obj[newDivisionName] = [];
    active_user_data["registeredusers"] = registered_user_obj;
    localStorage.setItem("userinformation", JSON.stringify(userdata));
    location.reload();
}


// body-------------------------------------------------------------------------------------------------------

// left==========================================================================================



function showdetailsofdivision() {

    // remove all existing elements first

    let userinfolicontainer = document.querySelectorAll("li.userinfoli");
    for (let i = 0; i < userinfolicontainer.length; i++) {
        userinfolicontainer[i].remove()
    }

    let activedivision = document.querySelector("li.activeli");
    if(activedivision == null){
        return;
    }
    let divname = activedivision.id;
    let username;
    let useremail;
    for (let i = 0; i < registered_user_obj[divname].length; i++) {
        username = registered_user_obj[divname][i]["name"];
        useremail = registered_user_obj[divname][i]["email"];
        let userinfoli = document.createElement("li");
        userinfoli.className = "userinfoli";
        userinfoli.id = useremail;
        userinfoli.innerHTML = '<p class="lifield1">' + username + '</p><p class="lifield2">' + useremail + '<p><button class="removeuser" onclick="removeuserdetails()">Remove</button>';

        let ul = document.querySelector("ul.storeduserdetails");
        ul.appendChild(userinfoli);
    }
}

function deletedivision() {
    toggleactivedivisionli();
    setTimeout(() => {
        let useranswer = confirm("Do you want to delete this divison?");
        if (useranswer == false) {
            return;
        }
        let divname = document.querySelector("li.activeli").id;
        delete registered_user_obj[divname];
        active_user_data["registeredusers"] = registered_user_obj;
        localStorage.setItem("userinformation", JSON.stringify(userdata));
        location.reload();
    }, 300);
}


// right========================================================================================

function addparticipants(e) {
    e.preventDefault();

    let newParticipantName = document.forms["participantdetails"]["participantname"].value;
    let newParticipantEmail = document.forms["participantdetails"]["participantemail"].value;
    if (newParticipantName == "") {
        alert("Name Cannot be empty");
        return;
    } else if (newParticipantEmail == "") {
        alert("Email cannot be empty");
        return;
    }
    let activedivisionname = document.querySelector("li.activeli");
    if(activedivisionname == null){
        alert("Please add a division");
        return;
    }
    let divisionname = activedivisionname.id;

    // check if user already exists
    let existinguseraccounts = registered_user_obj[divisionname];
    for (let i = 0; i < existinguseraccounts.length; i++) {
        if (existinguseraccounts[i]["email"] == newParticipantEmail) {
            alert("User already Exists!");
            return;
        }
    }

    let newParticipantobj = {
        "name": newParticipantName,
        "email": newParticipantEmail
    };
    registered_user_obj[divisionname].push(newParticipantobj);
    active_user_data["registeredusers"] = registered_user_obj;
    localStorage.setItem("userinformation", JSON.stringify(userdata));
    showdetailsofdivision();
}

function removeuserdetails() {
    toggleactive_userinfoli();
    setTimeout(() => {
        let useridtobedeleted = document.querySelector("li.activeuserinfoli").id;
        let divisionname = document.querySelector("li.activeli").id;
        let existinguseraccounts = registered_user_obj[divisionname];
        for (let i = 0; i < existinguseraccounts.length; i++) {
            if (existinguseraccounts[i]["email"] == useridtobedeleted) {
                existinguseraccounts.splice(i, 1);
                break;
            }
        }
        active_user_data["registeredusers"] = registered_user_obj;
        localStorage.setItem("userinformation", JSON.stringify(userdata));
        showdetailsofdivision(); 
    }, 200);
}

// footer=========================================================================================================

function SaveDetails(){
    location.href = "host.html";
}





// ============================================================

function toggleactivedivisionli() {

    let divisionliContainer = document.querySelectorAll("li.createddivisionli");
    for (let i = 0; i < divisionliContainer.length; i++) {
        divisionliContainer[i].onclick = function () {
            for (let j = 0; j < divisionliContainer.length; j++) {
                if (divisionliContainer[j].classList.contains("activeli")) {
                    divisionliContainer[j].classList.remove("activeli");
                }
            }
            divisionliContainer[i].classList.add("activeli");
            showdetailsofdivision();
        }
    }
}

function toggleactive_userinfoli() {
    let userinfolicontainer = document.querySelectorAll("li.userinfoli");
    for (let i = 0; i < userinfolicontainer.length; i++) {
        userinfolicontainer[i].onclick = function () {
            for (let j = 0; j < userinfolicontainer.length; j++) {
                if (userinfolicontainer[j].classList.contains("activeuserinfoli")) {
                    userinfolicontainer[j].classList.remove("activeuserinfoli");
                }
            }
            userinfolicontainer[i].classList.add("activeuserinfoli");
        }
    }
}






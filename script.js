function mouseEnter(element){
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    element.style.height = height + 10 + "px";
    element.style.width = width + 10 + "px";
}

function mouseLeave(element){
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    element.style.height = height - 10 + "px";
    element.style.width = width - 10 + "px";
}

function validateFields(){
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var usernameElement = document.getElementById("username");

    var emailMessage = document.getElementById("emailMessage");
    var phoneMessage = document.getElementById("phoneMessage");

    emailElement.classList.remove("fieldError");
    phoneElement.classList.remove("fieldError");
    usernameElement.classList.remove("fieldError");

    emailMessage.className="hidden";
    phoneMessage.className="hidden";

    var email = emailElement.value;
    var phone = phoneElement.value;
    var username = usernameElement.value;

    var showError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

    if(!emailRegex.test(email)){
        document.getElementById("emailMessage").className="validationMessage";
    }

    if(!phoneNumberRegex.test(phone)){
        document.getElementById("phoneMessage").className="validationMessage";
    }
    
    
    if(!email){
        emailElement.classList.add("fieldError");
        showError = true;
    }
    if(!phone){
        phoneElement.classList.add("fieldError");
        showError = true;
    }
    if(!username){
        usernameElement.classList.add("fieldError");
        showError = true;
    }

    if (showError==true) {
        showErrorMessage();
    } else {
        window.location.href='progress.html?name=' + username + "&email=" + email + "&phone=" + phone;
    }
}

function showErrorMessage () {
    document.getElementById("errorMessage").className="errorMessage";
}

const shapes = [
    {id: 1, value: "circle", color: "red"},
    {id: 2, value: "rectangle", color: "blue"},
    {id: 3, value: "square", color: "pink"},
    {id: 4, value: "star", color: "green"}
];

var correctAnswers = [];
var activeId;

function next(){
    if (!activeId){
        activeId = 1;
    }
    var currentElement = document.getElementById(activeId.toString());
    currentElement.classList.remove("active");
    compute(currentElement);

    activeId += 1;
    document.getElementById(activeId.toString()).classList.add("active");
    loadButtons();
    computeProgress();
}

function compute(element) {
    var shape = shapes.find(s => s.id === activeId);
    var selectedShape = element.querySelector("#shape").value;
    var selectedColor = element.querySelector("#color").value;

    if (selectedShape.toLowerCase() === shape.value.toLowerCase() && selectedColor.toLowerCase() === shape.color.toLowerCase()){
        correctAnswers.push(activeId);
    }
}

function prev(){
    var currentElement = document.getElementById(activeId.toString());
    currentElement.classList.remove("active");

    var index = correctAnswers.indexOf(activeId);
    correctAnswers.splice(index, 1);

    activeId -= 1;
    document.getElementById(activeId.toString()).classList.add("active");
    loadButtons();
    computeProgress();
}

function finish(){
    var currentElement = document.getElementById(activeId.toString());
    compute(currentElement);
    document.getElementById("prev").classList.remove("active-inline");
    document.getElementById("next").classList.remove("active-inline");
    document.getElementById("complete").classList.remove("active-inline");

    document.getElementById("prev").classList.add("inactive");
    document.getElementById("next").classList.add("inactive");
    document.getElementById("complete").classList.add("inactive");

    document.getElementById("progressBar").value = 100;
    document.getElementById("progressValue").innerHTML = "100%";
    document.getElementById("resultButton").classList.remove("inactive");
}

function loadButtons(){
    document.getElementById("prev").classList.remove("active-inline", "inactive");
    document.getElementById("next").classList.remove("active-inline", "inactive");
    document.getElementById("complete").classList.remove("active-inline", "inactive");
    if (!activeId || activeId === 1){
        document.getElementById("prev").classList.add("inactive");
        document.getElementById("next").classList.add("active-inline");
        document.getElementById("complete").classList.add("inactive");
    } else if (activeId > 1 && activeId < 4) {
        document.getElementById("prev").classList.add("active-inline");
        document.getElementById("next").classList.add("active-inline");
        document.getElementById("complete").classList.add("inactive");
    } else if (activeId == 4){
        document.getElementById("prev").classList.add("active-inline");
        document.getElementById("next").classList.add("inactive");
        document.getElementById("complete").classList.add("active-inline");
    }

}

function computeProgress(){
    var progress = 0;
    if (activeId > 0){
        progress = ((activeId - 1) / 4) * 100;
    }
    document.getElementById("progressBar").value = progress;
    document.getElementById("progressValue").innerHTML = progress + "%";
}

function viewResult(){
    var correctPercentage = 0;
    if (correctAnswers && correctAnswers.length > 0){
        correctPercentage = (correctAnswers.length / 4) * 100;
    }
    window.location.href='result.html?score=' + correctAnswers.length + "&percentage=" + correctPercentage;
}
const BtnText = localStorage.getItem("Btn");

const inputDiv = document.querySelector(".inpID");
const submitBtn = document.querySelector(".submitBtn");

// set placeholder and text
if(BtnText == "search" || BtnText == "create") {
   inputDiv.placeholder = "Enter your ID";
   submitBtn.textContent = "Submit";
}

// show warning if ID is wrong
function showWarning() {
    const warnMsg = document.querySelector(".wrongMsg");
    warnMsg.style.display = "block";
    setTimeout(() => {
    warnMsg.style.display = "none";
    location.reload();
}, 2500)
}

// submit the ID
submitBtn.addEventListener("click", () => {
    if(inputDiv.value == "") {
        showWarning()
    } else {

    if(BtnText == "newID") {
        checkIDAndCreateNew();
    } else if(BtnText == "create" || BtnText == "search") {
        checkID();
    } 
  }
});

var arrOfNewID = JSON.parse(localStorage.getItem("arrOfNewID")) || [];

// checks if the ID already exists and if not then add new ID
function checkIDAndCreateNew() {
    let checkIndx = arrOfNewID.includes(inputDiv.value);
    console.log(checkIndx);
    if(checkIndx == 0) {
        arrOfNewID.push(inputDiv.value);
        arrOfNewID = localStorage.setItem("arrOfNewID", JSON.stringify(arrOfNewID));
        localStorage.setItem("userID", inputDiv.value);
        submitBtn.setAttribute("href", "THREE.html");
    } else {
        alert("ID already Exists, Create new ID");
        inputDiv.value = "";
    }
}

// checks ID
function checkID() {
    let checkIndx = arrOfNewID.includes(inputDiv.value);
    console.log(checkIndx);
    if(checkIndx == 1) {
       submitBtn.setAttribute("href", "THREE.html");
       localStorage.setItem("userID", inputDiv.value);
    } else {
        showWarning();
    }
}
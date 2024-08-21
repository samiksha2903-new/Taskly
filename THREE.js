const BtnText = localStorage.getItem("Btn");
const userID = localStorage.getItem("userID");

const addBtn = document.querySelector(".addBtn");
const taskDiv = document.querySelector(".taskDiv");
const fieldGroup = document.querySelector(".fieldGroup");
const task = document.querySelector(".task");
const inputDiv = document.querySelector(".taskInp");

let ArrOfDate = [];
const date = new Date();
let day = String(date.getDate()).padStart(2, 0);
let month = String(date.getMonth() + 1).padStart(2, 0);
let year = String(date.getFullYear());
ArrOfDate.push(day, month, year);
const textDate = ArrOfDate.join("-");

document.querySelector(".Date").textContent = textDate;

document.querySelector(".userId span").textContent = userID;

 // select onlyone CheckBox at a time.
//used event delegation for higher level i.e the highest parent element.

// CREATE NEW TODO...............
function addElements(block, text) {
  const newtask = document.createElement("div");
  newtask.classList.add("task");
  const newtextarea = document.createElement("textarea");
  newtextarea.classList.add("taskInp");
  const newfieldset = document.createElement("fieldset");
  newfieldset.classList.add("fieldGroup");
  for (let i = 1; i <= 3; i++) {
    let newInp = document.createElement("input");
    let newLabel = document.createElement("label");

    if (i === 1) {
      newInp.value = "complete";
      newLabel.textContent = "Complete";
    } else if (i === 2) {
      newInp.value = "pending";
      newLabel.textContent = "Pending";
    } else {
      newInp.value = "incomplete";
      newLabel.textContent = "Incomplete";
    }

    newInp.classList.add("radio");
    newLabel.classList.add("mr");
    newtextarea.placeholder = "Enter task";
    newInp.type = "checkbox";

    newfieldset.append(newInp);
    newfieldset.append(newLabel);
  }
  newfieldset.style.display = `${block}`;
  text !== undefined ? (newtextarea.textContent = `${text}`) : newtextarea;
  taskDiv.append(newtask);
  newtask.append(newtextarea);
  newtask.append(newfieldset);
}

var arrOfTasks = JSON.parse(localStorage.getItem("arrOfTasks")) || [];

// save user records.
function saveUserRecord() {
  const allTasks = document.querySelectorAll(".taskInp");

  let taskArr = [];
  let existingEntry = arrOfTasks.find((entry) => entry.user_id == userID);

  if (existingEntry) {
    taskArr = existingEntry.tasks; // Use the existing tasks if they exist
  }

  // add the new tasks into the existing tasks... and the input we give should not be null or empty.
  allTasks.forEach((task) => {
    task.task !== "" || task.task !== null
      ? taskArr.push({ task: task.value.trim(), progress: null })
      : alert("Please enter valid task ✍️");
  });

  let newEntry = {
    user_id: userID,
    date: textDate,
    tasks: taskArr,
  };
  // takes all the tasks
  if (existingEntry) {
    existingEntry.tasks = taskArr;
  } else {
    arrOfTasks.push(newEntry);
  }

  localStorage.setItem("arrOfTasks", JSON.stringify(arrOfTasks));
}

if (BtnText == "create" || BtnText == "newID") {
  document.querySelector(".saveBtn").addEventListener("click", saveUserRecord);
  addBtn.addEventListener("click", () => {
    addElements("none");
  });
}
// SEARCH TODO--------------------
else {
  getAllTasks();
}

function getAllTasks() {
  let existingEntry = arrOfTasks.find((entry) => entry.user_id === userID);

  let taskArr = [];
  if (existingEntry) {
    taskArr = existingEntry.tasks;

    // Clear the taskDiv to prevent duplicates
    // taskDiv.innerHTML = "";

    if (taskArr.length > 0) {
      inputDiv.value = taskArr[0].task;
      fieldGroup.style.display = "block";

      const firstCheckIndx = taskArr[0];
      const firstCheckBox = fieldGroup.querySelectorAll(".radio");
      firstCheckBox.forEach((cb) => {
        cb.checked = cb.value === firstCheckIndx.progress;
      });

      for (let i = 1; i < taskArr.length; i++) {
        addElements("block", taskArr[i].task);

        // taking the reference of the recent dynamic added fieldgroup when the loop iterate for that specific number like when i = 1, i =2.... so its taking the most last yet i.e most recent dynamic added element
        const newRecentAddedFieldGroup =
          document.querySelectorAll(".fieldGroup");
        const lastRecentFieldGroup =
          newRecentAddedFieldGroup[newRecentAddedFieldGroup.length - 1];
        const checkIndx = taskArr[i];
        const checkBoxField = lastRecentFieldGroup.querySelectorAll(".radio");
        checkBoxField.forEach((cb) => {
          cb.checked = cb.value === checkIndx.progress;
        });
      }
    }
  }

  taskDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("radio")) {
      const fieldGroup = e.target.closest(".fieldGroup");
      const taskTextarea =  fieldGroup.previousElementSibling.value.trim();
      const checkboxes = fieldGroup.querySelectorAll(".radio");
      const clickedCheckbox = e.target;

      checkboxes.forEach((cb) => {
        cb.checked = (cb === clickedCheckbox); // clicked only the targeted element unless checkbox property which checks all
      });

      let checkindx = existingEntry.tasks.findIndex(
        (ele) => ele.task === taskTextarea
      );

      if(checkindx > -1) {
        if(clickedCheckbox.value === "complete") {
          existingEntry.tasks.splice(checkindx, 1);

          localStorage.setItem("arrOfTasks", JSON.stringify(arrOfTasks));

          location.reload();
        } else {
          existingEntry.tasks[checkindx].progress = clickedCheckbox.value;

          localStorage.setItem("arrOfTasks", JSON.stringify(arrOfTasks));
        }
      }
    }
  });

  if(taskArr == "") {
    const body = document.querySelector(".idxWrapper_3");
    body.textContent = "No Task available";
    body.style.fontSize = "1.3rem";
    
  }
}
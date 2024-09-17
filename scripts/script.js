// variables declaration

let tasks = [];
let todoSection = document.querySelector("#todo-list");

let doneCheckBox = document.querySelector("#done-checkbox input");
let doneCheckBoxH2 = document.querySelector("#done-checkbox h2");
let addTaskBtn = document.querySelector("#open-add-modal");
let sideWorkTag = document.querySelector("#side-work-tag");
let sideStudyTag = document.querySelector("#side-study-tag");
let sideEntertainmentTag = document.querySelector("#side-entertainment-tag");
let sideFamilyTag = document.querySelector("#side-family-tag");

let modal = document.querySelector(".modal");
let addBtn = document.querySelector("#add-task1");
let CancelBtn = document.querySelector("#modal-cancel1");
let taskTitleInput = document.querySelector("#task-title1");
let taskDescriptionInput = document.querySelector("#task-description1");
let modalTags = document.querySelectorAll(".modal-tags1");

let editBtn = document.querySelector("#edit-task");
let editCancelBtn = document.querySelector("#modal-cancel2");
let editTaskTitleInput = document.querySelector("#task-title2");
let editTaskDescriptionInput = document.querySelector("#task-description2");
let editModalTags = document.querySelectorAll(".modal-tags2");

let tags = document.querySelectorAll(".buttons-filter");
let workTag = document.querySelector("#work-tag");
let studyTag = document.querySelector("#study-tag");
let entertainmentTag = document.querySelector("#entertainment-tag");
let familyTag = document.querySelector("#family-tag");

let editWorkTag = document.querySelector("#edit-work-tag");
let editStudyTag = document.querySelector("#edit-study-tag");
let editEntertainmentTag = document.querySelector("#edit-entertainment-tag");
let editFamilyTag = document.querySelector("#edit-family-tag");

let taskDoneCheckBox = document.querySelectorAll(".todo-task .task-done-checkbox input");
let taskDoneLabel = document.querySelectorAll(".todo-task .task-done-checkbox h2");
let taskTitle = document.querySelectorAll(".todo-task .title h2");
let taskDescription = document.querySelectorAll(".todo-task p");
let editMenu = document.querySelectorAll(".edit-box");

// getting local storage data

if (localStorage.getItem("tasks")) {
  let task = JSON.parse(localStorage.getItem("tasks"));
  tasks = [...task];
} else {
  tasks = [];
}

// adding task functionality
function togglePopup(number) {
  let modal = document
    .querySelector(`#popup${number}`)
    .classList.toggle("active");
}

addBtn.addEventListener("click", () => {
  if (taskTitleInput.value === "" || taskDescriptionInput.value === "") {
    alert("Please fill all fields");
    return;
  }

  let taskTags = [];
  if (workTag.classList.contains("tag-active")) {
    taskTags.push("work");
    workTag.classList.remove("tag-active");
  }

  if (studyTag.classList.contains("tag-active")) {
    taskTags.push("study");
    studyTag.classList.remove("tag-active");
  }

  if (entertainmentTag.classList.contains("tag-active")) {
    taskTags.push("entertainment");
    entertainmentTag.classList.remove("tag-active");
  }

  if (familyTag.classList.contains("tag-active")) {
    taskTags.push("family");
    familyTag.classList.remove("tag-active");
  }

  let newTask = {
    id: tasks.length + 1,
    title: taskTitleInput.value.trim(),
    description: taskDescriptionInput.value.trim(),
    tags: taskTags,
    active: "no",
    check: false,
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  togglePopup("1");
  alert("You add a new task to your todo list")
  todoSection.innerHTML = "";
  createTask(tasks);
});

CancelBtn.addEventListener("click", () => {
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  workTag.classList.remove("tag-active");
  studyTag.classList.remove("tag-active");
  entertainmentTag.classList.remove("tag-active");
  familyTag.classList.remove("tag-active");
  togglePopup("1");
});

// create Task function

function createTask(tasks) {
  tasks.forEach((element) => {
    todoSection.innerHTML += `
            <div id=".${element.id}" class="todo-task w-[550px] p-[20px] bg-[#FFF9DE] rounded-[5px] relative duration-200">
                <div class="title flex justify-between duration-200">
                    <h2 class="text-xl font-bold">${element.title}</h2>
                    <i class="fa-solid fa-ellipsis show-edit text-[#b1aea0] mt-[5px] cursor-pointer text-xl" onclick="showEditMenu(${element.id})"></i>
                </div>
                <div class="edit-box w-[150px] rounded-[10px] py-[10px] bg-white absolute z-[2] right-[10px] top-[50px] duration-200">
                    <h2 class="text-[#bdbaaf] text-lg ml-[20px] mb-[10px] cursor-pointer" onclick="editTask(${element.id})">Edit  ...</h2>
                    <hr>
                    <h2 class="text-[#bdbaaf] text-lg ml-[20px] mt-[10px] cursor-pointer" onclick="deleteTask(${element.id})">Delete</h2>
                </div>
                
                <p class="text-[#7b786b] tracking-wider text-base my-[20px]">${element.description}</p>
                
                <div class="flex justify-between">
                    <div class="tags flex">
                    ${element.tags
                      .map((tag) => {
                        switch (tag) {
                          case "work":
                            return '<div class="w-[35px] h-[35px] rounded-[17.5px] bg-[#d2ceff] mr-[5px]"></div>';
                            break;
                          case "entertainment":
                            return '<div class="w-[35px] h-[35px] rounded-[17.5px] bg-[#ffcece] mr-[5px]"></div>';
                            break;
                          case "study":
                            return '<div class="w-[35px] h-[35px] rounded-[17.5px] bg-[#d1e5f7] mr-[5px]"></div>';
                            break;
                          case "family":
                            return '<div class="w-[35px] h-[35px] rounded-[17.5px] bg-[#daf2d6] mr-[5px]"></div>';
                            break;
                        }
                      })
                      .join("")}
                    </div>
                    <div class="task-done-checkbox done-checkbox flex mt-[10px]">
                        <input type="checkbox" name="task-done" checkbox-index="${element.id - 1}" active="${element.active}" class="w-[20px] h-[20px] rounded-[7px] border-solid border-[2px] align-middle border-[#bdbaaf] duration-200" onclick="taskDone(${element.id})">
                        <h2 class="ml-[8px] mt-[-4px] text-xl duration-200">Done</h2>
                    </div>
                </div>
            </div>
        `;
  });
}

createTask(tasks);

// tags filter

modalTags.forEach((modalTag) => {
  modalTag.addEventListener("click", () => {
    modalTag.classList.toggle("tag-active");
  });
});

editModalTags.forEach((modalTag) => {
  modalTag.addEventListener("click", () => {
    modalTag.classList.toggle("tag-active");
  });
});

function sideTagFilter(tagElement) {
  let filterTasks = [];
  if (tagElement.classList.contains("tag-active")) {
    filterTasks = tasks.filter((task) =>
      task.tags.includes(tagElement.getAttribute("name"))
    );
    todoSection.innerHTML = "";
    createTask(filterTasks);
  } else {
    todoSection.innerHTML = "";
    createTask(tasks);
  }
}

function closeOtherTags(tagElement) {
  tags.forEach((tag) => {
    if (tag.classList.contains("tag-active") && tag != tagElement) {
      if (tag == doneCheckBox && doneCheckBox.checked) {
        doneCheckBox.checked = false;
      }
      tag.classList.remove("tag-active")
    }
  });
  tagElement.classList.toggle("tag-active");
}
sideWorkTag.addEventListener("click", () => {
  closeOtherTags(sideWorkTag);
  sideTagFilter(sideWorkTag);
});

sideStudyTag.addEventListener("click", () => {
  closeOtherTags(sideStudyTag,)
  sideTagFilter(sideStudyTag);
});

sideEntertainmentTag.addEventListener("click", () => {
  closeOtherTags(sideEntertainmentTag,)
  sideTagFilter(sideEntertainmentTag);
});

sideFamilyTag.addEventListener("click", () => {
  closeOtherTags(sideFamilyTag,)
  sideTagFilter(sideFamilyTag);
});

// Task Done Button functionality
function taskDone(id) {
  let input = document.querySelector(`#\\.${id} > div:nth-child(4) > div.task-done-checkbox.done-checkbox.flex.mt-\\[10px\\] > input`);
  let title = document.querySelector(`#\\.${id} > div.title.flex.justify-between.duration-200 > h2`);
  let description = document.querySelector(`#\\.${id}  > p`);
  let doneButton = document.querySelector(`#\\.${id}  > div:nth-child(4) > div.task-done-checkbox.done-checkbox.flex.mt-\\[10px\\] > h2`);
  let index = input.getAttribute("checkbox-index");
  title.classList.toggle("task-done");
  description.classList.toggle("task-done");
  doneButton.classList.toggle("color-change");
  if (input.getAttribute("active") == "no" && input.checked) {
    input.setAttribute("active", "yes");
    tasks[index].active = "yes";
  } else if (input.getAttribute("active") == "yes" && !input.checked) {
    input.setAttribute("active", "no");
    tasks[index].active = "no";
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// check if the task is done when page reloads

function checkCheckbox() {
  tasks.forEach((element) => {
    let checkbox = document.querySelector(`#\\.${element.id}  > div:nth-child(4) > div.task-done-checkbox.done-checkbox.flex.mt-\\[10px\\] > input`);
    if (checkbox.getAttribute("active") == "yes") {
      checkbox.checked = true;
      let title = document.querySelector(`#\\.${element.id}  > div.title.flex.justify-between.duration-200 > h2`);
      let description = document.querySelector(`#\\.${element.id}  > p`);
      let doneButton = document.querySelector(`#\\.${element.id}  > div:nth-child(4) > div.task-done-checkbox.done-checkbox.flex.mt-\\[10px\\] > h2`);
      title.classList.add("task-done");
      description.classList.add("task-done");
      doneButton.classList.add("color-change");
    } else {
      checkbox.checked = false;
    }
  });
}

checkCheckbox();

// Hide done tasks button functionality

doneCheckBox.addEventListener("click", () => {
  doneCheckBoxH2.classList.toggle("color-change");
  closeOtherTags(doneCheckBox);
  if (doneCheckBox.classList.contains("tag-active")) {
    doneCheckBox.checked = true;
    let checkboxes = document.querySelectorAll("div:nth-child(4) > div.task-done-checkbox.done-checkbox.flex.mt-\\[10px\\] > input");
    let filterLst = [];
    checkboxes.forEach((checkbox) => {
      filterLst = tasks.filter(task => task.active === "no")
    });
      todoSection.innerHTML = "";
      createTask(filterLst);
  } else {
    doneCheckBox.checked = false;
    todoSection.innerHTML = "";
    createTask(tasks);
    checkCheckbox();
  }
});

// Edit and delete menu
function showEditMenu(id) {
  let editMenu = document.querySelector(`#\\.${id}  > div.edit-box.w-\\[150px\\].rounded-\\[10px\\].py-\\[10px\\].bg-white.absolute.right-\\[10px\\].top-\\[50px\\].duration-200`);
  editMenu.classList.toggle("show-edit-box");
}

function editTask(id) {
  task = tasks.find((element) => element.id === id);
  index = tasks.indexOf(task);
  editTaskTitleInput.value = task.title;
  editTaskTitleInput.setAttribute("index", index);
  editTaskDescriptionInput.value = task.description;
  editModalTags.forEach((tag) => {
    if (task.tags.includes(tag.getAttribute("name"))) {
      tag.classList.add("tag-active");
    }
  });
  togglePopup("2");
}

editBtn.addEventListener("click", () => {
  if (
    editTaskTitleInput.value === "" ||
    editTaskDescriptionInput.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }
  let taskTags = [];
  if (editWorkTag.classList.contains("tag-active")) {
    taskTags.push("work");
    workTag.classList.remove("tag-active");
  }

  if (editStudyTag.classList.contains("tag-active")) {
    taskTags.push("study");
    studyTag.classList.remove("tag-active");
  }

  if (editEntertainmentTag.classList.contains("tag-active")) {
    taskTags.push("entertainment");
    entertainmentTag.classList.remove("tag-active");
  }

  if (editFamilyTag.classList.contains("tag-active")) {
    taskTags.push("family");
    familyTag.classList.remove("tag-active");
  }

  let index = editTaskTitleInput.getAttribute("index");

  let newTask = {
    id: +index + 1,
    title: editTaskTitleInput.value,
    description: editTaskDescriptionInput.value,
    tags: taskTags,
    active: "no",
    check: false,
  };

  tasks[index] = newTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  togglePopup("2");
  alert("You edit your old task to your todo list")
  todoSection.innerHTML = "";
  createTask(tasks);
});

editCancelBtn.addEventListener("click", () => {
  editTaskTitleInput.value = "";
  editTaskDescriptionInput.value = "";
  editWorkTag.classList.remove("tag-active");
  editStudyTag.classList.remove("tag-active");
  editEntertainmentTag.classList.remove("tag-active");
  editFamilyTag.classList.remove("tag-active");
  togglePopup("2");
});

function deleteTask(id) {
  task = tasks.find((element) => element.id === id);
  index = tasks.indexOf(task);
  tasks.splice(index, 1);
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].id = i + 1;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert("You delete your old task")
  todoSection.innerHTML = "";
  createTask(tasks);
}

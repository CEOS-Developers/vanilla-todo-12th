const toDoForm = document.querySelector(".toDo__form"),
  toDoInput = document.querySelector("input"),
  toDoWaitingItems = document.querySelector(".waiting__items"),
  toDoFinishedItems = document.querySelector(".finished__items"),
  toDoInputIcon = document.querySelector(".input__icon"),
  toDoItem = document.querySelectorAll("li");

const TODO_LS = "toDos";

let toDos = [];

function handleHover(event) {
  event.target.style.color = "orange";
  console.log("abc");
}

// function deleteToDo(event) {}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function printToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");

  //   delBtn.innerText = "🗑";
  //   delBtn.addEventListener("click", deleteToDo);

  span.innerText = text;
  li.appendChild(span);
  toDoWaitingItems.appendChild(li);

  const toDoObj = {
    text: text,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  printToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  toDoInputIcon.addEventListener("click", handleSubmit);
  toDoItem.forEach((li) => {
    li.addEventListener("mouseenter", handleHover);
  });
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach((toDo) => printToDo(toDo.text));
  }
}

init();

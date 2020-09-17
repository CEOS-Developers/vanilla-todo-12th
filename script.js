const toDoForm = document.querySelector(".toDo__form"),
  toDoInput = document.querySelector("input"),
  toDoWaitingItems = document.querySelector(".waiting__items"),
  toDoFinishedItems = document.querySelector(".finished__items"),
  toDoInputIcon = document.querySelector(".input__icon");

function printToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");

  span.innerText = text;
  li.appendChild(span);
  toDoWaitingItems.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  printToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  toDoInputIcon.addEventListener("click", handleSubmit);
}

init();

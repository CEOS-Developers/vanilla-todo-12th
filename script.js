const toDoForm = document.querySelector(".toDo__form"),
  toDoInput = document.querySelector("input"),
  toDoWaitingItems = document.querySelector(".waiting__items"),
  toDoFinishedItems = document.querySelector(".finished__items"),
  toDoInputIcon = document.querySelector(".input__icon");

const TODO_LS = "toDos";

//할일 목록을 담은 list
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  //li는 지워야하는 할일을 가리킨다.
  const li = btn.parentNode;

  //클릭된 할일을 삭제한다.
  toDoWaitingItems.removeChild(li);

  //toDos list에서 현재 할일을 찾아 걸러준다.
  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  //할일의 목록이 바뀌었으므로 로컬스토리지를 업데이트한다.
  saveToDos();
}

function saveToDos() {
  //toDos list를 로컬스토리지에 저장한다.
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function printToDo(text) {
  //먼저 html 요소들을 추가한다.
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;

  //삭제 버튼을 추가한다.
  delBtn.innerText = "🗑";
  //삭제 버튼 클릭시 deleteToDo 함수 호출
  delBtn.addEventListener("click", deleteToDo);

  //span에 현재 입력받은 text를 추가한다.
  span.innerText = text;

  // li 태그 안에 할 일을 추가한다.
  li.appendChild(span);
  li.appendChild(delBtn);
  // id : 할일 삭제를 위한 할일 고유 id
  li.id = newId;
  toDoWaitingItems.appendChild(li);

  //할일들을 object화 한다.
  const toDoObj = {
    text: text,
    id: newId,
  };
  //할일을 toDos list에 넣는다.
  toDos.push(toDoObj);
  //toDos list를 로컬스토리지에 저장한다.
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  //현재 입력받은 text를 화면에 출력한다.
  printToDo(currentValue);
  //입력창 reset
  toDoInput.value = "";
}

function init() {
  //이전에 저장된 todo-list를 로컬 스토리지에서 불러 온다.
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  toDoInputIcon.addEventListener("click", handleSubmit);
}

function loadToDos() {
  //이전에 저장된 todo-list를 로컬 스토리지에서 불러 온다.
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    //이전에 저장된 내용이 있을 때만
    const parseToDos = JSON.parse(loadedToDos);
    //저장된 내용을 화면에 출력한다.
    parseToDos.forEach((toDo) => printToDo(toDo.text));
  }
}

init();

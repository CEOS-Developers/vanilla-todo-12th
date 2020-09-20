const toDoForm = document.querySelector(".toDo__form"),
  toDoInput = document.querySelector("input"),
  toDoWaitingItems = document.querySelector(".waiting__items"),
  toDoFinishedItems = document.querySelector(".finished__items"),
  toDoInputIcon = document.querySelector(".input__icon"),
  waitingListCount = document.querySelector(".waiting__number"),
  finishedListCount = document.querySelector(".finished__number");

const LOCALSTORAGE_KEY = "toDos";

//할일 목록을 담은 list
let toDos = [];

//리스트 별 할일의 개수를 센다.
function updateCount() {
  waitingListCount.innerText = `(${
    toDos.filter((item) => item.status == 1).length
  })`;
  finishedListCount.innerText = `(${
    toDos.filter((item) => item.status == 2).length
  })`;
}

function moveToDo(event) {
  let target;
  //target: 할 일이 담긴 <li> 태그
  // <li> 태그를 선택하기 위함
  if (event.target.tagName == "SPAN") target = event.target.parentNode;
  if (event.target.tagName == "LI") target = event.target;
  //쓰레기통이 클릭됐을 시 무시
  if (event.target.tagName == "BUTTON") return;

  let status, targetToDo;

  //status : 1-> waiting , 2 -> finished
  //클릭된 할일이 어떤 상태인지 찾는다.
  toDos.forEach((toDo) => {
    if (toDo.id == target.id) {
      status = toDo.status;
      targetToDo = toDo;
    }
  });

  //할일의 상태에 따라 해당하는 리스트에 추가한다.
  if (status === 1) {
    targetToDo.status = 2;
    toDoFinishedItems.append(target);
  } else {
    targetToDo.status = 1;
    toDoWaitingItems.append(target);
  }

  //할일 상태 업데이트
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  //toDo는 지워야하는 할일을 가리킨다.
  const toDo = btn.parentNode;
  let status;

  //클릭된 할일이 어떤 상태인지 찾는다.
  toDos.forEach((toDo) => {
    if (toDo.id == toDo.id) {
      status = toDo.status;
    }
  });

  //클릭된 할일을 삭제한다.
  if (status === 1) toDoWaitingItems.removeChild(toDo);
  else toDoFinishedItems.removeChild(toDo);

  //toDos list에서 현재 할일을 찾아 걸러준다.
  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(toDo.id));
  toDos = cleanToDos;
  //할일의 목록이 바뀌었으므로 로컬스토리지를 업데이트한다.
  saveToDos();
}

function saveToDos() {
  //toDos list를 로컬스토리지에 저장한다.
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(toDos));
  //할일 목록의 개수를 업데이트 한다.
  updateCount();
}

function printToDo(text, status) {
  //먼저 html 요소들을 추가한다.
  const toDo = document.createElement("li");
  const toDoContent = document.createElement("span");
  const deleteButton = document.createElement("button");
  const newId = toDos.length + 1;

  //삭제 버튼을 추가한다.
  deleteButton.innerText = "🗑";
  //삭제 버튼 클릭시 deleteToDo 함수 호출
  deleteButton.addEventListener("click", deleteToDo);
  toDo.addEventListener("click", moveToDo);

  //휴지통 이모티콘이 나타나게 한다.
  toDo.addEventListener("mouseenter", () => {
    deleteButton.classList.add("showing");
  });
  //휴지통 이모티콘이 사라지게 한다.
  toDo.addEventListener("mouseleave", () => {
    deleteButton.classList.remove("showing");
  });

  //span에 현재 입력받은 text를 추가한다.
  toDoContent.innerText = text;

  // li 태그 안에 할 일을 추가한다.
  toDo.appendChild(toDoContent);
  toDo.appendChild(deleteButton);
  // id : 할일 삭제를 위한 할일 고유 id
  toDo.id = newId;

  //처음 할일이 들어왔을 때 할일을 waiting_list에 넣어준다
  if (status === 1) toDoWaitingItems.appendChild(toDo);
  else toDoFinishedItems.appendChild(toDo);

  //할일들을 object화 한다.
  const toDoObj = {
    text: text,
    id: newId,
    status: status,
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
  printToDo(currentValue, 1);
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
  const loadedToDos = localStorage.getItem(LOCALSTORAGE_KEY);
  if (loadedToDos !== null) {
    //이전에 저장된 내용이 있을 때만
    const parseToDos = JSON.parse(loadedToDos);
    //저장된 내용을 화면에 출력한다.
    parseToDos.forEach((toDo) => printToDo(toDo.text, toDo.status));
  }
}

init();

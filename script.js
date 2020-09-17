const toDoForm = document.querySelector(".toDo__form"),
  toDoInput = document.querySelector("input"),
  toDoWaitingItems = document.querySelector(".waiting__items"),
  toDoFinishedItems = document.querySelector(".finished__items"),
  toDoInputIcon = document.querySelector(".input__icon"),
  waitingListCount = document.querySelector(".waiting__number"),
  finishedListCount = document.querySelector(".finished__number");

const TODO_LS = "toDos";

//할일 목록을 담은 list
let toDos = [];

//리스트 별 할일의 개수를 센다.
function updateCount() {
  //wcnt : waitingList 할일 개수, fcnt : finishedList 할일 개수
  let wcnt = 0,
    fcnt = 0;
  //리스트를 순환하며 개수를 센다.
  toDos.forEach((toDo) => {
    if (toDo.opt == 1) {
      wcnt++;
    } else {
      fcnt++;
    }
  });
  //개수를 웹페이지에 나타내기
  waitingListCount.innerText = `(${wcnt})`;
  finishedListCount.innerText = `(${fcnt})`;
}

function moveToDo(event) {
  let target;
  //target: 할 일이 담긴 <li> 태그
  // <li> 태그를 선택하기 위함
  if (event.target.tagName == "SPAN") target = event.target.parentNode;
  if (event.target.tagName == "LI") target = event.target;
  //쓰레기통이 클릭됐을 시 무시
  if (event.target.tagName == "BUTTON") return;

  let opt, targetToDo;

  //opt : 1-> waiting , 2 -> finished
  //클릭된 할일이 어떤 상태인지 찾는다.
  toDos.forEach((toDo) => {
    if (toDo.id == target.id) {
      opt = toDo.opt;
      targetToDo = toDo;
    }
  });

  //할일의 상태에 따라 해당하는 리스트에 추가한다.
  if (parseInt(opt) == 1) {
    targetToDo.opt = 2;
    toDoFinishedItems.append(target);
  } else {
    targetToDo.opt = 1;
    toDoWaitingItems.append(target);
  }

  //할일 상태 업데이트
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  //li는 지워야하는 할일을 가리킨다.
  const li = btn.parentNode;
  let opt, targetToDo;

  //클릭된 할일이 어떤 상태인지 찾는다.
  toDos.forEach((toDo) => {
    if (toDo.id == li.id) {
      opt = toDo.opt;
      targetToDo = toDo;
    }
  });

  //클릭된 할일을 삭제한다.
  if (parseInt(opt) == 1) toDoWaitingItems.removeChild(li);
  else toDoFinishedItems.removeChild(li);

  //toDos list에서 현재 할일을 찾아 걸러준다.
  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  //할일의 목록이 바뀌었으므로 로컬스토리지를 업데이트한다.
  saveToDos();
}

function saveToDos() {
  //toDos list를 로컬스토리지에 저장한다.
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
  //할일 목록의 개수를 업데이트 한다.
  updateCount();
}

function printToDo(text, opt) {
  //먼저 html 요소들을 추가한다.
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;

  //삭제 버튼을 추가한다.
  delBtn.innerText = "🗑";
  //삭제 버튼 클릭시 deleteToDo 함수 호출
  delBtn.addEventListener("click", deleteToDo);
  li.addEventListener("click", moveToDo);

  //휴지통 이모티콘이 나타나게 한다.
  li.addEventListener("mouseenter", () => {
    delBtn.classList.add("showing");
  });
  //휴지통 이모티콘이 사라지게 한다.
  li.addEventListener("mouseleave", () => {
    delBtn.classList.remove("showing");
  });

  //span에 현재 입력받은 text를 추가한다.
  span.innerText = text;

  // li 태그 안에 할 일을 추가한다.
  li.appendChild(span);
  li.appendChild(delBtn);
  // id : 할일 삭제를 위한 할일 고유 id
  li.id = newId;

  //처음 할일이 들어왔을 때 할일을 waiting_list에 넣어준다
  if (opt === 1) toDoWaitingItems.appendChild(li);
  else toDoFinishedItems.appendChild(li);

  //할일들을 object화 한다.
  const toDoObj = {
    text: text,
    id: newId,
    opt: opt,
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
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    //이전에 저장된 내용이 있을 때만
    const parseToDos = JSON.parse(loadedToDos);
    //저장된 내용을 화면에 출력한다.
    parseToDos.forEach((toDo) => printToDo(toDo.text, toDo.opt));
  }
}

init();

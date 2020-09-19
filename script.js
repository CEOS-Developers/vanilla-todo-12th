const toDoForm = document.querySelector(".thirdRow");
const toDoInput = document.querySelector(".todoInput");
const toDoList = document.querySelector(".firstList");
const completeList = document.querySelector(".secondList");
const count = document.querySelector(".firstCount");
const count2 = document.querySelector(".secondCount");

let toDos = [];
const TODOS_LS = "toDos";

let toComplete = [];
const COMPLETE_LS = "toComplete";

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode; // btn.parentNode가 innerHtml로 인해 button 이었다. list를 삭제해야 하므로 한번더 parentNode 설정
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteOnlyToDo(evnet) {
  const btn = event.target;
  const li = btn.parentNode; // btn.parentNode가 여기서는 list 바로 나옴
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteToComplete(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode; // btn.parentNode가 innerHtml로 인해 button 이었다. list를 삭제해야 하므로 한번더 parentNode 설정
  completeList.removeChild(li);
  const cleanToDos = toComplete.filter(function (toComplete) {
    return toComplete.id !== parseInt(li.id);
  });
  toComplete = cleanToDos;
  saveComplete();
}

function saveToDos() {
  try {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    const countNumber = toDos.length;
    count.innerHTML = countNumber; //현재 todo 개수를 알려주자
  } catch (err) {
    console.log("something wrong!");
  }
}

function saveComplete() {
  try {
    localStorage.setItem(COMPLETE_LS, JSON.stringify(toComplete));
    const countNumber2 = toComplete.length;
    count2.innerHTML = countNumber2; //현재 complete 개수를 알려주자
  } catch (err) {
    console.log("something wrong!");
  }
}

function moveComplete(text) {
  //대기중에서 눌렸을때 실행 될 함수 1.대기중에서 delete, 2.완료에서 create,
  paintToComplete(text);
}

function paintToComplete(text) {
  const li = document.createElement("ul");
  const delButton = document.createElement("button");
  delButton.innerHTML = "<img class=trash src=img/bin.png>";
  delButton.addEventListener("click", deleteToComplete);
  const span = document.createElement("span");
  span.setAttribute("class", "completeList");
  const newId = toComplete.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delButton);
  li.id = newId;
  completeList.appendChild(li);

  const toCompleteObj = {
    text: text,
    id: newId,
  };

  toComplete.push(toCompleteObj);
  saveComplete(); //push 한 이후에 저장해야된당
}

function paintToDo(text) {
  const li = document.createElement("ul");
  const delButton = document.createElement("button");
  delButton.innerHTML = "<img class=trash src=img/bin.png>";
  delButton.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;

  span.onclick = function () {
    moveComplete(text);
    deleteOnlyToDo(event);
  };

  li.appendChild(span);
  li.appendChild(delButton);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos(); //push 한 이후에 저장해야된당
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue != "") {
    paintToDo(currentValue); //아무 내용 안써져 있으면 버튼 눌러도 등록 x
  }
  toDoInput.value = ""; //placeholder 초기화
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  } else {
    console.log("empty");
  }
}

function loadToComplete() {
  const loadedToComplete = localStorage.getItem(COMPLETE_LS);
  if (loadedToComplete !== null) {
    const parsedToDos = JSON.parse(loadedToComplete);
    parsedToDos.forEach(function (toComplete) {
      paintToComplete(toComplete.text);
    });
  } else {
    console.log("empty");
  }
}

function init() {
  loadToDos();
  loadToComplete();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

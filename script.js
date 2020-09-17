const inputJs = document.querySelector(".input"),
    toDoNewJs = inputJs.querySelector("#todo-new"),
    listWaitingJs = document.querySelector(".waiting"),
    listCompleteJs = document.querySelector(".complete");

const TODOS = "toDos"; //key for saving todos in local storage

let toDos = [];
let maxId = 0;

let tmpType; //only for deleteToDo and moveToDo

function saveToDos() {
    localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    tmpType = li.parentNode.className;
    
    if(tmpType === "list waiting"){ listWaitingJs.removeChild(li); } 
    else{ listCompleteJs.removeChild(li); }
   
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();

    maxId += 1;
}

function moveToDo(event){
    deleteToDo(event);
    const targetContent = event.target.innerText;
    if(tmpType === "list waiting") { printToDo(targetContent, "comp"); }
    else { printToDo(targetContent, "wait"); }
}

function printToDo(content, type) {
    const li = document.createElement("li");
    li.setAttribute("class", "todo");
    const p = document.createElement("p");
    p.addEventListener("click",moveToDo);
    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "button delete");
    delBtn.addEventListener("click", deleteToDo);
    const newId = maxId + 1;

    p.innerText = content;
    li.appendChild(p);
    li.appendChild(delBtn);
    li.id = newId;
    
    if(type === "wait") {listWaitingJs.appendChild(li);}
    else {listCompleteJs.appendChild(li);}

    const toDoObj = {
        content: content,
        id: newId,
        type : type
    };

    toDos.push(toDoObj);
    saveToDos();

    maxId += 1;
}

function loadList() {
    const loadedList = localStorage.getItem(TODOS);
    if (loadedList !== null) {
        const parsedList = JSON.parse(loadedList);
        parsedList.forEach(function(toDo){
            printToDo(toDo.content, toDo.type);
            console.log(toDo.content);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const tempValue = toDoNewJs.value;
    printToDo(tempValue, "wait");
    toDoNewJs.value = "";
}

function init() {
    loadList();
    if(maxId < toDos.length) maxId = toDos.length;
    inputJs.addEventListener("submit", handleSubmit);
}

init();
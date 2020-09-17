const inputJs = document.querySelector(".input"),
    toDoNewJs = inputJs.querySelector("#todo-new"),
    listWaitingJs = document.querySelector(".waiting"),
    listCompleteJs = document.querySelector(".complete");

const TODOS = "toDos"; //key for saving todos in local storage

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function printToDo(content, type) {
    const li = document.createElement("li");
    li.setAttribute("class", "todo");
    const p = document.createElement("p");
    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "button delete");
    //delBtn.addEventListener("click", deleteTodo);
    const newId = toDos.length + 1;

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

function init() {

    /*for testing*/
    const forTest = [
        {content: "a", id: 0, type: "wait"},
        {content: "b", id: 1, type: "wait"},
        {content: "c", id: 2, type: "wait"},
        {content: "d", id: 3, type: "comp"},
    ]
    localStorage.setItem(TODOS, JSON.stringify(forTest));

    loadList();
}

init();
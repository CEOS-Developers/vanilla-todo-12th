const todoForm = document.querySelector(".input"),
    todoInput = todoForm.querySelector("#todo-input"),
    waitingList = document.querySelector(".waiting"),
    completeList = document.querySelector(".complete"),
    countWaitingJs = document.querySelector("#count-waiting"),
    countCompleteJs = document.querySelector("#count-complete");

const TODOS = "todos"; //key for saving todos in local storage
let todoList = [];
let maxId = 0;
let countWaiting = 0, countComplete = 0;
let tmpType; //only for deleteTodo and moveTodo

function saveTodos() {
    localStorage.setItem(TODOS, JSON.stringify(todoList));
}

function printCount() {
    countWaitingJs.innerText = countWaiting;
    countCompleteJs.innerText = countComplete;
}

function deleteTodo(event){
    const li = event.target.parentNode;
    tmpType = li.parentNode.className;
    
    if(tmpType === "list waiting"){ 
        waitingList.removeChild(li);
        countWaiting -= 1; 
    } 
    else{
        completeList.removeChild(li);
        countComplete -= 1;    
    }
    printCount();
   
    const cleanTodos = todoList.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    todoList = cleanTodos;
    saveTodos();

    maxId += 1; //prevent ovelapping of id
}

function moveTodo(event){
    deleteTodo(event);
    const targetContent = event.target.innerText;
    if(tmpType === "list waiting") { printTodo(targetContent, "completed"); }
    else { printTodo(targetContent, "wait");}
}

function printTodo(content, type) {
    const li = document.createElement("li");
    li.classList.add("todo");
    const p = document.createElement("p");
    p.addEventListener("click",moveTodo);
    const delBtn = document.createElement("button");
    delBtn.classList.add("trash");
    delBtn.addEventListener("click", deleteTodo);
    const newId = maxId + 1;

    p.innerText = content;
    li.appendChild(p);
    li.appendChild(delBtn);
    li.id = newId;
    
    if(type === "wait") {
        waitingList.appendChild(li);
        countWaiting += 1;
    }
    else {
        completeList.appendChild(li);
        countComplete += 1;
    }

    printCount();

    const todoObj = {
        content: content,
        id: newId,
        type : type
    };

    todoList.push(todoObj);
    saveTodos();

    maxId += 1;
}

function loadList() {
    const loadedList = localStorage.getItem(TODOS);
    if (loadedList !== null) {
        const parsedList = JSON.parse(loadedList);
        parsedList.forEach(function(todo){
            printTodo(todo.content, todo.type);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const tempValue = todoInput.value;
    printTodo(tempValue, "wait");
    todoInput.value = "";
}

function init() {
    printCount();
    loadList();
    todoForm.addEventListener("submit", handleSubmit);
}

init();
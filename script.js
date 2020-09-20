const todoForm = document.querySelector("#todo-form"),
    todoInput = todoForm.querySelector("#todo-input"),
    waitingList = document.querySelector(".waiting"),
    completeList = document.querySelector(".complete"),
    countWaiting = document.querySelector("#count-waiting"),
    countComplete = document.querySelector("#count-complete");

const TODOS = "todos"; //key for saving todos in local storage
let todoList = [];
let maxId = 0;
let waitingNum = 0, completeNum = 0;
let tmpType; //only for deleteTodo and moveTodo

function saveTodos() {
    localStorage.setItem(TODOS, JSON.stringify(todoList));
}

function printCount() {
    countWaiting.innerText = waitingNum;
    countComplete.innerText = completeNum;
}

function deleteTodo(event){
    const li = event.target.parentNode;
    tmpType = li.parentNode.className;
    
    if(tmpType === "list waiting"){ 
        waitingList.removeChild(li);
        waitingNum -= 1; 
    } 
    else{
        completeList.removeChild(li);
        completeNum -= 1;    
    }
    printCount();
   
    todoList = todoList.filter(todo => todo.id !==
        parseInt(li.id));
    saveTodos();

    maxId += 1; //prevent ovelapping of id
}

function moveTodo(event){
    deleteTodo(event);
    const targetContent = event.target.innerText;
    if(tmpType === "list waiting") { addTodo(targetContent, "completed"); }
    else { addTodo(targetContent, "wait");}
}

function addTodo(content, type) {
    const li = document.createElement("li");
    li.classList.add("todo");
    const p = document.createElement("p");
    p.addEventListener("click",moveTodo);
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.addEventListener("click", deleteTodo);
    const newId = maxId + 1;

    p.innerText = content;
    li.appendChild(p);
    li.appendChild(trashBtn);
    li.id = newId;
    
    if(type === "wait") {
        waitingList.appendChild(li);
        waitingNum += 1;
    }
    else {
        completeList.appendChild(li);
        completeNum += 1;
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
            addTodo(todo.content, todo.type);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const tempValue = todoInput.value;
    if(tempValue != ""){
        addTodo(tempValue, "wait");
    }
    todoInput.value = "";
}

function init() {
    printCount();
    loadList();
    todoForm.addEventListener("submit", handleSubmit);
}

init();
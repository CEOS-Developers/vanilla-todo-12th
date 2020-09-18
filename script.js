
const taskInput = document.getElementById("todoInput");
const addTaskBtn = document.getElementById("addButton"); //왜 안됌>?
const pendingTasksList = document.getElementById("todosPendingList");
const completedTasksList = document.getElementById("todosFinishedList");



let createNewTask = function (todo) {
    let newTodo = document.createElement("li");
    let label = document.createElement("label");
    let deleteBtn = document.createElement("button");

    /*
    newTodo.innerHTML=`
    <span class="todo-item">${todo}</span>
    <button name="deleteBtn"><img src="./img/bin.png", alt="bin", width=14px, height=14px></button>
    `;
    */
    //deleteBtn.innerHTML = ` <button name="deleteBtn"><img src="./img/bin.png", alt="bin", width=14px, height=14px></button>`
    deleteBtn.className = "delete";
    deleteBtn.innerHTML=`<img src="./img/bin.png", alt="bin", width=14px, height=14px>`;
    label.innerText = todo;
    label.className="label";

    newTodo.appendChild(label);
    newTodo.appendChild(deleteBtn);
    console.log(newTodo)
    return newTodo;
}


let addTask = function () {
    console.log(" in add task");
    let newTask = createNewTask(taskInput.value); //.value??
    console.log(newTask)
    console.log(pendingTasksList)
    pendingTasksList.appendChild(newTask);
    bindTaskEvents(newTask, completedTask);

    taskInput.value = "";
}


let deleteTask = function () {
    console.log("delete task");

    let tasksToDelete = this.parentNode;
    let ul = tasksToDelete.parentNode;
    ul.removeChild(tasksToDelete);
}

let completedTask = function () {
    console.log("completed Task");
    let listItem = this.parentNode;
    completedTasksList.appendChild(listItem);
    bindTaskEvents(listItem, pendingTask);
}

let pendingTask = function () {
    console.log("incomplete Task");
    let listItem = this.parentNode;
    pendingTasksList.appendChild(listItem);
    bindTaskEvents(listItem, completedTask);
}


document.querySelector('form').addEventListener('submit', handleSubmitForm);
function handleSubmitForm(e) {
    e.preventDefault(); //st
    let input = document.querySelector('input');
    if (input.value != '') {
        addTask();
        //addTodo(input.value);
    }
    input = '';
}



//addTaskBtn.onclick=addTask;
//console.log("task added");
//addTaskBtn.addEventListener("click",addTask);


let bindTaskEvents = function (taskListItem, statusHandler) {
    console.log("in bindTaskEvents");
    let changeStatus = taskListItem.getElementsByClassName('label')[0];
    console.log(taskListItem);
    let deleteButton = taskListItem.getElementsByClassName('delete')[0];//ClassNamequerySelector("li.delete");

    console.log(deleteButton);//null

    //document.querySelector('ul').addEventListener('click',deleteTask)

    //if (deleteButton)
    deleteButton.onclick = deleteTask;
    console.log('afterdelete');
    //클릭 시 넘어감
    changeStatus.onclick = statusHandler;
}


//change section
for (let i = 0; i < pendingTasksList.children.length; i++) {
    bindTaskEvents(pendingTasksList.children[i], completedTask);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
    bindTaskEvents(completedTasksList.children[i], pendingTask);
}


//addTaskBtn.addEventListener("click",)

/*
addTaskBtn.addEventListener("submit",function(evt){
    evt.preventDefault();
    console.log("task added")
    addTask();
    console.log("task added")
});
*/

/*

document.querySelector('form').addEventListener('submit',handleSubmitForm)
document.querySelector('ul').addEventListener('click',deleteTask)
//add Tasks
function handleSubmitForm(e){
    e.preventDefault(); //st
    let input=document.querySelector('input');
    if(input.value!=''){
        addTodo(input.value);
    }
    input='';
}

function addTodo(todo){
    let tasksList=document.querySelector('ul');
    let newTask=document.createElement('li');
    newTask.innerHTML=`
    <span class="todo-item">${todo}</span>
    <button name="deleteBtn"><img src="./img/bin.png", alt="bin", width=14px, height=14px></button>
    `;
    newTask.classList.add('todo-list-item');
    tasksList.appendChild(newTask);
}

function handleDoneOrDeleteTask(e){
    if(e.target.name=="deleteBtn"){
        deleteTask(e);
    }else{
        changeStatus(e);
    }
}

function changeStatus(e){
    let temp=e.target.parentNode;

    if(temp){
        //in pending, to comp
    }else{
        //in comp, to pending

    }
}

function deleteTask(e){
    let temp=e.target.parentNode;
    temp.remove();

}
*/
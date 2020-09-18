
const taskInput = document.getElementById("todoInput");
const addTaskBtn = document.getElementById("addButton"); //왜 안됌>?
const pendingTasksList = document.getElementById("todosPendingList");
const completedTasksList = document.getElementById("todosFinishedList");


//create New todo format
let createNewTask = function (todo) {
    let newTodo = document.createElement("li");
    let label = document.createElement("label");
    let deleteBtn = document.createElement("button");

    deleteBtn.className = "delete";
    deleteBtn.innerHTML=`<img src="./img/bin.png", alt="bin", width=14px, height=14px>`;
    label.innerText = todo;
    label.className="label";

    newTodo.appendChild(label);
    newTodo.appendChild(deleteBtn);
    console.log(newTodo)
    return newTodo;
}

//add Task
let addTask = function () {
    console.log(" in add task");
    let newTask = createNewTask(taskInput.value); //.value??
    console.log(newTask)
    console.log(pendingTasksList)
    pendingTasksList.appendChild(newTask);
    total=pendingTasksList.childElementCount
    document.getElementById('pendingTasksNumber').innerHTML=total;
    bindTaskEvents(newTask, completedTask);

    taskInput.value = "";
}
//tasks number
let tasksCount=function(){
    console.log('count tasks');
    document.getElementById('finishedTasksNumber').innerHTML=completedTasksList.childElementCount;
    document.getElementById('pendingTasksNumber').innerHTML=pendingTasksList.childElementCount;

}

//delte Tasks
let deleteTask = function () {
    console.log("delete task");

    let tasksToDelete = this.parentNode;
   /*
    let ul = tasksToDelete.parentNode;
    ul.removeChild(tasksToDelete);
*/

    tasksToDelete.parentNode
    tasksCount();
}

let completedTask = function () {
    console.log("completed Task");
    let listItem = this.parentNode;
    listItem.style.textDecoration="line-through"
    completedTasksList.appendChild(listItem);
    bindTaskEvents(listItem, pendingTask);

}

let pendingTask = function () {
    console.log("incomplete Task");
    let listItem = this.parentNode;
    if(listItem.style.textDecoration=="line-through"){
        listItem.style.textDecoration="none";
    }
    pendingTasksList.appendChild(listItem);
    //console.log("cnt",pendingTasksList.childElementCount)
    
    bindTaskEvents(listItem, completedTask);
}

//write todo, add it!
document.querySelector('form').addEventListener('submit', handleSubmitForm);
function handleSubmitForm(e) {
    e.preventDefault(); //st
    let input = document.querySelector('input');
    if (input.value != '') {
        addTask();
    }
    input = '';
}

//formulate a task
let bindTaskEvents = function (taskListItem, statusHandler) {
    console.log("in bindTaskEvents");
    let changeStatus = taskListItem.getElementsByClassName('label')[0];
    console.log(taskListItem);
    let deleteButton = taskListItem.getElementsByClassName('delete')[0];//ClassNamequerySelector("li.delete");

    console.log(deleteButton);

    deleteButton.onclick = deleteTask;
    
    console.log('afterdelete');
    //클릭 시 넘어감
    changeStatus.onclick = statusHandler;
 
    tasksCount();
}
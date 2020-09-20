
const taskInput = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("todo-submit-button"); //왜 안됌>?
const pendingTasksList = document.getElementById("todos-pending-list");
const completedTasksList = document.getElementById("todos-finished-list");


//create New todo format
const createNewTask = function (todo) {
    let newTodo = document.createElement("li");
    let label = document.createElement("label");
    let deleteBtn = document.createElement("button");

    deleteBtn.className = "delete";
    deleteBtn.innerHTML = `<img src="./img/bin.png", alt="bin", width=14px, height=14px>`;
    label.innerText = todo;
    label.className = "label";

    newTodo.appendChild(label);
    newTodo.appendChild(deleteBtn);
    console.log(newTodo)
    return newTodo;
}

//add Task
const addTask = function () {
    console.log(" in add task");
    let newTask = createNewTask(taskInput.value); //.value??
    console.log(newTask)
    console.log(pendingTasksList)
    pendingTasksList.appendChild(newTask);
    total = pendingTasksList.childElementCount
    document.getElementById('pending-tasks-number').innerHTML = total;
    bindTaskEvents(newTask, completedTask);

    taskInput.value = "";
}
//tasks number
const countTasks = function () {
    console.log('count tasks');
    document.getElementById('finished-tasks-number').innerHTML = completedTasksList.childElementCount;
    document.getElementById('pending-tasks-number').innerHTML = pendingTasksList.childElementCount;

}

//delete Tasks
const deleteTask = function () {
    console.log("delete task");

    let tasksToDelete = this.parentNode;

    let ul = tasksToDelete.parentNode;
    ul.removeChild(tasksToDelete);

    countTasks();
}

const completedTask = function () {
    console.log("completed Task");
    let listItem = this.parentNode;
    listItem.style.textDecoration = "line-through"
    completedTasksList.appendChild(listItem);
    bindTaskEvents(listItem, pendingTask);

}

const pendingTask = function () {
    console.log("incomplete Task");
    let listItem = this.parentNode;
    if (listItem.style.textDecoration == "line-through") {
        listItem.style.textDecoration = "none";
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
let bindTaskEvents = function (taskListItem, changeTasksStatus) {
    console.log("in bindTaskEvents");
    let changeStatus = taskListItem.getElementsByClassName('label')[0];
    let deleteButton = taskListItem.getElementsByClassName('delete')[0];//ClassNamequerySelector("li.delete");

    deleteButton.onclick = deleteTask;

    //클릭 시 넘어감
    changeStatus.onclick = changeTasksStatus;

    countTasks();
}

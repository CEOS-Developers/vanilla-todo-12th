const toDoForm = document.querySelector(".thirdRow")
    toDoInput = document.querySelector(".todoInput")
    toDoList = document.querySelector(".firstTodoList")


const TODOS_LS="toDos";

function paintToDo(text){
    console.log(text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="" //placeholder 초기화
}

function loadToDos(){
    const toDos=localStorage.getItem(TODOS_LS);
    if(toDos!==null){

    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();
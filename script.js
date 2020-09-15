const toDoForm = document.querySelector(".thirdRow")
    toDoInput = document.querySelector(".todoInput")
    toDoList = document.querySelector(".firstList")


let toDos = [];
const TODOS_LS="toDos";

function deleteToDo(event){
    console.log("delete check")
    console.dir(event.target)
    const btn = event.target;
    const li = (btn.parentNode).parentNode; // btn.parentNode가 innerHtml로 인해 button 이었다. list를 삭제해야 하므로 한번더 parentNode 설정
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
    console.log(text);
    const li = document.createElement("ul");
    const delBtn = document.createElement("button");
    delBtn.innerHTML="<img class=trash src=img/bin.png>";
    delBtn.addEventListener("click",deleteToDo)
    const span = document.createElement("span");
    const newId = toDos.length+1;
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj={
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos(); //push 한 이후에 저장해야된당

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    if(currentValue!=""){
    paintToDo(currentValue); //아무 내용 안써져 있으면 버튼 눌러도 등록 x
    }
    toDoInput.value="" //placeholder 초기화
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null){
        console.log("not empty");
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }else{
        console.log("empty");
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();
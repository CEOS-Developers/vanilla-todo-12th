const toDoForm = document.querySelector(".thirdRow")
    toDoInput = document.querySelector(".todoInput")
    toDoList = document.querySelector(".firstList")
    completeList = document.querySelector(".secondList")
    count = document.querySelector(".firstCount")
    count2 = document.querySelector(".secondCount")


let toDos = [];
const TODOS_LS="toDos";

let toComplete = [];
const COMPLETE_LS="toComplete";

function deleteToDo(event){
    console.log("delete check");
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

function deleteToComplete(event){
    console.log("delete check");
    const btn = event.target;
    const li = (btn.parentNode).parentNode; // btn.parentNode가 innerHtml로 인해 button 이었다. list를 삭제해야 하므로 한번더 parentNode 설정
    completeList.removeChild(li);
    const cleanToDos = toComplete.filter(function(toComplete){
        return toComplete.id !== parseInt(li.id);
    });
    toComplete = cleanToDos;
    saveComplete();
}

function saveToDos(){
    try{
        localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    
        let countNumber = toDos.length;
        console.log(countNumber); //현재 localStorage 속 개수 확인
        count.innerHTML=countNumber; //현재 개수를 알려주자

    }catch(err){
        console.log("something wrong!");
    }
    
}

function saveComplete(){
    try{
        localStorage.setItem(COMPLETE_LS,JSON.stringify(toComplete));
    
        let countNumber = toComplete.length;
        console.log(countNumber); //현재 localStorage 속 개수 확인
        count2.innerHTML=countNumber; //현재 개수를 알려주자

    }catch(err){
        console.log("something wrong!");
    }
    
}

function moveComplete(text){
    //대기중에서 눌렸을때 실행 될 함수 1.대기중에서 delete, 2.완료에서 create,
    console.log(text);
    paintToComplete(text);
}

function moveTo(event){
    console.log("moveto check");
}

function paintToComplete(text){
    console.log(text);
    const li = document.createElement("ul");

    const delBtn = document.createElement("button");
    delBtn.innerHTML="<img class=trash src=img/bin.png>";
    delBtn.addEventListener("click",deleteToComplete);
    
    const span = document.createElement("span");
    const newId = toComplete.length+1;
    span.innerText=text;
    

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    completeList.appendChild(li);

    const toCompleteObj={
        text : text,
        id : newId
    };
    toComplete.push(toCompleteObj);
    
    saveComplete(); //push 한 이후에 저장해야된당   
}

function paintToDo(text){
    console.log(text);
    const li = document.createElement("ul");

    const delBtn = document.createElement("button");
    delBtn.innerHTML="<img class=trash src=img/bin.png>";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length+1;
    span.innerText=text;

    span.onclick=function(){
        moveComplete(text);
    }

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

function loadToComplete(){
    const loadedToComplete=localStorage.getItem(COMPLETE_LS);
    if(loadedToComplete!==null){
        console.log("not empty");
        const parsedToDos = JSON.parse(loadedToComplete);
        parsedToDos.forEach(function(toComplete){
            paintToComplete(toComplete.text);
        })
    }else{
        console.log("empty");
    }
}

function init(){
    loadToDos();
    loadToComplete();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector(".input-text");
const toDoButton = toDoForm.querySelector(".input-button");

const LOCAL_STORAGE_TODO_KEY = "todo";
let toDoList = [];

// localStorage 모델: 웹이 로드 될 때 기존 투두리스트를 가져오기 위함
const LocalStorageModel = {
    // localStorage에 저장
    save() {
        localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(toDoList));
    },

    // localStorage에서 로드
    load() {
        const loaded = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);
        if (loaded) {
            const parsed = JSON.parse(loaded);
            toDoList = parsed;
        }
    }
}

// List 모델
const ListModel = {
    // 개수 계산
    getPendingToDosCount() {
        return toDoList.filter(item => !item.done).length
    },

    getDoneToDosCount() {
        return toDoList.filter(item => item.done).length
    },

    // list 대기중 완료 토글
    updateIsDoneBy(value, isDone) {
        const i = toDoList.findIndex((item) => {
            return item.text == value;
        })
        toDoList[i].done = toDoList[i].done == isDone ? !isDone : isDone;
    },

    // toDoList 배열에 추가  -> submit 할 때
    addToList(value) {
        let item = {
            id: toDoList.length + 1,
            text: value,
            done: false
        }
        toDoList.push(item);
    },

    // toDoList 배열에서 제거 -> 휴지통
    removeFromList(value) {
        const i = toDoList.findIndex((item) => {
            return item.text == value;
        })
        toDoList.splice(i, 1);
    }
}

// Paint 모델: 화면에 그리고 빼는 것과 관련
const PaintModel = {
    // 새로고침 화면 그리기
    loadData() {
        LocalStorageModel.load();
        
        PaintModel.updateList();
        PaintModel.updateToDoCount();
    },

    // 리스트 개수 그리기
    updateToDoCount() {
        document.querySelector(".count-pending").innerHTML = ListModel.getPendingToDosCount();
        document.querySelector(".count-done").innerHTML = ListModel.getDoneToDosCount();
    },

    // toDoList 다시 그리기
    updateList() {
        const pendingTodoList = document.getElementById("list-pending");
        const doneTodoList = document.getElementById("list-done");
        pendingTodoList.innerHTML = "";
        doneTodoList.innerHTML = "";
        
        toDoList.forEach((item) => {
            const classToAdd = !item.done ? "item-pending" : "item-done";
            const listToAdd = !item.done ? "ul.list-pending" : "ul.list-done";

            const img = document.createElement("img");
            img.src = "./img/bin.png";
            img.addEventListener("click", EventHandlerModel.imgClick);

            const li = document.createElement("li");
            li.classList.add(classToAdd);
            li.innerHTML = item.text;
            li.appendChild(img);

            li.addEventListener("click", EventHandlerModel.click);
            document.querySelector(listToAdd).appendChild(li);

        });
    },

    // textField 비우기
    emptyInput() {
        toDoInput.value = "";
    }
}

// EventHandler 모델: 사용자랑 상호작용과 관련
const EventHandlerModel = {
    // TextField 엔터 눌렀을 때
    handleTodoInputSubmit(event) {
        event.preventDefault();

        ListModel.addToList(toDoInput.value);
        LocalStorageModel.save();

        PaintModel.updateList();
        PaintModel.updateToDoCount();
        PaintModel.emptyInput();
    },

    // To do List 항목을 클릭했을 때
    click(event) {
        if (event.target.tagName === "IMG") return;
        const value = event.target.textContent; // innerHTML X
        const isDone = event.target.classList.contains("item-done");
        
        ListModel.updateIsDoneBy(value, isDone);
        LocalStorageModel.save();

        PaintModel.updateList();
        PaintModel.updateToDoCount();
    },

    // 쓰레기통 img 클릭했을 때
    imgClick(event) {
        const  value = event.target.parentNode.textContent;
        ListModel.removeFromList(value);
        LocalStorageModel.save();

        PaintModel.updateList();
        PaintModel.updateToDoCount();
    }
}

function init() {
    PaintModel.loadData();
    toDoForm.addEventListener("submit", EventHandlerModel.handleTodoInputSubmit);
    toDoButton.addEventListener("click", EventHandlerModel.handleTodoInputSubmit);
}

init();
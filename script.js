const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector(".input-text");
const toDoButton = toDoForm.querySelector(".input-button");

const TODO_DB = "todo";
let toDoList = [];

// localStorage 모델: 웹이 로드 될 때 기존 투두리스트를 가져오기 위함
const localStorageModel = {
    // localStorage에 저장
    save: () => {
        localStorage.setItem(TODO_DB, JSON.stringify(toDoList));
    },

    // localStorage에서 로드
    load: () => {
        const loaded = localStorage.getItem(TODO_DB);
        if (loaded !== null) {
            const parsed = JSON.parse(loaded);
            toDoList = parsed;
        }
    }
}

// List 모델
const list = {
    // 개수 계산
    getCount: () => {
        let pending = 0;
        toDoList.forEach((item) => {
            if (!item.done) {
                pending++;
            }
        })
        return {
            pending: pending,
            done: toDoList.length - pending
        }
    },

    // list 대기중 완료 토글
    updateList: (value, isDone) => {
        const i = toDoList.findIndex((item) => {
            return item.text == value;
        })
        toDoList[i].done = toDoList[i].done == isDone ? !isDone : isDone;
    },

    // toDoList 배열에 추가  -> submit 할 때
    addToList: (value) => {
        let item = {
            "id": toDoList.length + 1,
            "text": value,
            "done": false
        }
        toDoList.push(item);
    },

    // toDoList 배열에서 제거 -> 휴지통
    removeFromList: (value) => {
        const i = toDoList.findIndex((item) => {
            return item.text == value;
        })
        toDoList.splice(i, 1);
    }
}

// Paint 모델: 화면에 그리고 빼는 것과 관련
const paint = {
    // 새로고침 화면 그리기
    loadData: () => {
        localStorageModel.load();
        
        paint.updateList();
        paint.listCount();
    },

    // 리스트 개수 그리기
    listCount: () => {
        document.querySelector(".count-pending").innerHTML = list.getCount().pending;
        document.querySelector(".count-done").innerHTML = list.getCount().done;
    },

    // toDoList 다시 그리기
    updateList: () => {
        const ul = document.querySelectorAll("ul");
        console.log(ul[0].childNodes);
        ul.forEach((list) => {
            var child = list.lastElementChild;
            while (child) {
                list.removeChild(child);
                child = list.lastElementChild;
            }
        })    
        
        toDoList.forEach((item) => {
            const addClass = !item.done ? "item-pending" : "item-done";
            const addToList = !item.done ? "ul.list-pending" : "ul.list-done";

            const img = document.createElement("img");
            img.src = "./img/bin.png";
            img.addEventListener("click", interaction.imgClick);

            const li = document.createElement("li");
            li.classList.add(addClass);
            li.innerHTML = item.text;
            li.appendChild(img);

            li.addEventListener("click", interaction.click);
            document.querySelector(addToList).appendChild(li);

        });
    },

    // textField 비우기
    inputEmpty: () => {
        toDoInput.value = "";
    }
}

// Interaction 모델: 사용자랑 상호작용과 관련
const interaction = {
    // TextField 엔터 눌렀을 때
    submit: (event) => {
        event.preventDefault();

        list.addToList(toDoInput.value);
        localStorageModel.save();

        paint.updateList();
        paint.listCount();
        paint.inputEmpty();
    },

    // To do List 항목을 클릭했을 때
    click: (event) => {
        if (event.target.tagName == "IMG") return;
        const value = event.target.textContent; // innerHTML X
        const isDone = event.target.classList.contains("item-done");
        
        list.updateList(value, isDone);
        localStorageModel.save();

        paint.updateList();
        paint.listCount();
    },

    // 쓰레기통 img 클릭했을 때
    imgClick: (event) => {
        const  value = event.target.parentNode.textContent;
        list.removeFromList(value);
        localStorageModel.save();

        paint.updateList();
        paint.listCount();
    }
}

function init() {
    paint.loadData();
    toDoForm.addEventListener("submit", interaction.submit);
    toDoButton.addEventListener("click", interaction.submit);
}

init();
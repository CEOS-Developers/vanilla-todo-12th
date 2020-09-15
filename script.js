const toDoForm = document.querySelector("form");
const toDoInput = toDoForm.querySelector(".input-text");
const toDoButton = toDoForm.querySelector(".input-button");

const PENDING_CLASS = "item-pending";
const DONE_CLASS = "item-done";
const SHOWING_CLASS = "showing";
const TODO_DB = "todo";

// 이거 나중에 객체리스트로 고쳐주자. 코드 훨씬 간결해질듯.
let pendingList = [];
let doneList = [];

// localStorage 모델: 웹이 로드 될 때 기존 투두리스트를 가져오기 위함
const localStorageModel = {
    // localStorage에 저장
    save: () => {
        let list = [];
        pendingList.forEach((item, i) => {
            let temp = {
                "id": i + 1,
                "text": item,
                "done": false
            }
            list.push(temp);
        })
        doneList.forEach((item, i) => {
            let temp = {
                "id": (i + 1) * 100002,
                "text": item,
                "done": true
            }
            list.push(temp);
        })
        localStorage.setItem(TODO_DB, JSON.stringify(list));
    },
    
    // localStorage에서 로드
    load: () => {
        const loaded = localStorage.getItem(TODO_DB);
        if (loaded !== null) {
            const parsed = JSON.parse(loaded);
            parsed.forEach((item) => {
                if (item.done) {
                    paint.doneList(item.text);
                    list.addToDoneList(item.text);
                } else {
                    paint.pendingList(item.text);
                    list.addToPendingList(item.text);
                }
            })
            paint.listCount(); // 이건 원래 여기 X
        }
    }
}

// List 모델
const list = {
    // 개수 계산
    getCount: () => {
        return {
            pending: pendingList.length,
            done: doneList.length
        }
    },

    // 대기중 배열에 추가
    addToPendingList: (value) => {
        pendingList.push(value);
    },

    // 완료 배열에 추가
    addToDoneList: (value) => {
        doneList.push(value);
    },

    // 대기중 배열에서 제거
    removeFromPendingList: (value) => {
        const i = pendingList.findIndex((item) => {
            return item == value
        })
        pendingList.splice(i, 1);
    },

    // 완료 배열에서 제거
    removeFromDoneList: (value) => {
        const i = doneList.findIndex((item) => {
            return item == value
        })
        doneList.splice(i, 1);
    }
}

// Paint 모델: 화면에 그리고 빼는 것과 관련
const paint = {
    // 리스트 개수 그리기
    listCount: () => {
        document.querySelector(".count-pending").innerHTML = list.getCount().pending;
        document.querySelector(".count-done").innerHTML = list.getCount().done;
    },

    // 대기중 값 그리기
    pendingList: (value) => {
        const img = document.createElement("img");
        img.src = "./img/bin.png";
        img.addEventListener("click", interaction.imgClick);

        const li = document.createElement("li");
        li.classList.add("item-pending");
        li.innerHTML = value;
        li.appendChild(img);
        li.addEventListener("click", interaction.click);

        document.querySelector("ul.list-pending").appendChild(li);
    },

    // 완료 값 그리기
    doneList: (value) => {
        const img = document.createElement("img");
        img.src = "./img/bin.png";
        img.addEventListener("click", interaction.imgClick);

        const li = document.createElement("li");
        li.classList.add("item-done");
        li.innerHTML = value;
        li.appendChild(img);

        li.addEventListener("click", interaction.click);
        document.querySelector("ul.list-done").appendChild(li);
    },

    // 대기중 값 빼기
    removePendingList: (event) => {
        event.target.parentNode.removeChild(event.target);
    },

    // 완료 값 빼기
    removeDoneList: (event) => {
        event.target.parentNode.removeChild(event.target);
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

        list.addToPendingList(toDoInput.value);
        paint.pendingList(toDoInput.value);

        paint.listCount();
        
        paint.inputEmpty();

        localStorageModel.save();
    },

    // To do List 항목을 클릭했을 때
    click: (event) => {
        if (event.target.tagName == "IMG") return;
        const value = event.target.textContent; // innerHTML X
        if (event.target.classList.contains(DONE_CLASS)) {
            list.removeFromDoneList(value);
            paint.removeDoneList(event);

            list.addToPendingList(value);
            paint.pendingList(value);
        } else {
            list.removeFromPendingList(value);
            paint.removePendingList(event);

            list.addToDoneList(value);
            paint.doneList(value);
        }

        paint.listCount();

        localStorageModel.save();
    },

    // 쓰레기통 img 클릭했을 때
    imgClick: (event) => {
        if (event.target.parentNode.classList.contains(PENDING_CLASS)) {
            list.removeFromPendingList(event.target.parentNode.textContent);
        } else {
            list.removeFromDoneList(event.target.parentNode.textContent);
        }
        
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        
        paint.listCount();

        localStorageModel.save();
    }
}


function init() {

    localStorageModel.load();
    toDoForm.addEventListener("submit", interaction.submit);
    toDoButton.addEventListener("click", interaction.submit);
}

init();

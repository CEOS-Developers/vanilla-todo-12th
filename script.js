const toDoForm = document.querySelector("form");
const toDoInput = toDoForm.querySelector(".input-text");

const PENDING_CLASS = "item-pending";
const DONE_CLASS = "item-done";

let pendingList = [];
let doneList = [];

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
        const li = document.createElement("li");
        li.classList.add("item-pending");
        li.innerHTML = value;
        li.addEventListener("mouseover", interaction.mouseOver); 
        li.addEventListener("click", interaction.click);
        document.querySelector("ul.list-pending").appendChild(li);
    },

    // 완료 값 그리기
    doneList: (value) => {
        const li = document.createElement("li");
        li.classList.add("item-done");
        li.innerHTML = value;
        li.addEventListener("mouseover", interaction.mouseOver); 
        li.addEventListener("click", interaction.click);
        document.querySelector("ul.list-done").appendChild(li);
    },

    // 대기중 값 빼기
    removePendingList: (event) => {
        document.querySelector("ul.list-pending").removeChild(event.target);
    },

    // 완료 값 빼기
    removeDoneList: (event) => {
        document.querySelector("ul.list-done").removeChild(event.target);
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
    },

    // To do List 항목 위에 마우스 올렸을 때
    mouseOver: (event) => {
        // console.log(event.target);
    },

    // To do List 항목을 클릭했을 때
    click: (event) => {
        const value = event.target.innerHTML;
        if (event.target.classList.contains(DONE_CLASS)) {
            list.removeFromDoneList(value);
            paint.removeDoneList(event);

            list.addToPendingList(value);
            paint.pendingList(value);

            paint.listCount();
        } else {
            list.removeFromPendingList(value);
            paint.removePendingList(event);

            list.addToDoneList(value);
            paint.doneList(value);

            paint.listCount();
        }
    }
}


function init() {
    paint.listCount();
    toDoForm.addEventListener("submit", interaction.submit);
    
    // 값이 저장되어 있으면서 화면이 로드 될 때 필요한 코드
    // pendingList.forEach((item) => {
    //     paint.pendingList(item);
    // })
    // doneList.forEach((item) => {
    //     paint.doneList(item);
    // })
    // document.querySelectorAll("li").forEach((item) => {
    //     item.addEventListener("mouseover", interaction.mouseOver); // 휴지통 만들 때 필요한 event
    //     item.addEventListener("click", interaction.click);
    // })
}

init();

const toDoForm = document.querySelector("form");
const toDoInput = toDoForm.querySelector(".input-text");

const PENDING_CLASS = "item-pending";
const DONE_CLASS = "item-done";

let pendingList = ["To Do List 만들기", "도서관 책 반납하기"];
let doneList = ["방 청소", "도서관 책 빌리기"];

const list = {
    getCount: () => {
        return {
            pending: pendingList.length,
            done: doneList.length
        }
    },
    addToPendingList: (value) => {
        pendingList.push(value);
    },
    addToDoneList: (value) => {
        doneList.push(value);
    },
    removeFromPendingList: (value) => {
        const i = pendingList.findIndex((item) => {
            return item == value
        })
        pendingList.splice(i, 1);
    },
    removeFromDoneList: (value) => {
        const i = doneList.findIndex((item) => {
            return item == value
        })
        doneList.splice(i, 1);
    }
}

const paint = {
    listCount: () => {
        document.querySelector(".count-pending").innerHTML = list.getCount().pending;
        document.querySelector(".count-done").innerHTML = list.getCount().done;
    },
    pendingList: (value) => {
        const li = document.createElement("li");
        li.classList.add("item-pending");
        li.innerHTML = value;
        li.addEventListener("mouseover", interaction.mouseOver); 
        li.addEventListener("click", interaction.click);
        document.querySelector("ul.list-pending").appendChild(li);
    },
    doneList: (value) => {
        const li = document.createElement("li");
        li.classList.add("item-done");
        li.innerHTML = value;
        li.addEventListener("mouseover", interaction.mouseOver); 
        li.addEventListener("click", interaction.click);
        document.querySelector("ul.list-done").appendChild(li);
    },
    removePendingList: (event) => {
        document.querySelector("ul.list-pending").removeChild(event.target);
    },
    removeDoneList: (event) => {
        document.querySelector("ul.list-done").removeChild(event.target);
    },
    inputEmpty: () => {
        toDoInput.value = "";
    }
}

const interaction = {
    submit: (event) => {
        event.preventDefault();
        list.addToPendingList(toDoInput.value);
        paint.pendingList(toDoInput.value);
        paint.inputEmpty();
    },
    mouseOver: (event) => {
        // console.log(event.target);
    },
    click: (event) => {
        const value = event.target.innerHTML;
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
    }
}

function init() {
    paint.listCount();
    pendingList.forEach((item) => {
        paint.pendingList(item);
    })
    doneList.forEach((item) => {
        paint.doneList(item);
    })

    toDoForm.addEventListener("submit", interaction.submit);
    document.querySelectorAll("li").forEach((item) => {
        item.addEventListener("mouseover", interaction.mouseOver); // 휴지통 만들 때 필요한 event
        item.addEventListener("click", interaction.click);
    })

}

init();

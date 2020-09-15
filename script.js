let pendingList = ["To Do List 만들기", "도서관 책 반납하기"];
let doneList = ["방 청소", "도서관 책 빌리기"];

// 리스트 개수 구하는 함수
function getListCount() {
    return {
        pending: pendingList.length,
        done: doneList.length
    }
}

// 리스트 개수 업데이트 함수
function updateListCount() {
    document.querySelector(".count-pending").innerHTML = getListCount().pending;
    document.querySelector(".count-done").innerHTML = getListCount().done;
}

function init() {
    updateListCount();
}

init();







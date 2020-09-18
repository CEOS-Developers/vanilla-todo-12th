
// 카운트 하기 위해 할 일들 목록 각각 가져오기
let waitingNum = document.getElementsByClassName("waiting");
let completeNum = document.getElementsByClassName("compted");

// 할 일 추가
function addList (e) {
    if (e == 'click' || e.keyCode == 13) {
        if (document.getElementById("add_input").value != '') {
            let todo = document.getElementById('add_input').value;

            // 껍데기 div부터 차례로 생성.
            let listbox = document.createElement('div');
            listbox.className = 'listbox';

            // li 생성.
            let list = document.createElement('li');
            list.className = "waiting";
            list.innerHTML = todo;
            list.setAttribute("onclick", "move(this)");

            // img 생성.
            let trash = document.createElement('img');
            trash.src = "./img/bin.png";
            trash.alt = "";
            trash.setAttribute("onclick", "deleteList(this)");

            // div 안에 li와 img 이동.
            listbox.appendChild(list);
            listbox.appendChild(trash);

            // li와 img가 들어간 div를 할 일 목록에 추가.
            document.getElementById('waitList').append(listbox);

            document.getElementById("add_input").value = '';
            checkListNum();
        }
    }
}
    
// 리스트를 클릭하면 반대편으로 이동
function move(li) {
    if (li.className == "waiting") {    // 클릭한 것이 대기중인 일이라면 완료됨으로 이동.
        li.className = "compted";      // 클릭한 일이 대기중인지 완료됨인지 판단하는 기준.
        document.getElementById("completeList").appendChild(li.parentNode);
    } else {    // 완료된 일이라면 대기중으로 이동.
        li.className = "waiting";
        document.getElementById("waitList").appendChild(li.parentNode);
    }

    checkListNum();
}

// 쓰레기통 이미지 클릭 시 삭제
function deleteList(li) {
    li.parentNode.remove();     // 부모인 div째로 삭제.
    checkListNum();
}

// 리스트의 할 일들 카운트
function checkListNum() {
    document.getElementsByClassName("wait")[0].innerHTML = `대기중 (${waitingNum.length})`;
    document.getElementsByClassName("complete")[0].innerHTML = `완료됨 (${completeNum.length})`;
    // 다른 함수가 작동 할 때마다 이 함수를 동작하여 업데이트 해주어야 한다.
}

checkListNum();

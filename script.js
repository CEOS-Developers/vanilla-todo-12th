let waitArr = []
let completedArr = []

let addList = document.getElementById("add_input")
// let deleteList = document.getElementsByTagName("li")
// let waitList = 

addList.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        // event.preventDefault();
        let todo = document.getElementById('add_input').value;
        // waitArr.push(todo);

        let list = document.createElement('li');
        list.className = "waiting";
        list.innerHTML = todo;
        list.setAttribute("onclick", "move(this)");
        // list.addEventListener("click", move(this))
        
        document.getElementById('waitList').append(list);

        console.log('waitArr = ', waitArr);

        document.getElementById("waitNum").innerHTML = `대기중 (${waitingNum.length})`;
    }
})

function move(li) {
    if (li.className == "waiting") {
        li.className = "compted";
        document.getElementById("completeList").appendChild(li);
    } else {
        li.className = "waiting";
        document.getElementById("waitList").appendChild(li);
    }
    // li.remove();
    // console.log(li);
}

function deleteList() {
    console.log('CLICKED !!!');
}

let waitingNum = document.getElementsByClassName("waiting")
document.getElementById("waitNum").innerHTML = `대기중 (${waitingNum.length})`;
// for(let i=0; i<deleteList.length; i++) {
//     deleteList[i].addEventListener("click", function(event) {
//         // let el = document.getElementById
//         if (deleteList[i].parentNode.id == "waitList") {
//             console.log('parent = ', deleteList[i].parentNode);

//         } else {
//             this.remove();
//         }
        
//         this.remove();

//     })
// }

// deleteList.addEventListener("click", function(event) {
//     // let el = document.getElementById
//         console.log('parent = ', deleteList);
    
//     this.remove();

// })



// let liNum = document.getElementById("waitList").childNodes
// console.log('liNum = ', liNum);
// liNum = liNum.filter(el => el == 'li');
// document.getElementById("waitNum").innerHTML = `대기중 (${document.getElementById("waitList").childNodes.length})`;
// console.log(document.getElementById("waitList").childNodes);

// function makelist() {
//     for (let i=0; i<waitArr.length; i++) {
//         let list = document.createElement('li');
//         list.innerHTML = waitArr[i];
//         document.getElementById('waitList').append(list);
//     }

// }

// makelist();

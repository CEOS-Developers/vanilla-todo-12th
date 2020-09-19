const todoHeader = document.querySelector('#todo-header');
const doneHeader = document.querySelector('#done-header');

const todoListForm = document.querySelector('.input-box'); // 할 것 제출
const InputContent = document.querySelector('input'); // 추가 할 내용

const todoList = document.querySelector('#todo-list'); // todo list에서 추가 될 곳
const doneList = document.querySelector('#done-list'); // done list에서 추가 될 곳

var countTodoList = 0; // todo list 개수 세기
var countDoneList = 0; // done list 개수 세기

// 폼 제출 비동기 함수
todoListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (InputContent.value) {
        // InputContent.value에 내용이 담겼으면
        const todo = document.createElement('div');
        const todoContent = document.createElement('span');
        todoContent.textContent = InputContent.value;
        // div 안 todoContent에 input 내용을 넣어줌
        todoContent.classList.add('todolist-content');
        todo.append(todoContent);

        // double click로 todo -> done, done -> todo 구현하는 event를 todoContent에 적용
        todoContent.addEventListener('dblclick', (e) => {
            const parent = e.target.parentNode;

            if (parent.parentNode.id === 'todo-list') {
                doneList.append(e.target.parentNode);
                todoContent.style.textDecoration = 'line-through';
                countTodoList -= 1;
                countDoneList += 1;
            } else {
                todoList.append(e.target.parentNode);
                todoContent.style.textDecoration = 'none';
                countTodoList += 1;
                countDoneList -= 1;
            }
            todoHeader.textContent = 'To do list (' + countTodoList + ')';
            doneHeader.textContent = 'Done list (' + countDoneList + ')';
        });

        // 삭제 버튼 만들기
        const button_span = document.createElement('span');
        const deleteButton = document.createElement('button');
        const deleteImage = new Image();
        deleteImage.className = 'delete-image';
        deleteImage.src = './img/bin.png';
        deleteButton.append(deleteImage);

        // 버튼 동작 콜백함수
        deleteButton.addEventListener('click', (e) => {
            let deleteTag = e.target; // 지울 테그 찾기 위한 변수
            // 상위 delete 테그를 찾는다.
            while (deleteTag.tagName !== 'DIV') deleteTag = deleteTag.parentNode;

            if (deleteTag.parentNode.id === 'todo-list') {
                countTodoList -= 1;
                todoHeader.textContent = 'To do list (' + countTodoList + ')';
            } else {
                countDoneList -= 1;
                doneHeader.textContent = 'Done list (' + countDoneList + ')';
            }

            // 상위 deleteTag 테그에서 자식 삭제
            deleteTag.parentNode.removeChild(deleteTag);
        });

        button_span.classList.add('content');
        button_span.append(deleteButton);
        todo.append(button_span);
        todoList.append(todo);
        // 버튼을 todo에 넣고, todolist에 todo를 넣는다.
        InputContent.value = '';
        // input text 초기화
        countTodoList += 1;
        todoHeader.textContent = 'To do list (' + countTodoList + ')';
        // todo에 새로운 할 일을 추가 했으므로 count 증가와 text 상태 업데이트

        // localStorage.setItem(span.textContent, 1);
    }
});

const submitForm = document.querySelector('.input-box'); // 할 것 제출
const button = document.querySelector('button'); // 입력버튼
const textInput = document.querySelector('input'); // 추가 할 내용
const todolist = document.querySelector('#todo-list'); // 버튼을 눌렀을 때 추가되는 곳
const list = document.querySelector('.list');
var count_todolist = 0;

// 폼 제출 비동기 함수
submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('hi');
    const div = document.createElement('div');
    div.textContent = textInput.value;
    console.log('div content', div.textContent);
    console.log(textInput.value);
    if (div.textContent) {
        count_todolist += 1;
        list.textContent = 'To do list (' + count_todolist + ')';
        todolist.append(div);
        textInput.value = '';
        console.log(todolist.textContent);
        console.log('completed');
    }
});

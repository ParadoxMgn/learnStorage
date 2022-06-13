'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.getElementById('todo');
const todoCompleted = document.getElementById('completed');
const todoData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];

const createObj = task => {
  const newObj = {
    'name': task,
    'complete': false,
  };

  return newObj;
};

const outputList = () => {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  todoData.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.name}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>`;

    if (!item.complete) {
      todoList.insertAdjacentElement('beforeend', li);
    } else {
      todoCompleted.insertAdjacentElement('beforeend', li);
    }

    li.querySelector('.todo-complete').addEventListener('click', () => {
      item.complete = item.complete ? false : true;
      outputList();
    });
    li.querySelector('.todo-remove').addEventListener('click', () => {
      todoData.splice(todoData.indexOf(item), 1);
      if (todoData.length === 0) {
        localStorage.clear();
      }
      outputList();
    });
  });

  if (todoData.length > 0) {
    localStorage.setItem('user', JSON.stringify(todoData));
  }
};

todoControl.addEventListener('submit', e => {
  e.preventDefault();

  if (headerInput.value.trim() !== '') {
    todoData.push(createObj(headerInput.value));
  }

  headerInput.value = '';

  outputList();
});

if (localStorage.getItem('user')) {
  outputList();
}


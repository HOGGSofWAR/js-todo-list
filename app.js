const todoInput = document.querySelector('.todolist__input');
const todoButton = document.querySelector('.todolist__button');
const todoList = document.querySelector('.todolist__list');
const filterOption = document.querySelector('#filter-todo');
const errorMessageOutput = document.querySelector('#error-message');

document.addEventListener('DOMContentLoaded', initialiseTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', todoAction);
filterOption.addEventListener('click', filterTodo);
todoInput.addEventListener('input', clearErrorMessage);

function clearErrorMessage() {
  errorMessageOutput.innerHTML = '';
}

function generateId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

function resetInput() {
    todoInput.value = '';
}

function addTodo(e) {
    e.preventDefault();
  
    if (todoInput.value.length === 0) {
      errorMessageOutput.innerHTML = "Error: You cannot submit a blank todo. Please type in a task such as 'wash the dishes'";
      return;
    }

    const id = generateId();
    const value = todoInput.value;
    const state = 'default';

    createTodoElement(value, state, id);
    saveTodo(value, state, id);

    resetInput();
}

function createTodoElement(value, state, id) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    if (state === 'completed') {
        todoDiv.classList.add('completed');
    }

    todoDiv.id = id;

    const newTodo = document.createElement('li');
    newTodo.innerText = value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

function todoAction(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        deleteTodo(todo);
        
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;

        if (!todo.classList.contains('completed')) {
            todo.classList.add('completed');
            updateTodoState(todo, 'completed');
        } else {
            todo.classList.remove('completed');
            updateTodoState(todo, 'default');
        }
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'incomplete':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'default':
                todo.style.display = 'flex';
        }
    });
}

function initialiseTodos() {
    let todos = getTodos();

    todos.forEach(({text, state, id}) => {
        createTodoElement(text, state, id);
    });
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

function saveTodo(todo, state, id) {
    let todos = getTodos();

    todos.push({'text': todo, 'state': state, 'id': id});

    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoState(todo, state) {
    const id = todo.id;

    let todos = getTodos();

    const index = getTodoIndex(todos, id);

    todos[index].state = state;

    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(todo) {
    const id = todo.id;

    let todos = getTodos();

    const index = getTodoIndex(todos, id);

    todos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodoIndex(todos, id) {
    return todos.findIndex(todo => {
        if(todo.id === id) {
            return true;
        }
    })
}


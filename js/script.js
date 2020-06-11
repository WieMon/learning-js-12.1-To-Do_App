const toDoList = [];

const inputSearch = document.querySelector('.inputSearch');
const inputAdd = document.querySelector('.inputAdd');
const btnSearch = document.querySelector('.btnSearch');
const btnAdd = document.querySelector('.btnAdd');
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const numberTasks = document.querySelector('h2 span');
const listTasks = document.getElementsByClassName('task');

const addTask = (e) => {
  e.preventDefault();
  const titleTask = inputAdd.value;
  if (titleTask === '') return;
  const task = document.createElement('li');
  task.className = 'task';
  task.innerHTML = `${titleTask} <button>Delete</button>`;
  toDoList.push(task);
  renderList();
  ul.appendChild(task);
  inputAdd.value = '';
  numberTasks.textContent = listTasks.length;
  task.querySelector('button').addEventListener('click', removeTask);
  // console.log('titleTask: ', titleTask);
  // console.log('task: ', task);
}  

const removeTask = (e) => {
  const index = e.target.parentNode.dataset.key;
  toDoList.splice(index, 1);
  numberTasks.textContent = listTasks.length; 
  renderList();
}

const renderList = () => {
  ul.textContent = "";
  toDoList.forEach((toDoElement, key) => {
   toDoElement.dataset.key = key;
   ul.appendChild(toDoElement);
  })
 }

const searchTask = (e) => {
  const searchText = inputSearch.value.toLowerCase();
  console.log('searchText: ', searchText);
  const test = toDoList.filter(toDoElement => 
              toDoElement.textContent.toLowerCase().includes(searchText));
  console.log('test: ', test)
  ul.textContent = '';
  test.forEach(toDoElement => ul.appendChild(toDoElement));
  }

btnSearch.addEventListener('click', searchTask);
form.addEventListener('submit', addTask);
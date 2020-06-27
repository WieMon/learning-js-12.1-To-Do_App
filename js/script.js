let toDoList = [//add as an example a few tasks
  // {
  //   key: 0,
  //   titleTask: 'Task 1',
  //   commentTask: 'Lorem ipsum 1',
  //   dateTask: '06.08.2020'
  // },
  // {
  //   key: 1,
  //   titleTask: 'Task 2',
  //   commentTask: 'Lorem ipsum 2',
  //   dateTask: '08.09.2020'
  // }
]; 
const inputSearch = document.querySelector('.inputSearch');
const inputAdd = document.querySelector('.inputAdd');
const btnSearch = document.querySelector('.btnSearch');
const btnAdd = document.querySelector('.btnAdd');
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const numberTasks = document.querySelector('h2 span');
const listTasks = document.getElementsByClassName('task');
const inputDate = document.querySelector('.inputDate');
const inputComments = document.querySelector('.inputComments');

const addTask = (e) => {
  e.preventDefault();
  const titleTask = inputAdd.value;
  const minDate = new Date().toISOString().slice(0, 10);
  const dateTask = inputDate.value;
  const commentTask = inputComments.value;

  if (titleTask === '' || dateTask === '') { //add cleaning input after alerts
    alert ('Invalid input - missing task name or date.'); 
    clearInputs();
    return
  }
  if (dateTask < minDate) {
    alert ('Invalid date - you cannot select the past date.');
    clearInputs();
    return
  }
  const task = document.createElement('li');
  task.className = 'task';
  task.innerHTML = `<strong>Task:</strong> ${toDoList.titleTask} '||' ${titleTask} <br><strong>Comments:</strong> ${commentTask}<br><strong>Due date:</strong> ${dateTask} <button>Delete</button>`;
  ul.appendChild(task);
  if(dateTask === minDate) {
    task.style.color = 'red';
  }
  toDoList.push(task);
  renderList();
  clearInputs();
  numberTasks.textContent = listTasks.length;
  task.querySelector('button').addEventListener('click', removeTask);
}

const clearInputs = () => {
  inputAdd.value = '';
  inputDate.value = '';
  inputComments.value = '';
}

const removeTask = (e) => {
  e.target.parentNode.remove();
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
  toDoList = toDoList.filter(toDoElement => 
              toDoElement.textContent.toLowerCase().includes(searchText));
  ul.textContent = '';
  toDoList.forEach(toDoElement => ul.appendChild(toDoElement));
  }

btnSearch.addEventListener('click', searchTask);
form.addEventListener('submit', addTask);
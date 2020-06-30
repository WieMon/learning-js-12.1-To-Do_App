let toDoList = []; 


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

  if (titleTask === '' || dateTask === '') { 
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
  task.innerHTML = `<strong>Task:</strong> ${titleTask} <br><strong>Comments:</strong> ${commentTask}<br><strong>Due date:</strong> ${dateTask} <button>Delete</button>`;
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
console.log('e.target: ', e.target);
console.log('e.target.parentNode: ', e.target.parentNode);
  // const index = e.target.parentNode.dataset.key; //dataset.key
  // console.log('indexFromRemoveTask: ', index); //dataset.key
  // const index = e.target.parentNode.id; //id
  // console.log('indexFromRemoveTask: ', index); //id
  const index = e.target.parentNode.id; //id
  //console.log('indexFromRemoveTask: ', index); //id

  toDoList.splice(index, 1);
  numberTasks.textContent = listTasks.length; 
  renderList();
}

//Version 1: dataset.key, key
// const renderList = () => {
//   ul.textContent = "";
//   toDoList.forEach((toDoElement, key) => {
//   toDoElement.dataset.key = key;//key vs id
//   console.log('toDoElement.dataset.key: ', toDoElement.dataset.key);
//   console.log('key: ', key);
//    ul.appendChild(toDoElement);
//   })
//  }

//Version 2: id, index
//  const renderList = () => {
//   ul.textContent = "";
//   toDoList.forEach((toDoElement, index) => {//key vs id
//    toDoElement.id = index;//key vs id
//    console.log('indexFromRenderList: ', index);
//    console.log('toDoElement.idFromRenderList: ', toDoElement.id);
//    ul.appendChild(toDoElement);
//   })
//  }

//Version 3: id, key
const renderList = () => {
  ul.textContent = "";
  toDoList.forEach((toDoElement, key) => {
  toDoElement.id = key;
  //npmconsole.log('toDoElement.id: ', toDoElement.id);
  //console.log('key: ', key);
   ul.appendChild(toDoElement);
  })
}

const searchTask = (e) => {
  const searchText = inputSearch.value.toLowerCase();
  toDoList = toDoList.filter(toDoElement => 
              toDoElement.textContent.toLowerCase().includes(searchText));
  ul.textContent = '';
  toDoList.forEach(toDoElement => ul.appendChild(toDoElement));
  inputSearch.value = '';
  }

btnSearch.addEventListener('click', searchTask);
form.addEventListener('submit', addTask);

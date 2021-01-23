const inputBox = document.querySelector("#task");
const addButton = document.querySelector("#addButton");
const form1 = document.querySelector("form");
const taskList = document.querySelector("ul");
const clearBtn = document.querySelector('#clearBtn');
const filter = document.querySelector('#filter');
document.addEventListener('DOMContentLoaded',getTask);
form1.addEventListener("submit", handleInput);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup',filterTask);
function getTask(){
    let tasks;
    if (localStorage.getItem('tasks')===null) {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'listItems';
        const p = document.createElement('p');
        const text = document.createTextNode(task);
        p.appendChild(text);
        li.appendChild(p);
        const link = document.createElement('a');
        link.className = 'delete';
        link.innerText = 'X';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}
function handleInput(e) {
    if (inputBox.value === '') {
        alert('add task');
    }
    else {
        const li = document.createElement('li');
        li.className = 'listItems';
        const p = document.createElement('p');
        const text = document.createTextNode(inputBox.value);
        p.appendChild(text);
        li.appendChild(p);
        const link = document.createElement('a');
        link.className = 'delete';
        link.innerText = 'X';
        li.appendChild(link);
        taskList.appendChild(li);
        addTaskToLocalStorage(inputBox.value);
        inputBox.value = '';
        
    }
    e.preventDefault();
}
function addTaskToLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks')===null) {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function removeTask(e) {
    if (e.target.className === 'delete') {
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        removeTaskFromLocalStorage(e.target.parentElement);
    }
}
function removeTaskFromLocalStorage(taskList){
    let tasks;
    if (localStorage.getItem('tasks')===null) {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if (task===taskList.firstChild.textContent) {
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearTask(e){
    
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    localStorage.clear();
}
}
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.listItems').forEach(function(task){
        const item = task.firstChild.textContent.toLowerCase();
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}
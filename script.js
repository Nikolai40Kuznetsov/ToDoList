let clearDataButton = document.getElementById('clearData')
let inputToList = document.getElementById('input_to_list')
let addButton = document.getElementById('addButton')
let tasksList = document.getElementById('tasks_list')

function addTask() {
    let task = document.createElement('div');
    tasksList.append(task);

    let check = document.createElement('input');
    check.type = 'checkbox';
    task.append(check);

    let taskText = document.createElement('p');
    taskText.textContent = inputToList.value;
    task.append(taskText);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Удалить";
    task.append(deleteButton);

    let editButton = document.createElement('button');
    editButton.textContent = "Редактировать";
    task.append(editButton);

    inputToList.value = '';

    savedTask();
}
addButton.addEventListener('click', addTask);

function changeTask(e){
    if(e.target.tagName === 'INPUT'){
        e.target.parentElement.classList.toggle('checked');
        savedTask()
    } else if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Удалить') {
        e.target.parentElement.remove()
        savedTask()
    } else if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Редактировать') {
        let new_input = document.createElement('input')
        e.target.parentElement.textContent = new_input.value
        new_input.remove()
        savedTask()
    }
}
tasksList.addEventListener('click', changeTask);



function savedTask(){
    localStorage.setItem('data', tasksList.innerHTML);
}
function showTask(){    
    tasksList.innerHTML = localStorage.getItem('data')
}
function clearData() {
    localStorage.clear();
}
clearDataButton.addEventListener('click', clearData)

showTask()


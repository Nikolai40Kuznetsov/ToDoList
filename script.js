let clearDataButton = document.getElementById('clearData')
let inputToList = document.getElementById('input_to_list')
let addButton = document.getElementById('addButton')
let tasksList = document.getElementById('tasks_list')

function addTask()
{
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
function changeTask(e)
{
    if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox')
    {
        e.target.parentElement.classList.toggle('checked');
        savedTask()
    } else if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Удалить')
    {
        e.target.parentElement.remove()
        savedTask()
    } else if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Редактировать') 
    {
        let taskDiv = e.target.parentElement;
        let taskText = taskDiv.querySelector('p');
        let currentText = taskText.textContent;        
        let editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.style.flexGrow = '1';
        editInput.style.margin = '0 10px';
        editInput.style.padding = '5px';
        let saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить';
        taskText.replaceWith(editInput);
        e.target.replaceWith(saveButton);
        editInput.focus();
        saveButton.addEventListener('click', function() 
        {
            let newText = editInput.value.trim();
            if (newText) {
                let newTaskText = document.createElement('p');
                newTaskText.textContent = newText;
                let newEditButton = document.createElement('button');
                newEditButton.textContent = "Редактировать";
                let newDeleteButton = document.createElement('button');
                newDeleteButton.textContent = "Удалить";
                editInput.replaceWith(newTaskText);
                saveButton.replaceWith(newEditButton);
                if (!taskDiv.querySelector('button')) 
                {
                    taskDiv.append(newDeleteButton);
                }                
                savedTask();
            }
        });
        editInput.addEventListener('keypress', function(event) 
        {
            if (event.key === 'Enter') 
            {
                saveButton.click();
            }
        });
    }
}
tasksList.addEventListener('click', changeTask);
function savedTask(){
    localStorage.setItem('data', tasksList.innerHTML);
}
function showTask()
{    
    tasksList.innerHTML = localStorage.getItem('data')
}
function clearData()
{
    localStorage.clear();
}
clearDataButton.addEventListener('click', clearData)
showTask()
//dsefine UI variables

const form  = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listerns funvtion
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //add task
    form.addEventListener('submit', addTask);

    //remove tssks
    taskList.addEventListener('click', removeTask);

    //clear task events
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks
    filter.addEventListener('keyup', filterTasks);

}

//get tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //creater the text node and appeand to the li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove">remove</i>';
        link.style.cursor = 'pointer'

        //appeanding icon to li
        li.appendChild(link);
        //appeand li to ul
        taskList.appendChild(li);

    })
}

//add task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task u fool')
    }

    //create li elements
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //creater the text node and appeand to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove">remove</i>';
    link.style.cursor = 'pointer'

    //appeanding icon to li
    li.appendChild(link);
    //appeand li to ul
    taskList.appendChild(li);

    //store in local storage
    storeToLocal(taskInput.value);

    //clear the input
    taskInput.value = '';

    e.preventDefault();
}


//STORING TASKS
function storeToLocal(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//removing a task
function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
       e.target.parentElement.parentElement.remove();

       //removing from local storage
       removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   } 
}

//remove tasks from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index)=>{
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//clear tasks
    function clearTasks(e){
        if(confirm('you sure nigga')){
            while(taskList.firstChild){ //checks if there is any child
                taskList.removeChild(taskList.firstChild);
            }
        }

        //clear from local storage
        clearFromLocalStorage();
    }

    //clear tasks from ls
    function clearFromLocalStorage(){
        localStorage.clear();
    }



//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task)=>{
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

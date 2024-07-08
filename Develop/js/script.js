// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let currentId = localStorage.getItem('nextId') || 0;
    currentId = parseInt(currentId, 10) +1;
    localStorage.setItem('nextId', currentId);
    return currentId.toString();
}




// Todo: create a function to create a task card
function createTaskCard(task) {
 let taskCard = $('<div>')
 .addClass('card project-card draggable my-3')
 .attr('data-task-id', task.id);
 let cardHeader = $('<div>').addClass('card-header h4').text(task.title);
 let cardBody = $('<div>').addClass('card-body');
 let cardDescription = $('<p>').addClass('card-text').text(task.description);
 let cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
 let cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
 
}

// Create task header section
const taskHeader = document.createElement('h3');

//Delete Button
const deleteButton = document.createElement('button');



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo-card').empty();
    $('#in-progress-card').empty();
    $('#Done-cards').empty();

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        let taskCard = createTaskCard(task);
        if (task.status === 'to-do') {
            $('#todo-card').append(taskCard);
        } else if (task.status === 'in-progress') {
            $('#in-progress-cards').append(taskCard);
        } else if (task.status === 'done') {
            $('#done-cards').append(taskCard);
        }
    });

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: 'clone',
    })

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.handleAddTask();

    let taskId = generateTaskId();
    let taskTitle = $('#task-title').val().trim();
    let taskDueDate = $('#datepicker').val().trim();
    let taskDescription = $('#task-description').val().trim();

    let newTask = {
        id: taskId,
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        status: 'to-do'
    };

    let task = JSON.parse(localStorage.getItem('tasks')) || [];
    task.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    $('#formModal').modal('hide');

    renderTaskList();
    $('#taskForm').trigger('reset');
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    let taskId = $(this).attr('data-task-id');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !==taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTaskList();
}

// Datepicker 

$(function() {
    $('#date-input').datepicker({
        defaultDate: selecteDate,
        changeMonth: true,
        ChangeYear: true,
    });
});

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let droppedTask = ui.draggable;
    let taskId = droppedTask.attr('data-task-id');
    let newStatusLaneId = $(this).attr('id');
    updateTaskStatus(taskId, newStatusLaneId);
    droppedTask.appendTo($(this));
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    initializeeDatapicker();
    renderTaskList();

    $('#taskForm').on('submit', handleAddTask);

    $('.lane').droppable({
        drop:handleDropEvent,
        hoverClass: 'hovered'
    });

    async function getData() {
        const url = "https://example.org/products.json";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.error(error.message);
        }
      }
      
    });
$(document).ready(readyNow);

function readyNow() {
    getTasks();
    $('#addTask').on('click', addTask);
    $('.tableContainer').on('click', '.completeButton', completeTask);
    $('.tableContainer').on('click', '.deleteButton', deleteTask)
}

function getTasks() {
    // ajax request to grab tasks from database
    $.ajax({
        url: '/task',
        type: 'GET'
    }).then(function (response) {
        printTasks(response);
    }).catch(function (error) {
        console.log('error in GET req', error);
    })
}

function printTasks(tasks) {
    // append tasks to dOM
    $('#tableBody').empty();
    for (let i = 0; i < tasks.length; i++) {
        let status;
        if (tasks[i].is_completed == true) {
            status = 'Completed';
        }
        else if (tasks[i].is_completed == false) {
            status = 'Incomplete';
        }
        let row = $('<tr></tr>');
            row.append(`<td>${tasks[i].task}</td>`);
            row.append(`<td>${status}</td>`);
            row.append(`<td><button class="completeButton">Complete</button>`);
            row.append(`<td><button class="deleteButton">Delete</button>`);
            $('#tableBody').append(row);
    }
}

function addTask() {
    let taskToSend = {
        task: $('#taskInput').val(),
        is_completed: false
    }

    $.ajax({
        url: '/task',
        type: 'POST',
        data: taskToSend
    }).then( function(response) {
        getTasks();
    }).catch( function(error) {
        console.log('error in POST', error);
    })
}

function completeTask() {
    
}

function deleteTask() {

}
$(document).ready(readyNow);

function readyNow() {
    getTasks();
    $('#addTask').on('click', addTask);
    $('.tableContainer').on('click', '.completeButton', completeTask);
    $('.tableContainer').on('click', '.revertButton', revertTask);
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
    $('#codingTableBody').empty();
    $('#homeLifeTableBody').empty();
    $('#randomTableBody').empty();
    for (let i = 0; i < tasks.length; i++) {
        let row;
        if (tasks[i].is_completed == 'true') {
            row = $('<tr style="background-color:rgba(106, 255, 141, 0.851)"></tr>');
            row.append(`<td class="task">${tasks[i].task}</td>`);
            row.append(`<td class="status"><img class="check" src="./images/green-check.png" alt="green check mark"></td>`);
            row.append(`<td><button class="revertButton" data-id="${tasks[i].id}">Revert</button>`);
            row.append(`<td><button class="deleteButton" data-id="${tasks[i].id}">Delete</button>`);
        }
        else if (tasks[i].is_completed == 'false') {
            row = $('<tr></tr>');
            row.append(`<td class="task">${tasks[i].task}</td>`);
            row.append(`<td class="status"><img class="red-x" src="./images/red-x.png" alt="red x mark"></td>`);
            row.append(`<td><button class="completeButton" data-id="${tasks[i].id}">Complete</button>`);
            row.append(`<td><button class="deleteButton" data-id="${tasks[i].id}">Delete</button>`);
        }
        if (tasks[i].category == 'coding') {
            $('#codingTableBody').append(row);
        }
        else if (tasks[i].category == 'home life') {
            $('#homeLifeTableBody').append(row);
        }
        else if (tasks[i].category == 'random') {
            $('#randomTableBody').append(row);
        }
    }
}

function addTask() {
    let taskToSend = {
        task: $('#taskInput').val(),
        is_completed: 'false',
        category: $('#taskCategory').val()
    }

    $.ajax({
        url: '/task',
        type: 'POST',
        data: taskToSend
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log('error in POST', error);
    })
}

function completeTask() {
    // grab task id
    const id = $(this).data('id')
    // send put req to server to update "is_completed" to true
    $.ajax({
        url: `/task/complete/${id}`,
        type: 'PUT'
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log('error in PUT', error);
    })
    // set background color to green
    // change button class to revert
    // change button text to revert
    // .then rerun getTasks()
}

function revertTask() {
    // grab task id
    const id = $(this).data('id')

    // send put req to server to update "is_completed" to false
    $.ajax({
        url: `/task/incomplete/${id}`,
        type: 'PUT'
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log('error in PUT', error);
    })
    // set background color to gray
    // change button class to complete
    // change button text to complete
    // .then rerun getTasks()
}

function deleteTask() {
    // grab task id
    let taskId = $(this).data('id')
    // send delete req to server to delete row with task id
    $.ajax({
        url: `/task/${taskId}`,
        type: 'DELETE'
    }).then(function () {
        getTasks();
    }).catch(function (err) {
        console.log('error in DELETE route', error);
    })
}
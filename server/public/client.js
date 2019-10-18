$(document).ready(readyNow);

function readyNow() {
    getTasks();
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
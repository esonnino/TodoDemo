document.getElementById('newTaskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        var taskText = document.getElementById('newTaskInput').value;
        if (taskText.trim() !== '') {
            addTask(taskText);
        }
    }
});

var todos = {
    today: [],
    week: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    }
};

function addTask(taskText) {
    var selectedMenu = document.querySelector('.menu-item.selected').id;
    var today = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

    if (selectedMenu === "menu-today") {
        todos.today.push(taskText);
    } else if (selectedMenu === "menu-this-week") {
        todos.week[today].push(taskText);
    }

    createTaskElement(taskText);
    document.getElementById('newTaskInput').value = '';
}

function createTaskElement(taskText) {
    var li = document.createElement('li');
    li.className = 'todoItem';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    });

    var text = document.createElement('span');
    text.textContent = taskText;
    text.contentEditable = "false";

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    document.getElementById('todoList').appendChild(li);
}

function switchList(menuId) {
    var ul = document.getElementById('todoList');
    ul.innerHTML = "";

    switch(menuId) {
        case "menu-today":
            for (let todo of todos.today) {
                createTaskElement(todo);
            }
            break;
        case "menu-this-week":
            for (let day in todos.week) {
                for (let todo of todos.week[day]) {
                    createTaskElement(todo);
                }
            }
            break;
        default:
            break;
    }
}

var menuItems = document.getElementsByClassName('menu-item');
for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function() {
        for (var j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('selected');
        }
        this.classList.add('selected');
        switchList(this.id);
    });
}

window.onload = function() {
    var today = new Date();
    var date = today.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('dateToday').innerText = date;
    document.getElementById('menu-today').click();
};

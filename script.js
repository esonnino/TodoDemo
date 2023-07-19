document.getElementById('newTaskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        var taskText = document.getElementById('newTaskInput').value;
        if (taskText.trim() !== '') {
            addTask(taskText);
        }
    }
});

function addTask(taskText) {
    var li = document.createElement('li');
    li.className = 'todoItem';
    li.addEventListener('click', function(e) {
        if (e.target !== deleteBtn && e.target !== text) {
            checkbox.click();
        }
    });

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
    text.contentEditable = "true";
    text.placeholder = "Enter task text here...";
    text.addEventListener('dblclick', function(e) {
        e.stopPropagation();
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-button';
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    document.getElementById('todoList').appendChild(li);
    document.getElementById('newTaskInput').value = '';
}

var menuItems = document.getElementsByClassName('menu-item');
for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function() {
        for (var j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('selected');
        }
        this.classList.add('selected');
    });
}

window.onload = function() {
    var today = new Date();
    var date = today.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('dateToday').innerText = date;
};

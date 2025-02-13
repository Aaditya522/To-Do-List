let text = document.getElementById('text');
let btn = document.getElementById('btn');
let mylist = document.getElementById('ul');

function saveToLocalStorage() {
    let tasks = [];
    mylist.querySelectorAll('.li').forEach(li => {
        let task = {
            text: li.querySelector('.todo').innerText,
            checked: li.querySelector('.check').checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            createToDo(task.text, task.checked);
        });
    }
}

function createToDo(text, checked = false) {
    let userinput = text || document.getElementById('text').value;
    let li = document.createElement('li');
    let todo = document.createElement('p');
    let dlt = document.createElement('div');
    let edit = document.createElement('div');
    let check = document.createElement('input');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');

    check.type = "checkbox";
    check.checked = checked;

    todo.innerText = userinput;
    dlt.innerText = "🗑";
    edit.innerText = "📝";
    li.classList.add("li");
    div1.classList.add("div1");
    div2.classList.add("div2");
    todo.classList.add("todo");
    dlt.classList.add("dlt");
    edit.classList.add("dlt");
    check.classList.add("check");

    mylist.appendChild(li);
    li.appendChild(div1);
    li.appendChild(div2);
    div1.appendChild(check);
    div1.appendChild(todo);
    div2.appendChild(edit);
    div2.appendChild(dlt);

    document.getElementById('text').value = "";

    dlt.addEventListener('click', function() {
        li.remove();
        saveToLocalStorage();
    });

    check.addEventListener('change', function() {
        if (check.checked) {
            li.style.background = 'grey';
            todo.style.textDecoration = "line-through";
            li.style.boxShadow = "inset 2px 0px 6px 2px black";
        } else {
            li.style.background = 'none';
            todo.style.textDecoration = "none";
            li.style.boxShadow = "none";
        }
        saveToLocalStorage();
    });

    edit.addEventListener('click', function() {
        let editor = document.createElement('input');
        let ok = document.createElement('button');
        editor.type = "text";
        editor.classList.add("editor");
        ok.classList.add("btn");
        ok.innerText = "✔";
        mylist.appendChild(editor);
        mylist.appendChild(ok);
        editor.value = todo.innerText;

        ok.addEventListener('click', function() {
            todo.innerText = editor.value.trim();
            editor.remove();
            ok.remove();
            saveToLocalStorage();
        });
    });

    saveToLocalStorage();
}

btn.addEventListener('click', function() {
    if (document.getElementById('text').value.trim() !== "" && document.getElementById('text').value.length <= 30) {
        createToDo();
    } else if (document.getElementById('text').value.length > 30) {
        alert("Character Limit Exceeded");
    } else {
        alert("Cannot create Empty Task");
    }
});

window.addEventListener('load', loadFromLocalStorage);

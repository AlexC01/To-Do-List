const form = document.getElementById('formNew');
const form_2 = document.getElementById('form_2');
const description = document.getElementById('description');
const todos_list = document.querySelector('.listTodos');
const footercard = document.getElementById('footer');
const items_left = document.querySelector('.items_left');
const labels_filter = document.querySelectorAll('.labels_filter');
const light = document.getElementById('light');
const dark = document.getElementById('dark');

const change_theme = () =>{
    if(localStorage.getItem('theme') == 'dark'){
        document.documentElement.classList.add('dark');
        dark.classList.remove('block');
        dark.classList.add('hidden');
        light.classList.add('block');
        light.classList.remove('hidden');
        document.body.classList.remove('light_bg');
        document.body.classList.add('dark_bg');
    }else{
        document.documentElement.classList.remove('dark');
        document.body.classList.add('light_bg');
        document.body.classList.remove('dark_bg');
    }
}

const theme = () => {
    if(localStorage.getItem('theme') == 'dark'){
        localStorage.setItem('theme', 'light');
        light.classList.remove('block');
        light.classList.add('hidden');
        dark.classList.add('block');
        dark.classList.remove('hidden');
        change_theme();
    }else{
        localStorage.setItem('theme', 'dark');
        dark.classList.remove('block');
        dark.classList.add('hidden');
        light.classList.add('block');
        light.classList.remove('hidden');
        change_theme();
    }
};

window.onload = function(){
    if(localStorage.getItem('theme')){
        change_theme();
        todosView();
    }else{
        localStorage.setItem('theme', 'light');
        todosView();
    }
}

const filterTodos = filtro => {
    let hijos = todos_list.children;
    for (let i = 0; i < hijos.length; i++){
        switch(filtro){
            case "All":
                hijos[i].style.display = 'grid';
                break;
            case "Completed":
                if(hijos[i].classList.contains('completed')){
                    hijos[i].style.display = 'grid';
                }else{
                    hijos[i].style.display = 'none';
                }
                break;
            case "Active":
                if(!hijos[i].classList.contains('completed')){
                    hijos[i].style.display = 'grid';
                }else{
                    hijos[i].style.display = 'none';
                }
        }
    }
}

const check_class = () => {
    labels_filter.forEach(elem => {
        if(elem.classList.contains('label_active')){
            elem.classList.remove('label_active');
            elem.classList.add('label_not_active');
        }
    })
}

labels_filter.forEach(elem => {
    elem.addEventListener('click',e => {
        check_class();
        elem.classList.remove('label_not_active');
        elem.classList.add('label_active');
        filterTodos(elem.textContent)
    })
})

const checkTodos = () => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    if(todos.length == 0){
        localStorage.removeItem('todos');
        footercard.classList.add('hidden');
        footercard.classList.remove('grid');
    }
}

const clear_completed = () => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todos_limpios = todos.filter(elem => elem.status == "Active");
    localStorage.setItem('todos', JSON.stringify(todos_limpios))
    todosView();
    checkTodos();
}

const deleteTodo = id => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(id, 1);
    localStorage.setItem('todos', JSON.stringify(todos))
    todosView();
    checkTodos();
}

const changeStatus = id => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    if (todos[id].status == 'Active'){
        todos[id].status = 'Completed';
    }else{
        todos[id].status = 'Active';
    }
    localStorage.setItem('todos', JSON.stringify(todos))
    todosView();
}

const todosView = () => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let cont = 0;
    if(todos){
        footercard.classList.remove('hidden');
        footercard.classList.add('grid');
        todos_list.innerHTML = "";
        for (let i in todos){
            if(todos[i].status == 'Active'){
                cont++;
                todos_list.innerHTML += 
                `
                <div class="todos grid grid-cols-4 p-5 border-b-2 dark:border-gray-500">
                    <div class="flex justify-items-start col-span-3">
                        <button onclick="changeStatus(${i})" class="butons"></button>
                        <p class="ml-6 text-lg w-full dark:text-verylight_grayishblue">${todos[i].description}</p>
                    </div>
                    <div class="equis hidden">
                        <button onclick="deleteTodo(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></button>
                    </div>
                </div>
                `
            }else{
                todos_list.innerHTML += 
                `
                <div class="todos grid grid-cols-4 p-5 border-b-2 completed dark:border-gray-500">
                    <div class="flex justify-items-start col-span-3">
                        <button class="butons_completed" onclick="changeStatus(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" style="margin-left: 9px;"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></button>
                        <p class="ml-6 text-lg w-full line-through text-light_grayishblue dark:text-dark_grayish_blue">${todos[i].description}</p>
                    </div>
                    <div class="equis hidden">
                        <button onclick="deleteTodo(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></button>
                    </div>
                </div>
                `
            }
        }
        items_left.textContent = `${cont} items left`;
    }
}

const resetclasses = () => {
    labels_filter.forEach(elem => {
        if(elem.textContent == "All"){
            elem.classList.add('label_active');
            elem.classList.remove('label_not_active');
        }else{
            elem.classList.remove('label_active');
            elem.classList.add('label_not_active');
        }
    })
}

const addTodo = e => {
    if (description.value != ""){
        form_2.reset();
        resetclasses();
        const todo = {
            description: description.value,
            status: 'Active'
        }
        if(localStorage.getItem('todos')){
          let todos = JSON.parse(localStorage.getItem('todos'));
          todos.push(todo);
          localStorage.setItem('todos', JSON.stringify(todos));
          form.reset();
        }else{
            let todos = [];
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            form.reset();
        }
        todosView();
    }
    e.preventDefault();
}

form.addEventListener('submit', addTodo);
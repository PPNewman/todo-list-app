let $todoInput; // user wpisuje treść zadania
let $alertInfo; //info o braku zadań / konieczności dodania zadania
let $btnAdd; // btn dodający zadanie z inputu do listy
let $ulList; // lista zadań / tag <ul></ul>
let $newTask; // nowo utworzone zadanie w li


const main = () => {
    prepareDOMelements();
    prepareDOMevents();
};
// prepareDOMelements pobiera elementy
const prepareDOMelements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $btnAdd = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
};

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        creatToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';
    };
};

const creatToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const btnComplete = document.createElement('button');
    btnComplete.classList.add('complete');
    btnComplete.innerHTML = '<i class="fas fa-check"></i>';

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('complete');
    btnEdit.innerText = 'EDIT';

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(btnComplete);
    toolsPanel.appendChild(btnEdit);
    toolsPanel.appendChild(btnDelete);
};


// prepareDOMevents nadaje nasłuchiwanie
const prepareDOMevents = () => {
    $btnAdd.addEventListener('click', addNewTask);

};


document.addEventListener('DOMContentLoaded', main);
// Nasłuch gdy załaduje się całe drzewo DOM (strona)to wtedy ma odpalić funkcję main
let $todoInput; // user wpisuje treść zadania
let $alertInfo; //info o braku zadań / konieczności dodania zadania
let $btnAdd; // btn dodający zadanie z inputu do listy
let $ulList; // lista zadań / tag <ul></ul>
let $newTask; // nowo utworzone zadanie w li
let $popup; //pobrany popup
let $popupInfo; //alert w popupie jak się doda pusty tekst
let $editetTodo; //edytowany Todo
let $popupInput; // teskst wpisny w input popupa
let $btnAddPopup; // btn "zatwierdź" w popupie
let $btnCloseTodo; //btn do zamykania popupa

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
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $btnAddPopup = document.querySelector('.accept');
    $btnCloseTodo = document.querySelector('.cancel');
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
    $ulList.addEventListener('click', checkClick);
    $btnCloseTodo.addEventListener('click', closePopup);
};

const checkClick = (event) => {
    if (event.target.closest('button').classList.contains('complete')) {
        event.target.closest('li').classList.toggle('completed');
        event.target.closest('button').classList.toggle('completed');
    } else if (event.target.closest('button').className === 'edit') {
        editTask();
    } else if (event.target.closest('button').className === 'delete') {

    }
};

const editTask = () => {
    $popup.style.display = 'flex';
};

const closePopup = () => {
    $popup.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', main);
// Nasłuch gdy załaduje się całe drzewo DOM (strona)to wtedy ma odpalić funkcję main
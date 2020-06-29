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
let $idNumber = 0;
let $allTasks;

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
    $allTasks = $ulList.getElementsByTagName('li');
};

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        creatToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';
    };
};

// sprawdzam czy eventkeyCode jest = 13 (czy wciśnięto 'enter')
const checkEnter = () => {
    if (event.keyCode === 13) {
        addNewTask();
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
    btnEdit.classList.add('edit');
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
    $btnAddPopup.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', checkEnter);
    $popupInput.addEventListener('keyup', popupEnterCheck);
    document.addEventListener('keyup', popupEscapeCheck);
};

const checkClick = (event) => {
    if (event.target.closest('button').classList.contains('complete')) {
        event.target.closest('li').classList.toggle('completed');
        event.target.closest('button').classList.toggle('completed');
    } else if (event.target.closest('button').className === 'edit') {
        editTask(event);
    } else if (event.target.closest('button').className === 'delete') {
        deleteTask(event);
    }
};

//edycja zadania
const editTask = (event) => {
    const oldTodo = event.target.closest('li').id;
    $editetTodo = document.getElementById(oldTodo);
    $popupInput.value = $editetTodo.firstChild.textContent;
    $popup.style.display = 'flex';
};

// sprawdzanie zmian edycji zadania
const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editetTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Nie podałeś treści zadania!';
    };
};

// sprawdzanie naciśnięcia 'enter' i zatwierdzenie zmian w popupie
const popupEnterCheck = () => {
    if (event.keyCode === 13) {
        changeTodo();
    };
};

//zamykanie popupa
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
};

// sprawdzenie naciśnięcia 'escape' i zamknięcie popup bez zmian
const popupEscapeCheck = () => {
    if (event.keyCode === 27) {
        closePopup();
    };
};

//usuwanie zadania
const deleteTask = (event) => {
    const deleteTodo = event.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.'
    };
};

document.addEventListener('DOMContentLoaded', main);
// Nasłuch gdy załaduje się całe drzewo DOM (strona)to wtedy ma odpalić funkcję main
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const listContainer = document.querySelector('#list-container');

let tasks = [];
let filters = { showCompleted: false, sortType: 'time-desc' }
let showModal = false;

const saveTasksToStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks));
const saveFiltersToStorage = () => localStorage.setItem('filters', JSON.stringify(filters));

const errorModal = (message) => {
    const modal = document.createElement('dialog');
    modal.classList.add('modal');

    const errorElement = document.createElement('p');
    errorElement.textContent = message;

    const closeModal = document.createElement('button');
    closeModal.textContent = "Skjønner";
    modal.append(errorElement, closeModal);
    document.body.append(modal);

    modal.showModal();
    modal.addEventListener('click', () => {
        modal.remove();
    })
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(taskForm);
    const userInput = formData.get('task-input');
    taskInput.value = "";

    if (!userInput) {
        return errorModal('Todo tekst kan ikke være tom!');
    };

    tasks.push({
        timestamp: new Date(),
        description: userInput,
        completed: false
    });
    saveTasksToStorage();
    renderPage();
})

const completeTaskInput = (task) => {
    const inputElement = document.createElement('input');
    inputElement.type = "checkbox";
    inputElement.checked = task.completed;

    inputElement.addEventListener('change', (e) => {
        task.completed = e.target.checked;
        saveTasksToStorage(tasks);
        renderPage(tasks);
    });
    return inputElement;
};

const deleteTaskButton = (task) => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('delete-button');
    buttonElement.textContent = "Slett";

    buttonElement.addEventListener('click', () => {
        const taskIndex = tasks.indexOf(task);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
        }

        saveTasksToStorage(tasks);
        renderPage(tasks);
    });

    return buttonElement;
}

const editTaskButton = (task, descriptionElement) => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('edit-button');
    buttonElement.textContent = "Endre";

    buttonElement.addEventListener('click', () => {
        task.description = descriptionElement.value;
        descriptionElement.readOnly = !descriptionElement.readOnly;
        buttonElement.textContent = descriptionElement.readOnly ? "Endre" : "Lagre";
        if (descriptionElement.readOnly) {
            descriptionElement.focus();
        };
        saveTasksToStorage(tasks);
    })

    return buttonElement;
}

const sortArray = (a, b) => {
    if (filters.sortType === 'time-asc') {
        return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (filters.sortType === 'time-desc') {
        return new Date(a.timestamp) - new Date(b.timestamp); 
    } else if (filters.sortType === 'alpha-asc') {
        return b.description.localeCompare(a.description);
    } else if (filters.sortType === 'alpha-desc') {
        return a.description.localeCompare(b.description);
    }
    return 0;
};

const filterArray = (taskArr) => {
    return taskArr
        .filter(task => filters.showCompleted || !task.completed)
        .sort(sortArray);
};

const buildPage = (taskArr) => {
    listContainer.replaceChildren();
    taskArr.forEach(task => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        task.completed ? taskContainer.classList.add('completed') : taskContainer.classList.remove('completed');

        const timestampElement = document.createElement('p');
        timestampElement.classList.add('datetime');
        timestampElement.textContent = task.timestamp.toLocaleString('en-UK');

        const descriptionElement = document.createElement('input');
        descriptionElement.classList.add('description');
        descriptionElement.readOnly = true;
        descriptionElement.value = task.description;

        const completeInput = completeTaskInput(task);
        const deleteButton = deleteTaskButton(task);
        const editButton = editTaskButton(task, descriptionElement);
        taskContainer.append(
            timestampElement,
            descriptionElement,
            completeInput,
            deleteButton,
            editButton
        );
        listContainer.prepend(taskContainer);
    })
}

const renderPage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if ( storedTasks ) {
        tasks = JSON.parse(storedTasks);
    }
    
    const storedFilters = localStorage.getItem('filters');
    if ( storedFilters ) {
        filters = JSON.parse(storedFilters);
    };

    if ( tasks.length < 1 ) {
        localStorage.removeItem('tasks');
        localStorage.remvoeItem('filters');
    };
    buildPage(filterArray(tasks));
}

const toggleShowCompleted = document.querySelector("#show-completed")
toggleShowCompleted.addEventListener('change', (e) => {
    filters.showCompleted = e.target.checked;
    saveFiltersToStorage(filters);
    renderPage(tasks);
});

const setSortBy = document.querySelector("#sort-by")
setSortBy.addEventListener('change', (e) => {
    const selection = e.target.value.substring(
        e.target.selectionStart,
        e.target.selectionEnd,
    );
    filters.sortType = selection;
    saveFiltersToStorage(filters);
    renderPage(tasks);
})

renderPage()

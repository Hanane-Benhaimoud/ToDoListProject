let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const taskStats = document.getElementById('taskStats');

// Ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Veuillez entrer une tâche!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks();
    updateStats();
}

// Supprimer une tâche
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateStats();
}

// Basculer le statut d'une tâche
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
    updateStats();
}

// Filtrer les tâches
function filterTasks() {
    if (currentFilter === 'all') {
        return tasks;
    } else if (currentFilter === 'active') {
        return tasks.filter(task => !task.completed);
    } else {
        return tasks.filter(task => task.completed);
    }
}

// Afficher les tâches
function renderTasks() {
    const filteredTasks = filterTasks();
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">Aucune tâche à afficher</div>';
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Supprimer</button>
        </li>
    `).join('');
}
// Initialisation
renderTasks();
updateStats();
window.addEventListener("load", function () {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    clearAll();
    for (let i = 0; i < storedTasks.length; i++) {
      addTask(storedTasks[i]);
    }
  }
});

// Récupère la liste
const taskList = document.getElementById("taskList");
// utilisation d'un tasckId pour les taches
let taskIdCounter = 0;

// Fonction qui vérifie la longueur du texte saisi par l'utilisateur
function txtVerif(taskText) {
  if (taskText.length > 3) {
    return true;
  } else {
    return false;
  }
}
// Fonction qui ajoute une tâche à la liste
function addTask(task) {
  const taskId = "task_" + taskIdCounter;
  taskIdCounter++;

  const newTask = document.createElement("li");
  newTask.id = taskId;
  newTask.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "mb-2",
    "p-2",
    "bg-gray-100",
    "rounded-lg",
    "text-xl"
  );

  // Crée un nouvel élément <input>
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add(
    "form-checkbox",
    "h-5",
    "w-5",
    "text-indigo-600",
    "transition",
    "duration-150",
    "ease-in-out"
  );
  checkbox.addEventListener("click", toggleTask);

  // Ajouter la case checkbox à newTask
  newTask.appendChild(checkbox);
  newTask.appendChild(document.createTextNode(task));

  // Crée un bouton Supprimer et l'ajoute à l'élément <li>
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Supprimer";
  deleteButton.classList.add(
    "ml-4",
    "inline-flex",
    "justify-center",
    "py-2",
    "px-4",
    "border",
    "border-transparent",
    "shadow-sm",
    "text-sm",
    "leading-5",
    "font-medium",
    "rounded-md",
    "text-white",
    "bg-red-600",
    "hover:bg-red-500",
    "focus:outline-none",
    "focus:border-red-700",
    "focus:shadow-outline-red",
    "active:bg-red-700",
    "transition",
    "duration-150",
    "ease-in-out"
  );
  deleteButton.addEventListener("click", deleteTask);
  newTask.appendChild(deleteButton);

  // Ajoute l'élément <li> à la liste des tâches
  taskList.appendChild(newTask);

  //Stocker les tâches dans localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearAll() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}
//Fonction qui supprime une tâche de la liste
function deleteTask() {
  const taskItem = this.parentNode;
  taskList.removeChild(taskItem);
  removeTask(taskItem.id);

  function removeTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}
// Fonction qui coche ou décoche une tâche
function toggleTask() {
  const taskItem = this.parentNode;
  if (this.checked) {
    taskItem.classList.add("checked");
  } else {
    taskItem.classList.remove("checked");
  }
}
function clearLocalStorage() {
  localStorage.removeItem("tasks");
}

document
  .getElementById("clearTaskButton")
  .addEventListener("click", function (e) {
    e.preventDefault();
    clearAll();
    clearLocalStorage();
  });

document
  .getElementById("clearTaskButton")
  .addEventListener("click", function (e) {
    e.preventDefault();
    clearAll();
  });
// Écouteur d'événement pour le formulaire
document
  .getElementById("addTaskButton")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le formulaire de recharger la page

    // Récupère le texte saisi par l'utilisateur
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    // Ajoute la nouvelle tâche à la liste
    if (txtVerif(taskText)) {
      addTask(taskText);
      const notification = document.getElementById("notification");
      notification.remove();

    } else {
      const notification = document.getElementById("notification");
      notification.innerHTML =
        "Veuillez saisir une tâche d'au moins 3 charactères ";
      notification.classList.add(
        "bg-red-100",
        "border-red-400",
        "text-red-700",
        "border",
        "px-4",
        "py-3",
        "rounded",
        "relative",
        "mb-4",
        "max-w-80",
        "mx-auto"
      );
    }
    // Efface le champ de texte
    taskInput.value = "";
  });

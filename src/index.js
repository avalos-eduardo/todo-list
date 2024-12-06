import "./style.css";
import {Project} from "./project";
import {initModal, hideModal, showModal} from "./modal";
import {saveProjects, loadProjects} from "./storage";
import {createProjectManager} from "./projectManager";

document.addEventListener('DOMContentLoaded', () => {
    const modal = initModal();
    const projectManager = createProjectManager();
    const titleInput = document.querySelector("#titleInput");
    const submit = document.querySelector("#submit");
    const addTasksBtn = document.querySelector("#add-tasks");
    const { projectsDiv, tasksListed } = projectManager.getElements();

    // Initial setup
    projectManager.refreshProjects();

    // Event Listeners
    submit.addEventListener("click", (event) => {
        event.preventDefault();
        if (titleInput.value) {
            projectManager.addProject(titleInput.value);
            titleInput.value = "";
            hideModal(modal);
        }
    });

    projectsDiv.addEventListener("click", (event) => {
        if (event.target.classList.contains("projects")) {
            const projectIndex = Array.from(projectsDiv.children).indexOf(event.target);
            projectManager.displayTasks(projectIndex);
        }

        if (event.target.classList.contains("fa-xmark")) {
            const projectIndex = Array.from(projectsDiv.children).indexOf(event.target.parentElement);
            projectManager.deleteProject(projectIndex);
        }
    });

    addTasksBtn.addEventListener("click", () => {
        if (projectManager.getSelectedProjectIndex() !== null) {
            let newTask = prompt("Enter New Task Name");
            projectManager.addTask(newTask);
        } else {
            alert("Please select a project first!");
        }
    });

    tasksListed.addEventListener("click", (event) => {
        const taskIndex = Array.from(tasksListed.children).indexOf(event.target.parentElement);

        if (event.target.classList.contains("fa-circle")) {
            projectManager.deleteTask(taskIndex);
        }

        if (event.target.classList.contains("fa-pen-to-square")) {
            let editTaskName = prompt("Enter New Task Name");
            if (projectManager.editTask(taskIndex, editTaskName)) {
                event.target.parentElement.innerHTML = `<i class="fa-regular fa-circle"></i>${editTaskName}<i class="fa-solid fa-pen-to-square"></i>`;
            }
        }
    });
});
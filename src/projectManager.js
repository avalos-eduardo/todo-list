import {Project} from "./project";
import {loadProjects, saveProjects} from "./storage";

export function createProjectManager() {
    const state = {
        projects: loadProjects(),
        selectedProjectIndex: null,
        projectsDiv: document.querySelector("#projects"),
        tasksListed: document.querySelector("#tasks-listed")
    }   

    function refreshProjects() {
        state.projectsDiv.innerHTML = "";
        state.projects.forEach((project, index) => {
            const projectButton = document.createElement("button");
            projectButton.setAttribute("id", `project-${index}`);
            projectButton.setAttribute("class", "projects");
            projectButton.innerHTML = `<i class="fa-solid fa-circle"></i>${project.title}<i class="fa-solid fa-xmark"></i>`;
            state.projectsDiv.appendChild(projectButton);
        });
    }

    function addProject(title) {
        state.projects.push(new Project(title));
        saveProjects(state.projects);
        refreshProjects();
    }

    function deleteProject(index) {
        state.projects.splice(index, 1);
        saveProjects(state.projects);
        refreshProjects();
        state.selectedProjectIndex = null;
        state.tasksListed.innerHTML = "";
    }

    function displayTasks(projectIndex) {
        state.tasksListed.innerHTML = "";
        state.selectedProjectIndex = projectIndex;

        if (projectIndex >= 0 && projectIndex < state.projects.length) {
            const tasks = state.projects[projectIndex].tasks;
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `<i class="fa-regular fa-circle"></i>${task}<i class="fa-solid fa-pen-to-square"></i>`;
                state.tasksListed.appendChild(li);
            })
        }
    }

    function addTask(taskName) {
        if (state.selectedProjectIndex != null && taskName) {
            state.projects[state.selectedProjectIndex].tasks.push(taskName);
            saveProjects(state.projects);
            displayTasks(state.selectedProjectIndex);
        }
    }

    function deleteTask(taskIndex) {
        if (taskIndex >= 0 && state.selectedProjectIndex !== null) {
            state.projects[state.selectedProjectIndex].tasks.splice(taskIndex, 1);
            saveProjects(state.projects);
            displayTasks(state.selectedProjectIndex);
        }
    }

    function editTask(taskIndex, newTaskName) {
        if (taskIndex >= 0 && state.selectedProjectIndex !== null && newTaskName) {
            state.projects[state.selectedProjectIndex].tasks[taskIndex] = newTaskName;
            saveProjects(state.projects);
            return true;
        }
        return false;
    } 


    function getSelectedProjectIndex() {
        return state.selectedProjectIndex;
    }


    function getElements() {
        return {
            projectsDiv: state.projectsDiv,
            tasksListed: state.tasksListed
        };
    }

    return {
        refreshProjects,
        addProject,
        deleteProject,
        displayTasks,
        addTask,
        deleteTask,
        editTask,
        getSelectedProjectIndex,
        getElements
    };

}
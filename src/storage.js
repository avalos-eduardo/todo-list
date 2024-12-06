import {Project} from "./project";

export function saveProjects(projects) {
    localStorage.setItem("myProjects", JSON.stringify(projects));
}

export function loadProjects() {
    const storedProjects = localStorage.getItem("myProjects");
    const projects = [];

    if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        parsedProjects.forEach(project => {
            const newProject = new Project(project.title);
            newProject.tasks = project.tasks;
            projects.push(newProject);
        });
    }

    return projects;
}

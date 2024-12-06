export function initModal() {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const addNewBtn = document.querySelector("#add-new-btn");

    addNewBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    span.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    return modal;
}

export function hideModal(modal) {
    modal.style.display = "none";
}

export function showModal(modal) {
    modal.style.display = "block";
}
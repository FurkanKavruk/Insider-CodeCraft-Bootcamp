document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let priorityInput = document.querySelector("input[name='priority']:checked");
    let errorMessage = document.getElementById("errorMessage");

    if (!title) {
        errorMessage.textContent = "Görev başlığı boş olamaz!";
        return;
    }

    if (!priorityInput) {
        errorMessage.textContent = "Lütfen bir öncelik seçin!";
        return;
    }

    errorMessage.textContent = "";
    let priority = priorityInput.value;

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-priority", priority);

    let taskContent = `<span><strong>${title}</strong> (${priority})${description ? `<br>${description}` : ''}</span>
        <div>
            <button class='completeTask'>Tamamlandı</button>
            <button class='deleteTask'>Sil</button>
        </div>`;

    taskDiv.innerHTML = taskContent;
    document.getElementById("taskList").appendChild(taskDiv);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.querySelectorAll("input[name='priority']").forEach(input => input.checked = false);
});

document.getElementById("taskList").addEventListener("click", function (event) {
    let target = event.target;
    if (target.classList.contains("completeTask")) {
        event.stopPropagation();
        target.parentElement.parentElement.classList.toggle("completed");
    } else if (target.classList.contains("deleteTask")) {
        event.stopPropagation();
        target.parentElement.parentElement.remove();
    }
});

document.getElementById("filterCompleted").addEventListener("click", function () {
    document.querySelectorAll(".task").forEach(task => {
        task.style.display = task.classList.contains("completed") ? "flex" : "none";
    });
});

document.getElementById("sortByPriority").addEventListener("click", function () {
    let priorities = { "Düşük": 1, "Orta": 2, "Yüksek": 3 };
    let taskList = Array.from(document.querySelectorAll(".task"));
    taskList.sort((a, b) => priorities[a.getAttribute("data-priority")] - priorities[b.getAttribute("data-priority")]);
    taskList.forEach(task => document.getElementById("taskList").appendChild(task));
});
function toggleFilterButtons() {
    let taskCount = document.querySelectorAll(".task").length;
    document.querySelector(".filter-sort").style.display = taskCount > 0 ? "flex" : "none";
}

document.getElementById("taskForm").addEventListener("submit", function () {
    toggleFilterButtons();
});

document.getElementById("taskList").addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteTask")) {
        event.target.parentElement.parentElement.remove();
        toggleFilterButtons();
    }
});
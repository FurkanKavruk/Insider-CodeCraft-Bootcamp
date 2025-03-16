const appendLocation = "#user-list"; 
const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "users";
const SESSION_KEY = "restoreClicked";

const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        renderUsers(users);
    } catch (error) {
        console.error("Kullanıcıları çekerken hata oluştu:", error);
    }
};

const renderUsers = (users) => {
    const container = document.querySelector(appendLocation);
    container.innerHTML = "";
    users.forEach(user => {
        const userElement = document.createElement("div");
        userElement.innerHTML = `${user.name} <button onclick="deleteUser(${user.id})">Sil</button>`;
        userElement.setAttribute("data-id", user.id);
        container.appendChild(userElement);
    });
};

const deleteUser = (userId) => {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    renderUsers(users);
};

const createRestoreButton = () => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const button = document.createElement("button");
    button.innerText = "Kullanıcıları Tekrar Yükle";
    button.onclick = () => {
        sessionStorage.setItem(SESSION_KEY, "true");
        fetchUsers();
        document.body.removeChild(button);
    };
    document.body.appendChild(button);
};

const observer = new MutationObserver(() => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    if (users.length === 0) createRestoreButton();
});

observer.observe(document.querySelector(appendLocation), { childList: true });

localStorage.getItem(STORAGE_KEY) ? renderUsers(JSON.parse(localStorage.getItem(STORAGE_KEY))) : fetchUsers();

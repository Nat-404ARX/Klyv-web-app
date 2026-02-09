let data = JSON.parse(localStorage.getItem("keysData")) || {
    groups: []
};

function createGroup(name) {
    data.groups.push({
        id: Date.now(),
        name,
        keys: []
    });
    save();
}

function createKey(groupId, key) {
    const group = data.groups.find(g => g.id == groupId);
    if (!group) return;

    group.keys.push({
        id: Date.now(),
        ...key
    });
    save();
}

function save() {
    localStorage.setItem("keysData", JSON.stringify(data));
    render();
}

function render() {
    const container = document.querySelector("#groups");
    container.innerHTML = "";

    data.groups.forEach(group => {
        const box = document.createElement("div");
        box.className = "box";

        box.innerHTML = `<h3>${group.name}</h3>`;

        group.keys.forEach(key => {
            box.innerHTML += `
            <div class="key">
                <div class="statut-${key.status}">_</div>
                <strong class="name-key">${key.name}</strong>
                <p class="name-user">Propriétaire : ${key.owner}</p>
                <p class="statut-text-${key.status}">
                    ${key.status === "on" ? "Présent" : "Absent"}
                </p>
            </div>
            `;
        });

        container.appendChild(box);
    });
}

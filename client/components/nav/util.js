function createButton({ id, text }) {
    const div  = document.createElement("div");

    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;

    div.appendChild(button);

    return button;
}

function createInput({ id, text }) {
    const div  = document.createElement("div");

    const input = document.createElement("input");
    input.id = id;
    input.textContent = text;

    div.appendChild(input);

    return div;
}

module.exports = {
    createButton,
    createInput,
};

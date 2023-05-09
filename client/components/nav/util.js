function createButton({ id, text }) {
    const div  = document.createElement("div");

    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;

    div.appendChild(button);

    return { div, button };
}

function createInput({ id, text }) {
    const div  = document.createElement("div");

    const input = document.createElement("input");
    input.id = id;
    input.textContent = text;

    div.appendChild(input);

    return div;
}

function createLabel({ id, text }) {
    const input = document.createElement("label");
    input.id = id;
    input.textContent = text;

    return input;
}

module.exports = {
    createButton,
    createInput,
    createLabel,
};

let socket = io.connect();

const addMessages = (e) => {
    const msg = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    console.log('mensaje a enviar', msg)
    socket.emit('new-message', msg);
    return false;
};

const renderMessages = (data) => {
    let html = data.map((elem) => {
        return (`<div>
            <strong>${elem.author}</strong>
            <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
};

socket.on('messages', (data) => {
    console.log(data);
    renderMessages(data);
});

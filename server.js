const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/public'));

let messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

io.on('connection', (socket) => {

    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        console.log('data', data)
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});


server.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
})

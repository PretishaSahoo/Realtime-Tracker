const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const socketio = require('socket.io');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const io = socketio(server);

app.get('/', (req, res) => {
    res.render('index'); 
});

io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on("send-location" , (data)=>{
        io.emit("recieve-location" , {id:socket.id , ...data});
    })

    socket.on("disconnect" , ()=>{
        io.emit("user-disconnected" , socket.id);
    })

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

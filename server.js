const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const PORT = 3000;

app.use(express.static("./static"));


let numConnections = 0;
io.on('connection', socket =>{
    console.log("A user connected");
    
    socket.on("disconnect", ()=>{
        console.log("A user disconnected");
        numConnections--;
    })
    
    socket.on("SpawnOtherPlayer", ()=>{
        console.log("Recieved Spawn Other Player");
        socket.emit("New Player Joined", socket.id);
    })
    
    setTimeout(()=>{
        socket.emit("Welcome", numConnections);
        numConnections++;
    }, 300);
    
    socket.broadcast.emit("New Player Joined", socket.id);
    
})

server.listen(PORT, err =>{
    if(err){
        console.log("Error occured server not starting");
        return;
    }
    
    console.log(`Server running on http://localhost:${PORT}`);
})


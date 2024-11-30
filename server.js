const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const PORT = 3000;

app.use(express.static("./static"));


io.on('connection', socket =>{
    console.log("A user connected");
    
    socket.on("disconnect", ()=>{
        console.log("A user disconnected");
    })
    
    setTimeout(()=>{
        socket.emit("Welcome", socket.id);
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


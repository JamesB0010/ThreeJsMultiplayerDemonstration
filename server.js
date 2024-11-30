const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const PORT = 3000;

app.use(express.static("./static"));
app.use(express.static("./static/CSS"));
app.use(express.static("./static/HTML"));
app.use(express.static("./static/Images"));
app.use(express.static("./static/JavaScript"));
app.use(express.static("./static/Models"));


let numConnections = 0;
io.on('connection', socket =>{
    console.log("A user connected");
    
    
    setTimeout(()=>{
        socket.emit("Welcome", numConnections);
        numConnections++;
    }, 300);

    socket.broadcast.emit("New Player Joined", socket.id);
    
    
    
    
    socket.on("disconnect", ()=>{
        console.log("A user disconnected");
        numConnections--;
        socket.broadcast.emit("PlayerDisconnected")
    })
    
    socket.on("SpawnOtherPlayer", ()=>{
        console.log("Recieved Spawn Other Player");
        socket.emit("New Player Joined", socket.id);
    })
    
    socket.on("GetOtherPlayerPos", () =>{
        socket.broadcast.emit("GetPos");
    })

    socket.on("ReturnedPos", pos =>{
        socket.broadcast.emit("ReturnedOtherPlayerPos", pos);
    })
    
    socket.on("ClientMoved", position =>{
        socket.broadcast.emit("UpdateOtherPlayer", position);
    })
})

server.listen(PORT, err =>{
    if(err){
        console.log("Error occured server not starting");
        return;
    }
    
    console.log(`Server running on http://localhost:${PORT}`);
})


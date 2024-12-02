const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static("./static"));
app.use(express.static("./static/CSS"));
app.use(express.static("./static/HTML"));
app.use(express.static("./static/Images"));
app.use(express.static("./static/JavaScript"));
app.use(express.static("./static/Models"));

let playerPositions = new Map();


let numConnections = 0;
io.on('connection', socket =>{
    console.log("A user connected");

    let evenConnectionNum = numConnections % 2 === 0;
    if(evenConnectionNum){
        playerPositions.set(socket.id, {x: -2.7694893717024964, z: -2.386174521798616});
    }
    else{
        socket.emit("SpawnPlayer1_OnPlayer2Client", Array.from(playerPositions.keys()));
        playerPositions.set(socket.id, {x: 2.9371103467522652, z: 2.2626621169409145});
    }
    
    
    setTimeout(()=>{
        socket.emit("Welcome", numConnections);
        numConnections++;
    }, 300);

    socket.broadcast.emit("New Player Joined", socket.id);
    
    socket.on("disconnect", ()=>{
        console.log("A user disconnected");
        playerPositions.delete(socket.id);
        numConnections--;
        socket.broadcast.emit("PlayerDisconnected", socket.id)
    })
    
    
    socket.on("GetOtherPlayersPos", (otherPlayerId, callback) =>{
        callback(otherPlayerId, playerPositions.get(otherPlayerId));
    })

    socket.on("ClientMoved", position =>{
        playerPositions.set(socket.id, position);
        socket.broadcast.emit("UpdateOtherPlayer", socket.id, position);
    })
})

server.listen(PORT, err =>{
    if(err){
        console.log("Error occured server not starting");
        return;
    }
    
    console.log(`Server running`);
})


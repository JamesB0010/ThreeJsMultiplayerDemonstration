import SceneInitializer from "./SceneInitializer.js";
import SceneBuilder from "./SceneBuilder.js";


const sceneInitializer = new SceneInitializer(animate);
const sceneBuilder = new SceneBuilder(sceneInitializer.scene, sceneInitializer.camera, sceneInitializer.renderer);

sceneBuilder.AddLights().AddFog().AddSkybox().AddBuilding();

function animate(dt) {
    sceneBuilder.Update(dt);
}

function RunMultiplayer(){
    let socket = io();
    let otherPlayerId;
    let isPlayer1 = false;
    let playerSpawned = false;
    
    socket.on("Welcome", (connectedClientsCount)=>{
        alert(`Welcome user to the game! `);

        if(connectedClientsCount === 0){
            isPlayer1 = true;
            sceneBuilder.AddFirstPersonControls(-2.7694893717024964, -2.386174521798616);
        }
        else if(connectedClientsCount > 0){
            isPlayer1 = false;
            sceneBuilder.AddFirstPersonControls(2.9371103467522652,2.2626621169409145);
        }

        playerSpawned = true;



        document.querySelector("#FrostEffect").remove();
        document.querySelector("#EnterLobby").remove();
        document.querySelector("#TitleDiv").remove();
        document.querySelector("#uiParent").remove();
        document.querySelector(".hintText").style.visibility = "visible";
    })

    socket.on("New Player Joined", (id)=>{
        alert(`A New Player Has Joined with the id ${id}!`);
        otherPlayerId = id;
        
        if(isPlayer1){
            sceneBuilder.AddOtherPlayer({x: 2.9371103467522652, z: 2.2626621169409145});
        }
        else{
            socket.emit("GetOtherPlayerPos", otherPlayerId, pos =>{
                sceneBuilder.AddOtherPlayer(pos);
            });
        }
    })

    document.addEventListener("ClientMoved", e =>{
        socket.emit("ClientMoved", e.detail);
    })


    socket.on("UpdateOtherPlayer", newPosition =>{
        const prevPos = sceneBuilder.otherPlayer.position;
        sceneBuilder.otherPlayer.position.set(newPosition.x, prevPos.y, newPosition.z);
    })


    socket.on("PlayerDisconnected", ()=>{
        if(isPlayer1){
            sceneInitializer.scene.remove(sceneBuilder.otherPlayer);
            sceneBuilder.otherPlayer = null;
            return;
        }

        if(isPlayer1 == false){
            sceneInitializer.scene.remove(sceneBuilder.otherPlayer);
            sceneBuilder.otherPlayer = null;
            isPlayer1 = true;
            return;
        }
    })
}

document.querySelector("#EnterLobby").addEventListener("click", () =>{
    RunMultiplayer();
})


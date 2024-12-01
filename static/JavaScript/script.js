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
    
    socket.on("Welcome", (connectedClientsCount)=>{
        alert(`Welcome user to the game! `);

        const firstClient = connectedClientsCount === 0;
        if(firstClient){
            sceneBuilder.AddFirstPersonControls(-2.7694893717024964, -2.386174521798616);
        }
        else{ 
            sceneBuilder.AddFirstPersonControls(2.9371103467522652,2.2626621169409145);
        }


        document.querySelector("#FrostEffect").remove();
        document.querySelector("#EnterLobby").remove();
        document.querySelector("#TitleDiv").remove();
        document.querySelector("#uiParent").remove();
        document.querySelector(".hintText").style.visibility = "visible";
    })
    
    socket.on("SpawnPlayer1_OnPlayer2Client", id =>{
        socket.emit("GetOtherPlayerPos", id, InitOtherPlayer);
    })

    socket.on("New Player Joined", (id)=>{
        alert(`A New Player Has Joined with the id ${id}!`);
        sceneBuilder.AddOtherPlayer({x: 2.9371103467522652, z: 2.2626621169409145});
    })
    
    function InitOtherPlayer(pos){
        sceneBuilder.AddOtherPlayer(pos);
    }

    document.addEventListener("ClientMoved", e =>{
        socket.emit("ClientMoved", e.detail);
    })


    socket.on("UpdateOtherPlayer", newPosition =>{
        const prevPos = sceneBuilder.otherPlayer.position;
        sceneBuilder.otherPlayer.position.set(newPosition.x, prevPos.y, newPosition.z);
    })


    socket.on("PlayerDisconnected", ()=>{
            sceneInitializer.scene.remove(sceneBuilder.otherPlayer);
            sceneBuilder.otherPlayer = null;
    })
}

document.querySelector("#EnterLobby").addEventListener("click", () =>{
    RunMultiplayer();
})


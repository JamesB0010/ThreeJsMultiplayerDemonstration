import SceneInitializer from "./SceneInitializer.js";
import SceneBuilder from "./SceneBuilder.js";


const sceneInitializer = new SceneInitializer(animate);
const sceneBuilder = new SceneBuilder(sceneInitializer.scene, sceneInitializer.camera, sceneInitializer.renderer);
let socket = io();

sceneBuilder.AddLights().AddFog().AddSkybox().AddBuilding().AddOrbitControls();

function animate(dt) {
    sceneBuilder.Update(dt);
    
    console.log(sceneInitializer.camera);
}

let isPlayer1 = false;

socket.on("Welcome", (connectedClientsCount)=>{
    alert(`Welcome user to the game! `);

    if(connectedClientsCount === 0){
        isPlayer1 = true;
        sceneBuilder.AddFirstPersonControls(-2.7694893717024964, -2.386174521798616);
    }
    else if(connectedClientsCount > 0){
        isPlayer1 = false;
        sceneBuilder.AddFirstPersonControls(2.9371103467522652,2.2626621169409145);
        socket.emit("SpawnOtherPlayer");
    }
})

socket.on("New Player Joined", (id)=>{

    const newPlayerEvent = new CustomEvent("PlayerAdded", {detail: id});
    document.dispatchEvent(newPlayerEvent);
})

document.addEventListener("PlayerAdded", (e)=>{
    alert(`A New Player Has Joined with the id ${e.detail}!`);
    if(isPlayer1){
        sceneBuilder.AddOtherPlayer(2.9371103467522652,2.2626621169409145);
    }
    else{
        sceneBuilder.AddOtherPlayer(-2.7694893717024964, -2.386174521798616);
    }
})
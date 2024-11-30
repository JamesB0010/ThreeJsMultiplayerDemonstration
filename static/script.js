import SceneInitializer from "./SceneInitializer.js";
import SceneBuilder from "./SceneBuilder.js";
import NetworkingLogic from "./NetworkingLogic.js";


const sceneInitializer = new SceneInitializer(animate);
const sceneBuilder = new SceneBuilder(sceneInitializer.scene, sceneInitializer.camera, sceneInitializer.renderer);

let networking = new NetworkingLogic();

sceneBuilder.AddLights().AddFog().AddSkybox().AddBuilding().AddFirstPersonControls();

function animate(dt) {
    sceneBuilder.Update(dt);
}

document.addEventListener("PlayerAdded", (e)=>{
    alert(`A New Player Has Joined with the id ${e.detail}!`);
    sceneBuilder.AddOtherPlayer();
})
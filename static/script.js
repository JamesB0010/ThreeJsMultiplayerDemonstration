import SceneInitializer from "./SceneInitializer.js";

let sceneInitializer = new SceneInitializer(animate);

let scene = sceneInitializer.scene;
let renderer = sceneInitializer.renderer;
let camera = sceneInitializer.camera;

sceneInitializer.FillScene();

sceneInitializer.AddOrbitControls();

//sceneInitializer.AddFirstPersonControls();



function animate() {
    renderer.render( scene, camera );
}
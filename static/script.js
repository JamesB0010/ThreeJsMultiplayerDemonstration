import SceneInitializer from "./SceneInitializer.js";
let sceneInitializer = new SceneInitializer(animate);
var socket = io();

let scene = sceneInitializer.scene;
let renderer = sceneInitializer.renderer;
let camera = sceneInitializer.camera;

sceneInitializer.FillScene();

//sceneInitializer.AddOrbitControls();

sceneInitializer.AddFirstPersonControls();

function animate() {
    renderer.render( scene, camera );
}


//networking stuff
socket.on("Welcome", (id)=>{
    alert(`Welcome user ${id} to the game! `);
})

socket.on("New Player Joined", (id)=>{
    alert(`A New Player Has Joined with the id ${id}!`);
})
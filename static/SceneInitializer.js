import * as THREE from "three";
export default class SceneInitializer {
    renderer;
    scene;
    camera;
    userUpdateFunction;
    clock = new THREE.Clock();
    
    constructor(UpdateFunction) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.userUpdateFunction = UpdateFunction;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(() =>{
            this.#Update();
        });
        document.body.appendChild(this.renderer.domElement);
    }
    
    #Update(){
        let deltaTime = this.clock.getDelta();
        
        this.userUpdateFunction(deltaTime);

        this.renderer.render( this.scene, this.camera );
    }
}
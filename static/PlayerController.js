import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import * as THREE from 'three';

export default class PlayerController{
    #firstPersonControls;
    #camera;
    #height;
    #enabled = true;
    
    #lastPosition;
    constructor(camera, renderer, startPosX, startPosZ) {
        this.#firstPersonControls = new FirstPersonControls(camera, renderer.domElement);
        this.#firstPersonControls.lookSpeed = 0.2;
        this.#firstPersonControls.movementSpeed = 1.6;
        this.#height = 0.4;
        this.#camera = camera;
        camera.position.set(startPosX, this.#height, startPosZ);
        this.#lastPosition = camera.position.clone();
        
        document.addEventListener("keyup", e =>{
            if(e.code == "Space"){
                this.#enabled = !this.#enabled;
            }
        })
    }
    
    Update(dt){
        if(!this.#enabled)
            return;
        this.#firstPersonControls.update(dt);
        let camPos = this.#camera.position;
        this.#camera.position.set(camPos.x,this.#height,camPos.z);
        
        const positionChanged = !this.#camera.position.equals(this.#lastPosition);
        if(positionChanged){
            const e = new CustomEvent("ClientMoved", {detail: {x: this.#camera.position.x, z: this.#camera.position.z}});
           document.dispatchEvent(e); 
            this.#lastPosition = this.#camera.position.clone();
        }
    }
}

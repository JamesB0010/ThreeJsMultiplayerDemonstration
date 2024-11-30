import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export default class PlayerController{
    #firstPersonControls;
    #camera;
    #height;
    constructor(camera, renderer) {
        this.#firstPersonControls = new FirstPersonControls(camera, renderer.domElement);
        this.#firstPersonControls.lookSpeed = 0.2;
        this.#firstPersonControls.movementSpeed = 1.6;
        this.#height = 0.4;
        this.#camera = camera;
        camera.position.set(-2.7694893717024964, this.#height, -2.3861745217986163);
    }
    
    Update(dt){
        this.#firstPersonControls.update(dt);
        let camPos = this.#camera.position;
        this.#camera.position.set(camPos.x,this.#height,camPos.z);
        console.log(camPos);
    }
}

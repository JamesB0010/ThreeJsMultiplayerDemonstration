import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import PlayerController from './PlayerController.js';
import {Clock} from "three";
export default class SceneInitializer {
    renderer;
    scene;
    camera;
    skybox;
    #skyboxLoaded = false;
    textureLoader = new THREE.TextureLoader();
    gltfLoader = new GLTFLoader();
    userUpdateFunction;
    clock = new THREE.Clock();
    playerController;
    

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
    AddOrbitControls(){
        const controls = new OrbitControls( this.camera, this.renderer.domElement ); 
        controls.update();
    }
    
    AddFirstPersonControls(){
        this.playerController = new PlayerController(this.camera, this.renderer);
    }
    
    #Update(){
        if(this.#skyboxLoaded){
            this.skybox.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        }
        this.playerController.Update(this.clock.getDelta());
        this.userUpdateFunction();
    }

    FillScene() {
        this.#AddLights();
        this.#AddFog();
        this.#AddSkybox();
        this.#AddBuilding();
    }

    #AddLights(){
        this.scene.add(new THREE.AmbientLight(0xffffff, 1));
    }
    
    #AddFog(){
        this.scene.fog = new THREE.FogExp2(0xDFE9F3, 0.1);
    }
    #AddSkybox() {
        this.textureLoader.load("./skyTexture.jpg", texture => {
            const skyboxGeometry = new THREE.SphereGeometry(30, 32, 16);
            const skyboxMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });

            this.skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
            this.scene.add(this.skybox);
            this.#skyboxLoaded = true;
        });
    }
    
    #AddBuilding(){
        this.gltfLoader.load("./Nacht.glb", glb =>{
           this.scene.add(glb.scene);
        });
    }

}
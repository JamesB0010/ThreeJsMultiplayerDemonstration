import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import PlayerController from './PlayerController.js';

export default class SceneBuilder{
    #scene;
    camera;
    renderer;
    playerController;
    skybox;
    #skyboxLoaded = false;
    textureLoader = new THREE.TextureLoader();
    gltfLoader = new GLTFLoader();
    otherPlayers = new Map();
    orbitControls = null;
    constructor(scene, camera, renderer) {
        this.#scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }
    
    AddOrbitControls(){
        this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
        return this;
    }
    
    AddFirstPersonControls(startPosX, startPosZ){
        this.playerController = new PlayerController(this.camera, this.renderer, startPosX, startPosZ);
        return this;
    }
    
    AddLights(){
        this.#scene.add(new THREE.AmbientLight(0xffffff,1));
        return this;
    }
    
    AddFog(){
        this.#scene.fog = new THREE.FogExp2(0xDFE9F3, 0.1);
        return this;
    }

    AddSkybox() {
        this.textureLoader.load("../Images/skyTexture.jpg", texture => {
            const skyboxGeometry = new THREE.SphereGeometry(30, 32, 16);
            const skyboxMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });

            this.skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
            this.#scene.add(this.skybox);
            this.#skyboxLoaded = true;
        });
        return this;
    }

    AddBuilding(){
        this.gltfLoader.load("../Models/Nacht.glb", glb =>{
            this.#scene.add(glb.scene);
        });
        return this;
    }
    
    AddOtherPlayer(id, pos){
        const geometry = new THREE.CapsuleGeometry( 0.15, 0.175, 4, 8 );
        const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        let mesh = new THREE.Mesh( geometry, material );
        this.otherPlayers.set(id, mesh); 
        this.#scene.add( mesh );
        mesh.position.set(pos.x, 0.25, pos.z)
        return this;
    }

    Update(dt){
        if(this.#skyboxLoaded){
            this.skybox.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        }

        if(this.playerController)
            this.playerController.Update(dt);
        
        if(this.orbitControls)
            this.orbitControls.update(dt);
    }
}
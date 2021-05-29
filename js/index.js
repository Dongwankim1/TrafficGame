import * as THREE from "./lib/three.module.js";

class App{
    constructor(){
        this.scene = this.getScene();

    }

    getScene(){
        const scene = new THREE.Scene();
        return scene;
    }

    init(){

    }
}


window.onload = () =>{
    new App();
}
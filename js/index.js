import * as THREE from "./lib/three.module.js";
import Car from "./car.js";
class App{
    constructor(){
        

        this.init();
    }

    getScene(){
        const scene = new THREE.Scene();
        return scene;
    }
    getambientLight(){
        return new THREE.AmbientLight(0xffffff,0.6);
    }
    getDirLight(){
        const dirLight = new THREE.DirectionalLight(0xffffff,0.6);
        dirLight.position.set(100,-300,400);
        return dirLight;
    }
    getCamera(){
        const asspectRatio = window.innerWidth/window.innerHeight;
        const cameraWidth = 150;
        const cameraHeight = cameraWidth/asspectRatio;

        const camera = new THREE.OrthographicCamera(
            cameraWidth / -2,
            cameraWidth /2,
            cameraHeight/2,
            cameraHeight /-2,
            0,
            1000
        );

        camera.position.set(200,-200,300);
        camera.up.set(0,0,1);
        camera.lookAt(0,0,0);

        return camera
    }

    getrenderer(){
        const renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.render(this.scene,this.camera);
        return renderer;
    }
    init(){
        this.scene = this.getScene();
        this.scene.add(this.getambientLight());
        this.scene.add(this.getDirLight());
        const car = new Car();
        this.scene.add(car.instence);
        this.camera = this.getCamera();
        this.renderer = this.getrenderer();
        document.body.appendChild(this.renderer.domElement);
    }
}


window.onload = () =>{
    new App();
}
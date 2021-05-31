import * as THREE from "./lib/three.module.js";
import Car from "./car.js";
import { getLeftIsland, getLineMarkings } from "./track.js";

const asspectRatio = window.innerWidth/window.innerHeight;
const cameraWidth = 1200;
const cameraHeight = cameraWidth/asspectRatio;

class App{
    constructor(){
        

        this.init();
    }
    getAxesHelper(){
        const axesHelper = new THREE.AxesHelper( 400 );
        return axesHelper;
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
        

        const camera = new THREE.OrthographicCamera(
            cameraWidth / -2,
            cameraWidth /2,
            cameraHeight/2,
            cameraHeight /-2,
            0,
            1000
        );

        camera.position.set(0,0,300);
        //camera.up.set(0,0,1);
        camera.lookAt(0,0,0);

        return camera
    }
    getRenderMap(mapWidth,mapHeight){
        const lineMarkingsTexture = getLineMarkings(mapWidth,mapHeight);

        const planeGeometry = new THREE.PlaneBufferGeometry(mapWidth,mapHeight);
        const planeMaterial = new THREE.MeshLambertMaterial({map:lineMarkingsTexture});

        const plane = new THREE.Mesh(planeGeometry,planeMaterial);

        return plane;
    }

    getLand(){
        const islandleft = getLeftIsland();


        const fieldGeometry = new THREE.ExtrudeBufferGeometry(
            [islandleft],
            {depth:6,bevelEnabled:false}
        )
        const fieldMesh = new THREE.Mesh(fieldGeometry,[
            new THREE.MeshLambertMaterial({color:0x67c240}),
            new THREE.MeshLambertMaterial({color:0x23311c}),
        ])

        return fieldMesh;
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
        this.scene.add(this.getAxesHelper());
        this.scene.add(this.getRenderMap(cameraWidth,cameraHeight));
        this.scene.add(this.getLand());
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
import * as THREE from "./lib/three.module.js";
import Car from "./car.js";
import { getLeftIsland, getLineMarkings,getMiddleIsland,getRightIsland,getOuterField } from "./track.js";

const asspectRatio = window.innerWidth/window.innerHeight;
const cameraWidth = 960;
const cameraHeight = cameraWidth/asspectRatio;
const playerAngleInitial = Math.PI;

const speed = 0.0017;

const trackRadius = 225;
const trackWidth =45;

const innerTrackRadius = trackRadius-trackWidth;
const outerTrackRadius = trackRadius+trackWidth

const arcAngle1 = (1/3)*Math.PI;

const deltaY = Math.sin(arcAngle1)*innerTrackRadius;
const arcAngle2 = Math.asin(deltaY/outerTrackRadius);

const arcCenterX = (
    Math.cos(arcAngle1)*innerTrackRadius+
    Math.cos(arcAngle2)*outerTrackRadius 
)/2;

const arcAngle3 = Math.acos(arcCenterX/innerTrackRadius);

const arcAngle4 = Math.acos(arcCenterX/outerTrackRadius);


class App{
    constructor(){
        this.ready=null;
        this.palyerAngleMoved;
        this.score=null;
        this.otherVehicles = [];
        this.lastTimestamp = null;

        this.scoreElement = document.getElementById('score');

        this.accelerate = false;
        this.decelerate = false;

        window.addEventListener("keydown",function(e){
            if(e.key ==="ArrowUp"){
                this.startGame();
                this.accelerate= true;
                return;
            }

            if(e.key ==="ArrowDown"){
                this.decelerate
            }

            if(e.key==="R"|| e.key==="r"){
                this.reset();
                return;
            }

        }.bind(this));

        window.addEventListener("keyup",function(e){
            if(e.key ==="ArrowUp"){
                this.accelerate = false;
                return;
            }

            if(e.key==="ArrowDown"){
                this.decelerate = false;
                return;
            }
        }.bind(this))



        this.init();
        this.reset();
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

        camera.position.set(0,-210,300);
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

    getLand(mapWidth,mapHeight){
        const islandleft = getLeftIsland();
        const islandMiddle = getMiddleIsland();
        const islandright = getRightIsland();
        const islandOuterfield = getOuterField(mapWidth,mapHeight);

        const fieldGeometry = new THREE.ExtrudeBufferGeometry(
            [islandleft,islandMiddle,islandright,islandOuterfield],
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
        //renderer.render(this.scene,this.camera);
        return renderer;
    }
    init(){
        this.scene = this.getScene();
        this.scene.add(this.getambientLight());
        this.scene.add(this.getDirLight());
        this.scene.add(this.getAxesHelper());
        this.scene.add(this.getRenderMap(cameraWidth,cameraHeight));
        this.scene.add(this.getLand(cameraWidth,cameraHeight));
        this.car = new Car();
        this.scene.add(this.car.instence);
        this.camera = this.getCamera();
        this.renderer = this.getrenderer();
        document.body.appendChild(this.renderer.domElement);
    }

    reset(){
        this.palyerAngleMoved=0;
        //movePlayerCar(0);
        this.score = 0;
        this.scoreElement.innerText = this.score;
        this.lastTimestamp = undefined;

        this.otherVehicles.forEach((vehilce)=>{
            this.scene.remove(vehilce.mesh);
        })
        this.otherVehicles = [];

        this.renderer.render(this.scene,this.camera);
        this.ready = true;
    }

    startGame(){
        if(this.ready){
            this.ready=false;
            this.renderer.setAnimationLoop(this.animation.bind(this));
        }
    }

    animation(timestamp){
        if(!this.lastTimestamp){
            this.lastTimestamp = timestamp;
            return;
        }
        const timeDelta = timestamp - this.lastTimestamp;

        this.movePlayerCar(timeDelta);

        const laps = Math.floor(Math.abs(this.palyerAngleMoved)/(Math.PI*2));

        if(laps!==this.score){
            this.score = laps;
            this.scoreElement.innerText = this.score;
        }



        this.renderer.render(this.scene,this.camera);
        this.lastTimestamp = timestamp;
    }

    movePlayerCar(timeDelta){
        const palyerSpped = this.getPlayerSpeed();
        this.palyerAngleMoved -= palyerSpped * timeDelta;

        const totalPlayerAngle = playerAngleInitial +this.palyerAngleMoved;

        const playerX = Math.cos(totalPlayerAngle)*trackRadius - arcCenterX;
        const playerY = Math.sin(totalPlayerAngle)*trackRadius;

        this.car.instence.position.x = playerX;
        this.car.instence.position.y = playerY;

        this.car.instence.rotation.z = totalPlayerAngle-(Math.PI/2);

    }

    getPlayerSpeed(){
        if(this.accelerate) return speed *2;
        if(this.decelerate) return speed *0.5;
        return speed;
    }
}


window.onload = () =>{
    new App();
}
import {Mesh,BoxBufferGeometry,MeshLambertMaterial,Group,CanvasTexture} from './lib/three.module.js';
const vehicleColor = [0xa52523,0xbdb638,0x78b14b]
class Car{
    constructor(){
        this.instence = this.getCar();
    }
    getCar(){
        const car = new Group();

        car.add(this.getBackWheel());
        car.add(this.getFrontWheel());
        car.add(this.getmain());
        car.add(this.getCabin());
        return car;
    }

    getmain(){
        const main = new Mesh(
            new BoxBufferGeometry(60,30,15),
            new MeshLambertMaterial({color:0xa52523})
        )
        main.position.z = 12;
        return main;
    }

    getCabin(){
        const carFrontTexture = this.getCarFrontTexture();
        const carBackTexture = this.getCarFrontTexture();

        const carRightSideTexture = this.getCarSideTexture();
        const carLeftSideTexture = this.getCarSideTexture();

        const cabin = new Mesh(new BoxBufferGeometry(33,24,12),[
            new MeshLambertMaterial({map:carFrontTexture}),
            new MeshLambertMaterial({map:carBackTexture}),
            new MeshLambertMaterial({map:carLeftSideTexture}),
            new MeshLambertMaterial({map:carRightSideTexture}),
            new MeshLambertMaterial({color:0xffffff}),
            new MeshLambertMaterial({color:0xffffff})
        ])

        cabin.position.x = -6;
        cabin.position.z = 25.5;
        return cabin;
    }
    getFrontWheel(){
        const frontwheel = new Mesh(
            new BoxBufferGeometry(12,33,12),
            new MeshLambertMaterial({color:0x333333})
        )
        frontwheel.position.z = 6;
        frontwheel.position.x = 18;
        return frontwheel;
    }

    getBackWheel(){
        const backwheel = new Mesh(
            new BoxBufferGeometry(12,33,12),
            new MeshLambertMaterial({color:0x333333})
        )
            
        backwheel.position.z = 6;
        backwheel.position.x = -18
            
        return backwheel
    }

    getCarFrontTexture(){
        const canvas =document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        context.fillStyle = "#ffffff";
        context.fillRect(0,0,64,32);

        context.fillStyle = "#666666";
        context.fillRect(8,8,48,24);

        return new CanvasTexture(canvas);
    }

    getCarSideTexture(){
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 32;
        const context = canvas.getContext('2d');

        context.fillStyle = "#ffffff";
        context.fillRect(0,0,128,32);

        context.fillStyle = "#666666";
        context.fillRect(10,8,38,24);
        context.fillRect(58,8,60,24);

        return new CanvasTexture(canvas);
    }

}

export default Car;
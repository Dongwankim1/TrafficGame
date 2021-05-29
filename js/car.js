import {Mesh,BoxBufferGeometry,MeshLambertMaterial,Group} from './lib/three.module';
const vehicleColor = [0xa52523,0xbdb638,0x78b14b]
class Car{
    constructor(){
        
    }
    getCar(){
        const car = new Group();

        car.add(getBackWheel());

    }
    getFrontWheel(){
        const frontwheel = new Mesh(
            new BoxBufferGeometry(12,33,12),
            new MeshLambertMaterial
        )
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


}
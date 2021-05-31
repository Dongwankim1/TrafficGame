import { CanvasTexture, Mesh, MeshLambertMaterial, PlaneBufferGeometry, Shape, TetrahedronGeometry } from "./lib/three.module.js";

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

export function getLineMarkings(mapWidth,mapHeight){
    const canvas = document.createElement("canvas");
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle ="#546E90";
    ctx.fillRect(0,0,mapWidth,mapHeight)

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#E0FFFF";
    ctx.setLineDash([10,14]);

    //left  circle
    ctx.beginPath();
    ctx.arc(
        mapWidth/2 - arcCenterX,
        mapHeight/2,
        trackRadius,
        0,
        Math.PI *2
    )
    ctx.stroke();
    
    //right circle
    ctx.beginPath();
    ctx.arc(
        mapWidth/2+arcCenterX,
        mapHeight/2,
        trackRadius,
        0,
        Math.PI*2
    )
    ctx.stroke();


    return new CanvasTexture(canvas);
}

export function getLeftIsland(){
    const islandLeft = new Shape();
    
    islandLeft.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        arcAngle1,
        -arcAngle1,
        false
    )

    islandLeft.absarc(
        arcCenterX,
        0,
        outerTrackRadius,
        Math.PI+arcAngle2,
        Math.PI - arcAngle2,
        true
    )
    

    return islandLeft;
}
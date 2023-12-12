import * as THREE from 'three'
import { rocketMaterials } from '../materials/rocketMaterial';
import { rocketParameters } from '../parameters/parameters'; 

export function createRocket() {
    // геометрии
    const cylGeometry1 = new THREE.CylinderGeometry(4.5, 5, 8, 20);
    const cylGeometry2 = new THREE.CylinderGeometry(5, 5, 13, 20);
    const cylGeometry3 = new THREE.CylinderGeometry(4, 5, 8, 20);
    const cylGeometry4 = new THREE.CylinderGeometry(1, 4, 8, 20);
    const cylGeometry5 = new THREE.CylinderGeometry(4.5, 3.5, 4, 20);
    const planeGeometry1 = new THREE.PlaneGeometry(5, 13);
    const Rocket = new THREE.Group();

    //#region Основной корпус
    const lowerMainPart = new THREE.Mesh(cylGeometry1, rocketMaterials.grayMaterial);
    lowerMainPart.rotateX(Math.PI);
    Rocket.add(lowerMainPart);

    const mainPart = new THREE.Mesh(cylGeometry2, rocketMaterials.grayMaterial);
    mainPart.position.set(0, 10.5, 0);
    Rocket.add(mainPart);

    const upperMainPart = new THREE.Mesh(cylGeometry3, rocketMaterials.grayMaterial);
    upperMainPart.position.set(0, 20.5, 0);
    Rocket.add(upperMainPart);
    //#endregion
    
    //#region нос
    const top = new THREE.Mesh(cylGeometry4, rocketMaterials.redMaterial);
    top.position.set(0, 28.5, 0);
    Rocket.add(top);
    //#endregion

    //#region Куда прикрепляются двигатели
    const enginePart = new THREE.Mesh(cylGeometry5, rocketMaterials.brownMaterial);
    enginePart.position.set(0, -6, 0);
    Rocket.add(enginePart);
    //#endregion

    //#region Крылья
    const wing1 = new THREE.Mesh(planeGeometry1, rocketMaterials.redMaterial);
    wing1.position.set(3, 1, 3);
    wing1.rotateY(-Math.PI / 4);
    Rocket.add(wing1);

    const wing2 = new THREE.Mesh(planeGeometry1, rocketMaterials.redMaterial);
    wing2.position.set(-3, 1, -4);
    wing2.rotateY(-Math.PI / 6);
    Rocket.add(wing2);
    //#endregion

    return Rocket;
}
import * as THREE from 'three'
import { rocketMaterials } from '../materials/rocketMaterial';

export function createRocket() {
    // геометрии
    const cylGeometry1 = new THREE.CylinderGeometry(4.5, 5, 8, 20);
    const cylGeometry2 = new THREE.CylinderGeometry(5, 5, 13, 20);
    const cylGeometry3 = new THREE.CylinderGeometry(4, 5, 8, 20);
    const cylGeometry4 = new THREE.CylinderGeometry(0.5, 4, 8, 20);
    const cylGeometry5 = new THREE.CylinderGeometry(4.5, 3.5, 4, 20);
    const planeGeometry1 = new THREE.BoxGeometry(5, 13, 0.5);
    const cylGeometry6 = new THREE.CylinderGeometry(3, 3, 0.5, 20);
    const cylGeometry7 = new THREE.CylinderGeometry(2.7, 2.7, 0.8, 20);

    const Rocket = new THREE.Group();

    //#region Основной корпус
    const lowerMainPart = new THREE.Mesh(cylGeometry1, rocketMaterials.grayMaterial);
    lowerMainPart.rotateX(-Math.PI / 2);
    Rocket.add(lowerMainPart);

    const mainPart = new THREE.Mesh(cylGeometry2, rocketMaterials.grayMaterial);
    mainPart.position.set(0, 0, 10.5);
    mainPart.rotateX(Math.PI / 2)
    Rocket.add(mainPart);

    const upperMainPart = new THREE.Mesh(cylGeometry3, rocketMaterials.grayMaterial);
    upperMainPart.rotateX(Math.PI / 2)
    upperMainPart.position.set(0, 0, 20.5);
    Rocket.add(upperMainPart);
    //#endregion
    
    //#region верх ракеты
    const top = new THREE.Mesh(cylGeometry4, rocketMaterials.redMaterial);
    top.position.set(0, 0, 28.5);
    top.rotateX(Math.PI / 2)
    Rocket.add(top);
    //#endregion

    //#region Куда прикрепляются двигатели
    const enginePart = new THREE.Mesh(cylGeometry5, rocketMaterials.brownMaterial);
    enginePart.position.set(0, 0, -6);
    enginePart.rotateX(Math.PI / 2)
    Rocket.add(enginePart);
    //#endregion

    //#region Крылья
    const wing1 = new THREE.Mesh(planeGeometry1, rocketMaterials.redMaterial);
    wing1.position.set(0, 4, 5);
    wing1.rotateX(1.83259571459405);
    wing1.rotateY(Math.PI / 2);
    Rocket.add(wing1);

    const wing2= new THREE.Mesh(planeGeometry1, rocketMaterials.redMaterial);
    wing2.position.set(0, -4, 5);
    wing2.rotateX(1.30899693899575);
    wing2.rotateY(Math.PI / 2);
    Rocket.add(wing2);
    //#endregion

    //#region Окно
    const window1 = new THREE.Mesh(cylGeometry6, rocketMaterials.whiteMaterial);
    const window2 = new THREE.Mesh(cylGeometry7, rocketMaterials.blackMaterial);
    const window = new THREE.Group();
    window.add(window1, window2);
    window.position.set(4.8, 0, 14.5)
    window.rotateZ(Math.PI / 2);
    Rocket.add(window);
    //#endregion

    return Rocket;
}
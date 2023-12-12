import * as THREE from 'three'

export const ISS = new THREE.Group();

// материалы
const grayMaterial = new THREE.MeshStandardMaterial({ color: 'gray', wireframe: false });
const whiteMaterial =  new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false });
const orangeMaterial =  new THREE.MeshStandardMaterial({ color: 0xe3be46, wireframe: false, side: THREE.DoubleSide });
const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, wireframe: false });
const lightGrayMaterial = new THREE.MeshStandardMaterial({ color: 0xbdbab1, wireframe: false });
const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x5b8dcf, wireframe: false });
const silverMaterial = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, wireframe: false });

// геометрии
const cylGeometry1 = new THREE.CylinderGeometry(2, 2, 30);
const cylGeometry2 = new THREE.CylinderGeometry(1.5, 1.5, 15);
const cylGeometry3 = new THREE.CylinderGeometry(1.8, 1.8, 20);
const cylGeometry4 = new THREE.CylinderGeometry(0.3, 0.3, 40);
const cylGeometry5 = new THREE.CylinderGeometry(0.2, 0.2, 20);
const cylGeometry6 = new THREE.CylinderGeometry(2, 2, 10);
const cylGeometry7 = new THREE.CylinderGeometry(0.2, 0.2, 10);
const smallCylGeometry = new THREE.CylinderGeometry(1, 1, 5);
const planeGeometry1 = new THREE.BoxGeometry(4.5, 18, 0.5);
const planeGeometry2 = new THREE.BoxGeometry(3, 8, 0.3);
const planeGeometry3 = new THREE.BoxGeometry(3, 8, 0.3);

//#region основные модули
const mainPart1 = new THREE.Mesh(cylGeometry1, whiteMaterial);
ISS.add(mainPart1);

const mainPart2 = new THREE.Mesh(cylGeometry3, silverMaterial);
mainPart2.rotateZ(Math.PI / 2);
mainPart2.position.set(2, 0, 0)
ISS.add(mainPart2);

const mainPart3 = new THREE.Mesh(cylGeometry6, whiteMaterial);
mainPart3.rotateX(Math.PI / 2);
mainPart3.position.set(-8, 0, 0)
ISS.add(mainPart3);
//#endregion

//#region второстепенные модули
const secondPart1 = new THREE.Mesh(cylGeometry2, grayMaterial);
secondPart1.position.set(0, 22, 0);
ISS.add(secondPart1);

const secondPart2 = new THREE.Mesh(cylGeometry2, grayMaterial);
secondPart2.position.set(0, -22, 0);
ISS.add(secondPart2);
// #endregion

//#region цилиндры за которую цепляются основные батареи
const little1 = new THREE.Mesh(smallCylGeometry, whiteMaterial);
little1.position.set(0, 20, 0);
little1.rotateX(Math.PI / 2);
ISS.add(little1);

const little2 = new THREE.Mesh(smallCylGeometry, whiteMaterial);
little2.position.set(0, 26, 0);
little2.rotateX(Math.PI / 2);
ISS.add(little2);

const little3 = new THREE.Mesh(smallCylGeometry, whiteMaterial);
little3.position.set(0, -20, 0);
little3.rotateX(Math.PI / 2);
ISS.add(little3);

const little4 = new THREE.Mesh(smallCylGeometry, whiteMaterial);
little4.position.set(0, -26, 0);
little4.rotateX(Math.PI / 2);
ISS.add(little4);
//#endregion

//#region основные солнечные панели
const battery1 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery1);
battery1.rotateX(Math.PI / 2);
battery1.rotateY(Math.PI / 2);
battery1.position.set(0, 20, 11)

const battery2 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery2);
battery2.rotateX(Math.PI / 2);
battery2.rotateY(Math.PI / 2);
battery2.position.set(0, 20, -11)

const battery3 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery3);
battery3.rotateX(Math.PI / 2);
battery3.rotateY(Math.PI / 2);
battery3.position.set(0, 26, 11)

const battery4 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery4);
battery4.rotateX(Math.PI / 2);
battery4.rotateY(Math.PI / 2);
battery4.position.set(0, 26, -11)

const battery5 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery5);
battery5.rotateX(Math.PI / 2);
battery5.rotateY(Math.PI / 2);
battery5.position.set(0, -20, 11)

const battery6 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery6);
battery6.rotateX(Math.PI / 2);
battery6.rotateY(Math.PI / 2);
battery6.position.set(0, -20, -11)

const battery7 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery7);
battery7.rotateX(Math.PI / 2);
battery7.rotateY(Math.PI / 2);
battery7.position.set(0, -26, 11)

const battery8 = new THREE.Mesh(planeGeometry1, orangeMaterial);
ISS.add(battery8);
battery8.rotateX(Math.PI / 2);
battery8.rotateY(Math.PI / 2);
battery8.position.set(0, -26, -11)

const balka1 = new THREE.Mesh(cylGeometry4, blackMaterial);
ISS.add(balka1);
balka1.position.set(0, -26, 0);
balka1.rotateX(Math.PI / 2);

const balka2 = new THREE.Mesh(cylGeometry4, blackMaterial);
ISS.add(balka2);
balka2.position.set(0, -20, 0);
balka2.rotateX(Math.PI / 2);

const balka3 = new THREE.Mesh(cylGeometry4, blackMaterial);
ISS.add(balka3);
balka3.position.set(0, 20, 0);
balka3.rotateX(Math.PI / 2);

const balka4 = new THREE.Mesh(cylGeometry4, blackMaterial);
ISS.add(balka4);
balka4.position.set(0, 26, 0);
balka4.rotateX(Math.PI / 2);
//#endregion

//#region побочные солнечные батареи
const balka5 = new THREE.Mesh(cylGeometry5, lightGrayMaterial);
ISS.add(balka5);
balka5.position.set(11, 0, 0);
balka5.rotateX(Math.PI / 2);

const balka6 = new THREE.Mesh(cylGeometry5, lightGrayMaterial);
ISS.add(balka6);
balka6.position.set(5, 0, 0);
balka6.rotateX(Math.PI / 2);

const battery9 = new THREE.Mesh(planeGeometry2, blueMaterial);
ISS.add(battery9);
battery9.rotateX(Math.PI / 2);
battery9.rotateY(Math.PI / 2);
battery9.position.set(11, 0, 6)
battery9.rotateY(Math.PI / 8);

const battery10 = new THREE.Mesh(planeGeometry2, blueMaterial);
ISS.add(battery10);
battery10.rotateX(Math.PI / 2);
battery10.rotateY(Math.PI / 2);
battery10.position.set(11, 0, -6)
battery10.rotateY(Math.PI / 3);

const battery11 = new THREE.Mesh(planeGeometry2, blueMaterial);
ISS.add(battery11);
battery11.rotateX(Math.PI / 2);
battery11.rotateY(Math.PI / 2);
battery11.position.set(5, 0, 6)
battery11.rotateY(Math.PI / 12);

const battery12 = new THREE.Mesh(planeGeometry2, blueMaterial);
ISS.add(battery12);
battery12.rotateX(Math.PI / 2);
battery12.rotateY(Math.PI / 2);
battery12.position.set(5, 0, -6)
battery12.rotateY(-Math.PI / 6);
//#endregion

// #region белые солнечные батареи
const balka7 = new THREE.Mesh(cylGeometry7, blackMaterial);
ISS.add(balka7);
balka7.position.set(4, 7, 0);
balka7.rotateZ(Math.PI / 2);

const balka8 = new THREE.Mesh(cylGeometry7, blackMaterial);
ISS.add(balka8);
balka8.position.set(4, 8, 0);
balka8.rotateZ(Math.PI / 2);

const balka9 = new THREE.Mesh(cylGeometry7, blackMaterial);
ISS.add(balka9);
balka9.position.set(4, -7, 0);
balka9.rotateZ(Math.PI / 2);

const balka10 = new THREE.Mesh(cylGeometry7, blackMaterial);
ISS.add(balka10);
balka10.position.set(4, -8, 0);
balka10.rotateZ(Math.PI / 2);

const battery13 = new THREE.Mesh(planeGeometry3, silverMaterial);
ISS.add(battery13);
battery13.rotateZ(Math.PI / 2);
battery13.position.set(5, -7.5, 0)

const battery14 = new THREE.Mesh(planeGeometry3, silverMaterial);
ISS.add(battery14);
battery14.rotateZ(Math.PI / 2);
battery14.position.set(5, 7.5, 0)



//#endregion
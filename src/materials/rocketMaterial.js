import * as THREE from 'three'

export const rocketMaterials = {
    grayMaterial: new THREE.MeshPhysicalMaterial({ color: 0xc0c4c2, wireframe: false, metalness: 0.8,  roughness: 0.5}),
    whiteMaterial: new THREE.MeshPhysicalMaterial({ color: 0xffffff, wireframe: false, metalness: 0.8,  roughness: 0.5}),
    redMaterial: new THREE.MeshPhysicalMaterial({ color: 0xfa4848, wireframe: false, side: THREE.DoubleSide, metalness: 0.8,  roughness: 0.5 }),
    brownMaterial: new THREE.MeshPhysicalMaterial({ color: 0x806041, wireframe: false, metalness: 0.8,  roughness: 0.5 }),
    blackMaterial: new THREE.MeshPhysicalMaterial({ color: 0x000000, wireframe: false, metalness: 0.1,  roughness: 1 }),
}
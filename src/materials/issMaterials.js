import * as THREE from 'three'

export const issMaterials = {
    grayMaterial: new THREE.MeshPhysicalMaterial({ color: 'gray', wireframe: false, metalness: 0.5, roughness: 0.4 }),
    whiteMaterial:  new THREE.MeshPhysicalMaterial({ color: 0xffffff, wireframe: false, metalness: 0.5, roughness: 0.4 }),
    orangeMaterial:  new THREE.MeshPhysicalMaterial({ color: 0xe3be46, wireframe: false, side: THREE.DoubleSide }),
    blackMaterial: new THREE.MeshPhysicalMaterial({ color: 0x000000, wireframe: false, metalness: 0.5, roughness: 0.4}),
    lightGrayMaterial: new THREE.MeshPhysicalMaterial({ color: 0xbdbab1, wireframe: false }),
    blueMaterial: new THREE.MeshPhysicalMaterial({ color: 0x5b8dcf, wireframe: false, clearcoat: 0.8 }),
    silverMaterial: new THREE.MeshPhysicalMaterial({ color: 0xf2f2f2, wireframe: false }),
} 
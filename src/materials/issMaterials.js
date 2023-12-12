import * as THREE from 'three'

export const issMaterials = {
    grayMaterial: new THREE.MeshStandardMaterial({ color: 'gray', wireframe: false }),
    whiteMaterial:  new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false }),
    orangeMaterial:  new THREE.MeshStandardMaterial({ color: 0xe3be46, wireframe: false, side: THREE.DoubleSide }),
    blackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000, wireframe: false }),
    lightGrayMaterial: new THREE.MeshStandardMaterial({ color: 0xbdbab1, wireframe: false }),
    blueMaterial: new THREE.MeshStandardMaterial({ color: 0x5b8dcf, wireframe: false }),
    silverMaterial: new THREE.MeshStandardMaterial({ color: 0xf2f2f2, wireframe: false }),
} 
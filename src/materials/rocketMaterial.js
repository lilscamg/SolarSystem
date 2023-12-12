import * as THREE from 'three'

export const rocketMaterials = {
    grayMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }),
    redMaterial: new THREE.MeshStandardMaterial({ color: 0xfa4848, wireframe: false, side: THREE.DoubleSide }),
    brownMaterial: new THREE.MeshStandardMaterial({ color: 0x806041, wireframe: false }),
}
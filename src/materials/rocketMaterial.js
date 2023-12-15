import * as THREE from 'three'
import { RocketTextures } from '../textures/rocketTextures'

export const rocketMaterials = {
    grayMaterial: new THREE.MeshPhysicalMaterial({ color: 0xc0c4c2, wireframe: false, metalness: 0.5,  roughness: 0.5, map: RocketTextures.silverMetal}),
    whiteMaterial: new THREE.MeshPhysicalMaterial({ color: 0xffffff, wireframe: false, metalness: 0.8,  roughness: 0.5}),
    redMaterial: new THREE.MeshPhysicalMaterial({ color: 0xfa4848, wireframe: false, side: THREE.DoubleSide, metalness: 0.8,  roughness: 0.5, map: RocketTextures.redMetal }),
    brownMaterial: new THREE.MeshPhysicalMaterial({ color: 0x806041, wireframe: false, metalness: 0.8,  roughness: 0.5, map: RocketTextures.brownMetal }),
    blackMaterial: new THREE.MeshPhysicalMaterial({ color: 0x000000, wireframe: false, metalness: 0.2, reflectivity: 1, ior: 2.33 }),
}
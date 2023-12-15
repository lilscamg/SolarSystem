import * as THREE from 'three'
import { IssTextures } from '../textures/issTextures'

export const issMaterials = {
    grayMaterial: new THREE.MeshPhysicalMaterial({ color: 'gray', wireframe: false, metalness: 0.5, roughness: 0.4, map: IssTextures.darkMetal }),
    whiteMaterial:  new THREE.MeshPhysicalMaterial({ color: 0xffffff, wireframe: false, metalness: 0.5, roughness: 0.4, map: IssTextures.whiteMetal }),
    orangeMaterial:  new THREE.MeshPhysicalMaterial({ color: 0xe3be46, wireframe: false, roughness: 0.5, side: THREE.DoubleSide, map: IssTextures.panel }),
    blackMaterial: new THREE.MeshPhysicalMaterial({ color: 0x000000, wireframe: false, metalness: 0.5, roughness: 0.4}),
    lightGrayMaterial: new THREE.MeshPhysicalMaterial({ color: 0xbdbab1, wireframe: false}),
    blueMaterial: new THREE.MeshPhysicalMaterial({ color: 0x5b8dcf, wireframe: false, clearcoat: 0.8, map: IssTextures.panel }),
    silverMaterial: new THREE.MeshPhysicalMaterial({ color: 0xf2f2f2, wireframe: false,  map: IssTextures.panel  }),
    darkGrayMaterial: new THREE.MeshPhysicalMaterial({ color: 0x363434, wireframe: false, metalness: 0.5, roughness: 0.4, wireframe: true }),
} 
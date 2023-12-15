import * as THREE from 'three'

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

export const asteroidTextures = [
    textureLoader.load('/textures/other/asteroid.jpg'),
    textureLoader.load('/textures/other/asteroid2.jpg'),
    textureLoader.load('/textures/other/asteroid3.jpg'),
]
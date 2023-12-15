import * as THREE from 'three'

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

export const RocketTextures = {
    redMetal: textureLoader.load('/textures/rocket/red.jpg'),
    silverMetal: textureLoader.load('/textures/rocket/silver.jpg'),
    brownMetal: textureLoader.load('/textures/rocket/brown.jpg')
}
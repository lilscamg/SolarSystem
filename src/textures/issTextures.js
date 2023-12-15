import * as THREE from 'three'

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

export const IssTextures = {
    panel: textureLoader.load('/textures/other/bluePanel.png'),
    whiteMetal: textureLoader.load('/textures/other/whiteMetal.jpg'),
    darkMetal: textureLoader.load('/textures/other/darkMetal.jpg'),
}
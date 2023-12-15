import * as THREE from 'three'

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

export const PlanetTextures = {
    planets: {
        Sun: textureLoader.load('/textures/planets/sun8k.jpg'),
        Earth: textureLoader.load('/textures/planets/earth8k.jpg'),
        Saturn: textureLoader.load('/textures/planets/saturn8k.jpg'),
        Jupiter: textureLoader.load('/textures/planets/jupiter8k.jpg'),
        Mars: textureLoader.load('/textures/planets/mars8k.jpg'),
        Mercury: textureLoader.load('/textures/planets/mercury8k.jpg'),
        Neptune: textureLoader.load('/textures/planets/neptune2k.jpg'),
        Uranus: textureLoader.load('/textures/planets/uranus2k.jpg'),
        Venus: textureLoader.load('/textures/planets/venus8k.jpg')
    },
    rings: {
        SaturnRings: textureLoader.load('/textures/rings/saturn ring.png'),
        UranusRings: textureLoader.load('/textures/rings/uranus ring.png'),
    }
}
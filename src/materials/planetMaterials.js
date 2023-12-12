import * as THREE from 'three'
import { PlanetTextures } from '../textures/planetTextures'

const planetTextures = PlanetTextures;

export const PlanetMaterials = {
    planets: {
        Earth: new THREE.MeshStandardMaterial({map: planetTextures.planets.Earth}),
        Sun: new THREE.MeshStandardMaterial({map: planetTextures.planets.Sun, side: THREE.DoubleSide}),
        Saturn: new THREE.MeshStandardMaterial({map: planetTextures.planets.Saturn}),
        Jupiter: new THREE.MeshStandardMaterial({map: planetTextures.planets.Jupiter}),
        Mars: new THREE.MeshStandardMaterial({map: planetTextures.planets.Mars}),
        Mercury: new THREE.MeshStandardMaterial({map: planetTextures.planets.Mercury}),
        Neptune: new THREE.MeshStandardMaterial({map: planetTextures.planets.Neptune}),
        Uranus: new THREE.MeshStandardMaterial({map: planetTextures.planets.Uranus}),
        Venus: new THREE.MeshStandardMaterial({map: planetTextures.planets.Venus}),
    },
    rings: {
        Saturn: new THREE.MeshStandardMaterial({map: planetTextures.rings.SaturnRings, side: THREE.DoubleSide})
    }
}
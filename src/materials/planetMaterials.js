import * as THREE from 'three'
import { PlanetTextures } from '../textures/planetTextures'

const planetTextures = PlanetTextures;

export const PlanetMaterials = {
    planets: {
        Earth: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Earth}),
        Sun: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Sun, side: THREE.FrontSide}),
        Saturn: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Saturn}),
        Jupiter: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Jupiter}),
        Mars: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Mars}),
        Mercury: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Mercury}),
        Neptune: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Neptune}),
        Uranus: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Uranus}),
        Venus: new THREE.MeshPhysicalMaterial({map: planetTextures.planets.Venus}),
    },
    rings: {
        Saturn: new THREE.MeshPhysicalMaterial({map: planetTextures.rings.SaturnRings, side: THREE.DoubleSide}),
        Uranus: new THREE.MeshPhysicalMaterial({map: planetTextures.rings.UranusRings, side: THREE.DoubleSide}),
    }
}
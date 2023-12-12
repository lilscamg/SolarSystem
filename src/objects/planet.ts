import * as THREE from 'three';
import { PlanetParameters, RingParameters } from '../parameters/parameters';
import { PlanetMaterials } from '../materials/planetMaterials';

export function createPlanet(name: string, isReal: boolean, isStar: boolean = false, ringsAngle: any = null) {

    const radius = !isReal ? PlanetParameters.fancyRadiuses[name] : PlanetParameters.realRadiuses[name];
    const sphereGeometry = new THREE.SphereGeometry(radius);
    const sphereMaterial = PlanetMaterials.planets[name];
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = !isStar;

    if (!ringsAngle) {
        sphere.name = name;
        return sphere;
    }
    else {
        const group = new THREE.Group();
        const ringsGeometry = new THREE.RingGeometry(RingParameters.innerRadiuses[name] * radius, RingParameters.outerRadiuses[name] * radius)
        const ringsMaterial = PlanetMaterials.rings[name];
        const rings = new THREE.Mesh(ringsGeometry, ringsMaterial);
        rings.rotation[ringsAngle.axis] = ringsAngle.angle;
        rings.castShadow = true;
        rings.receiveShadow = true;
        group.add(sphere, rings);
        return group;
    }
}
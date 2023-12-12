import * as THREE from 'three'

export interface SpaceObject {
    geometry: THREE.BufferGeometry;
    material: THREE.MeshStandardMaterial;
    mesh: THREE.Mesh;
}   

export class SphereObject implements SpaceObject {
    public geometry: THREE.SphereGeometry;
    public material: THREE.MeshStandardMaterial;
    public mesh: THREE.Mesh;

    public radius: number;
    public sunSpeed: number;
    public axisSpeed: number;
    public distanceToSun: number;

    constructor(
        material: THREE.MeshStandardMaterial,
        radius: number, 
        sunSpeed: number, 
        axisSpeed: number, 
        distanceToSun: number) {

        let t = this;

        t.radius = radius;
        t.sunSpeed = sunSpeed;
        t.axisSpeed = axisSpeed;
        t.distanceToSun = distanceToSun;
    
        t.geometry = new THREE.SphereGeometry(t.radius);
        t.material = material;
        // t.mesh = new THREE.Mesh(t.geometry, material);
    }
}

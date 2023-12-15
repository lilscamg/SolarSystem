import * as THREE from 'three'
import { asteroidParameters } from '../parameters/parameters';
import { asteroidTextures } from '../textures/asteroidTextures';

const particlesCount = 300;

function getRandomColorRGB() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return new THREE.Color(r / 255, g / 255, b / 255);
}

export function createAsteroid(maxSize) {
    let randomRadius = Math.random() * maxSize;
    let randomDetail = Math.round(Math.random() * 5); 
    let randomTexture = asteroidTextures[Math.round(Math.random() * asteroidTextures.length)];

    const material = new THREE.MeshPhysicalMaterial({ color: asteroidParameters.color, roughness: 1, map: randomTexture });
    const geometry = new THREE.OctahedronGeometry(randomRadius, randomDetail);
    const mesh = new THREE.Mesh(geometry, material);

    let particlesPosArr = [];
    for (let i = 0; i < particlesCount; i++) {
        let radius = Math.round(Math.random() * 5) + randomRadius;
        let theta = Math.random() * Math.PI * 2;
        let phi = Math.random() * Math.PI;  

        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi); 

        particlesPosArr.push(x, y, z);
    }

    var particles = new THREE.BufferGeometry();
    particles.setAttribute('position', new THREE.Float32BufferAttribute(particlesPosArr, 1));

    var particleMaterial = new THREE.PointsMaterial({ color: getRandomColorRGB(), size: 0.3 });
    var particleSystem = new THREE.Points(particles, particleMaterial);
    
    const asteroid = new THREE.Group();
    asteroid.add(mesh, particleSystem);
    return asteroid;
}
import * as THREE from 'three'
import { asteroidParameters } from '../parameters/parameters';

function getRandomSpread(maxSpread) {
    let spread = Math.round((Math.random() * 2 - 1) * maxSpread);
    return spread;
}

export function createAsteroidBelt(isReal) {

    // Геометрия и материал для астероидов (вы можете использовать свою текстуру)
    const asteroidGeometry = new THREE.BufferGeometry();
    const asteroidMaterial = new THREE.PointsMaterial({ color: asteroidParameters.color, size: 3});

    
    let radius = isReal ? asteroidParameters.belt.radius.realRadius : asteroidParameters.belt.radius.fancyRadius;
    let number = isReal ? asteroidParameters.belt.number.realNumber : asteroidParameters.belt.number.fancyNumber;
    let maxSpread = isReal ? asteroidParameters.belt.spread.realSpread : asteroidParameters.belt.spread.fancySpread;

    const positions = new Float32Array(radius * 3);
    // Создаем случайные координаты для астероидов в виде кольца
    for (let i = 0; i < number; i++) {
        
        const angle = Math.random() * Math.PI * 2;

        const x = radius * Math.cos(angle) + getRandomSpread(maxSpread);
        const y = getRandomSpread(maxSpread); // Астероиды находятся в одной плоскости
        const z = radius * Math.sin(angle) + getRandomSpread(maxSpread);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    // Устанавливаем атрибуты для геометрии
    asteroidGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Создаем объект астероидов
    const asteroidBelt = new THREE.Points(asteroidGeometry, asteroidMaterial);

    return asteroidBelt;
}
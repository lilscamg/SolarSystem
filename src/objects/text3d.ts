import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export function createText(text: string, size: number, color: any, position: THREE.Vector3) {
    
    return new Promise((resolve, reject) => {
        const fontLoader = new FontLoader();
        fontLoader.load(
            '/fonts/helvetiker_regular.typeface.json',
            (font) => {
                const sceneTitleGeometry = new TextGeometry(text, {
                    font: font,
                    size: size
                });
                const sceneTitleMaterial = new THREE.MeshStandardMaterial({ color: color});
                const sceneTitle = new THREE.Mesh(sceneTitleGeometry, sceneTitleMaterial);
                sceneTitle.position.set(position.x, position.y, position.z);
                sceneTitle.rotation.y = -Math.PI / 2
                resolve(sceneTitle);
            },
            undefined,
            (error) => {
                console.error('Error loading font', error);
                reject(error);
            }
        )
    })
    
}
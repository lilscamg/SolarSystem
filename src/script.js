import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import * as dat from 'lil-gui'
import { PlanetParameters } from './parameters/planetParameters';
import { PlanetMaterials } from './materials/planetMaterials';

/**
 * Debug
 */
const gui = new dat.GUI()


/**
 * Создание сцены
 */
const scene = new THREE.Scene();


/**
 * Звезды
 */
const starsTexture = 'textures/other/stars.jpg'
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);


/**
 * Канвас
 */
const canvas = document.querySelector('canvas.webgl');
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
})


/**
 * Параметры объектов
 */
const planetParameters = PlanetParameters;
gui.add(planetParameters.radiuses, 'Sun').min(1).max(109).step(1).name('Sun radius').onChange(() => {
    let newGeometry = new THREE.SphereGeometry(planetParameters.radiuses.Sun);
    Sun.geometry = newGeometry;
});
gui.add(planetParameters.radiuses, 'Earth').min(1).max(109).step(1).name('Earth radius').onChange(() => {
    let newGeometry = new THREE.SphereGeometry(planetParameters.radiuses.Earth);
    Earth.geometry = newGeometry;
});


/**
 * Материалы
 */
const planetMaterials = PlanetMaterials;


////////////////////////////////////////////// Создание объектов

/** 
* Sun
*/
const Sun = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Sun), planetMaterials.planets.Sun)
Sun.position.set(0, 0, 0);
scene.add(Sun);


/**
 * Earth
 */
const Earth = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Earth), planetMaterials.planets.Earth);
Earth.position.set(-300, 0, 0);
scene.add(Earth);


/**
 * Saturn
 */
const Saturn = new THREE.Group();
const saturnSphere = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Saturn), planetMaterials.planets.Saturn);
const saturnRings = new THREE.Mesh(new THREE.RingGeometry(planetParameters.ringRadiuses.Saturn - 5, planetParameters.ringRadiuses.Saturn), planetMaterials.rings.Saturn);
saturnRings.rotation.x = Math.PI * (1/2)
Saturn.add(saturnSphere, saturnRings);
Saturn.position.set(200, 0, 0)
Sun.add(Saturn);


/**
 * Jupiter
 */
const Jupiter = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Jupiter), planetMaterials.planets.Jupiter)
Jupiter.position.set(0, 0, 200);
scene.add(Jupiter);


/**
 * Mars
 */
const Mars = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Mars), planetMaterials.planets.Mars)
Mars.position.set(150, 0, 150);
scene.add(Mars);


/**
 * Mercury
 */
const Mercury = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Mercury), planetMaterials.planets.Mercury)
Mercury.position.set(-150, 0, 150);
scene.add(Mercury);


/**
 * Neptune 
 */
const Neptune = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Neptune), planetMaterials.planets.Neptune)
Neptune.position.set(-350, 0, 10);
scene.add(Neptune);


/**
 * Uranus 
 */
const Uranus = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Uranus), planetMaterials.planets.Uranus)
Uranus.position.set(-170, 0, 150);
scene.add(Uranus);


/**
 * Venus 
 */
const Venus = new THREE.Mesh(new THREE.SphereGeometry(planetParameters.radiuses.Venus), planetMaterials.planets.Venus)
Venus.position.set(0, 0, -200);
scene.add(Venus);


/**
 * 3д текст
 */
const fontLoader = new FontLoader();
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const sceneTitleGeometry = new TextGeometry('Solar system by Khafizov Bulat', {
            font: font,
        });
        const sceneTitleMaterial = new THREE.MeshStandardMaterial({ color: 'pink', wireframe: false});
        const sceneTitle = new THREE.Mesh(sceneTitleGeometry, sceneTitleMaterial);
        sceneTitle.position.set(1000, 0, -1000);
        sceneTitle.rotation.y = -Math.PI / 2
        scene.add(sceneTitle);
    }
)


////////////////////////////////////////////// Создание объектов


/**
 * Свет
 */
const pointLight = new THREE.PointLight(0xffffff, 1, 500);
gui.add(pointLight, 'intensity').min(1).max(1000000).step(1).name('point light intensity');
gui.add(pointLight, 'distance').min(1).max(100000).step(1).name('point light distance');;
pointLight.position.set(0, 0, 0); // Позиция света внутри объекта
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('ambient light intensity');
scene.add(ambientLight);


/**
 * Параметры камеры
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener("resize", (event) => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);   
})


/** 
* Камера
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.set(200, 100, 0);
scene.add(camera);


/** 
* Axes helper
*/
const axesHelper = new THREE.AxesHelper(1000);
axesHelper.visible = false;
gui.add(axesHelper, 'visible').name('Axis');
scene.add(axesHelper)


/** 
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


/**
 * Clock
 */
// const clock = new THREE.Clock();


/**
 * Animation
 */
gsap.to(Sun.rotation, {delay: 0, duration: 1000, y: -10 })
gsap.to(Earth.rotation, {delay: 0, duration: 200, y: -100})

// const cursor = {
//     x: 0,
//     y: 0
// }
// window.addEventListener('mousemove', event => {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = -(event.clientY / sizes.height - 0.5)
// })

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target = Sun.position;
// const controls = new FirstPersonControls(camera, canvas);
// controls.movementSpeed = 10;
// controls.lookSpeed = 0.05;
// controls.activeLook = true


/**
 * Анимация
 */
const tick = () => {

    // const elapsedTime = clock.getElapsedTime()
    // Sun.rotation.y = elapsedTime / 2;
    // Earth.rotation.y = elapsedTime;
    // Earth.position.x = Math.cos(elapsedTime);
    // Earth.position.y = Math.sin(elapsedTime);

    // Update controls  
    controls.update()

    // заново отрендерить в каждом тике
    renderer.render(scene, camera);    
    window.requestAnimationFrame(tick)
}

// запуск анимации
tick();
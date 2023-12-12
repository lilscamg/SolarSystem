import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import * as dat from 'lil-gui'
import { PlanetParameters, RingParameters } from './parameters/planetParameters';
import { PlanetMaterials } from './materials/planetMaterials';
import { config } from './config';
import { ISS } from './objects3d/iss'


//#region GUI
const gui = new dat.GUI()
//#endregion


//#region Сцена
const scene = new THREE.Scene();
//#endregion


//#region Звезды
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
//#endregion


//#region Канвас
const canvas = document.querySelector('canvas.webgl');
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
})
//#endregion


//#region Материалы объектов
const planetMaterials = PlanetMaterials;
//#endregion


//#region Параметры объектов
const planetParameters = PlanetParameters;
const ringParameters = RingParameters;

let planetRadiuses = config.isReal ? planetParameters.realRadiuses : planetParameters.fancyRadiuses;
let planetDistances = config.isReal ? planetParameters.realDistanceToSun : planetParameters.fancyDistanceToSun; 

gui.add(config, 'stopMoving');
gui.add(config, 'stopRotation');

gui.add(config, 'showStars').name('Show stars?').onChange(() => {
    if (config.showStars) {
        scene.background = cubeTextureLoader.load([
            starsTexture,
            starsTexture,
            starsTexture,
            starsTexture,
            starsTexture,
            starsTexture
        ]);
    }
    else
        scene.background = null;
})

gui.add(config, 'isReal').name('Is real?').onChange(() => {
    planetRadiuses = config.isReal ? planetParameters.realRadiuses : planetParameters.fancyRadiuses;
    planetDistances = config.isReal ? planetParameters.realDistanceToSun : planetParameters.fancyDistanceToSun; 

    sphereObjects.forEach(x => {
        let newRadius = planetRadiuses[x.name];

        if (x instanceof THREE.Group) {
            let newSphereGeometry = new THREE.SphereGeometry(newRadius);
            let newRingsGeometry = new THREE.RingGeometry(
                ringParameters.innerRadiuses[x.name] * newRadius, 
                ringParameters.outerRadiuses[x.name] * newRadius)
            // x.children[0] = newSphereGeometry;
            // x.children[1] = newRingsGeometry;
        }
        else {
            
            let newGeometry = new THREE.SphereGeometry(newRadius);
            x.geometry = newGeometry;
        }
    });
});

// gui.add(planetRadiuses, 'Sun').min(1).max(109).step(1).name('Sun radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Sun);
//     Sun.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Earth').min(1).max(109).step(1).name('Earth radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Earth);
//     Earth.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Saturn').min(1).max(109).step(1).name('Saturn radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Saturn);
//     saturnSphere.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Jupiter').min(1).max(109).step(1).name('Jupiter radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Jupiter);
//     Jupiter.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Mercury').min(1).max(109).step(1).name('Mercury radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Mercury);
//     Mercury.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Uranus').min(1).max(109).step(1).name('Uranus radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Uranus);
//     Uranus.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Neptune').min(1).max(109).step(1).name('Neptune radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Neptune);
//     Neptune.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Mars').min(1).max(109).step(1).name('Mars radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Mars);
//     Mars.geometry = newGeometry;
// });
// gui.add(planetRadiuses, 'Venus').min(1).max(109).step(1).name('Venus radius').onChange(() => {
//     let newGeometry = new THREE.SphereGeometry(planetRadiuses.Venus);
//     Venus.geometry = newGeometry;
// });
//#endregion


//#region Создание объектов
let sphereObjects = []

//#region Sun
const Sun = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Sun), planetMaterials.planets.Sun);
Sun.name = 'Sun';
Sun.position.set(planetDistances.Sun, 0, 0);
Sun.castShadow = true;
Sun.visible = false;

scene.add(Sun);
sphereObjects.push(Sun);
//#endregion

//#region Mercury
const Mercury = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Mercury), planetMaterials.planets.Mercury);
Mercury.name = 'Mercury';
Mercury.position.set(planetDistances.Mercury, 0, 0);
Mercury.castShadow = true;
Mercury.receiveShadow = true;

scene.add(Mercury);
sphereObjects.push(Mercury);
//#endregion

//#region Venus
const Venus = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Venus), planetMaterials.planets.Venus);
Venus.name = 'Venus';
Venus.position.set(planetDistances.Venus, 0, 0);
Venus.castShadow = true;
Venus.receiveShadow = true;

scene.add(Venus);
sphereObjects.push(Venus);
//#endregion

//#region Earth
const Earth = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Earth), planetMaterials.planets.Earth);
Earth.name = 'Earth';
Earth.position.set(planetDistances.Earth, 0, 0);
Earth.castShadow = true;
Earth.receiveShadow = true;

scene.add(Earth);
sphereObjects.push(Earth);
//#endregion

//#region Mars
const Mars = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Mars), planetMaterials.planets.Mars);
Mars.name = 'Mars';
Mars.position.set(planetDistances.Mars, 0, 0);
Mars.castShadow = true;
Mars.receiveShadow = true;

scene.add(Mars);
sphereObjects.push(Mars);
//#endregion

//#region Jupiter
const Jupiter = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Jupiter), planetMaterials.planets.Jupiter);
Jupiter.name = 'Jupiter';
Jupiter.position.set(planetDistances.Jupiter, 0, 0);
Jupiter.castShadow = true;
Jupiter.receiveShadow = true;

scene.add(Jupiter);
sphereObjects.push(Jupiter);
//#endregion

//#region Saturn
const Saturn = new THREE.Group();
Saturn.name = 'Saturn';
const saturnSphere = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Saturn), planetMaterials.planets.Saturn);

const saturnRings = new THREE.Mesh(
    new THREE.RingGeometry(
        ringParameters.innerRadiuses.Saturn * planetRadiuses.Saturn, 
        ringParameters.outerRadiuses.Saturn * planetRadiuses.Saturn), 
    planetMaterials.rings.Saturn);
saturnRings.rotation.x = Math.PI * (1/2);

Saturn.add(saturnSphere, saturnRings);
Saturn.position.set(planetDistances.Saturn, 0, 0)
Saturn.castShadow = true;
Saturn.receiveShadow = true;

scene.add(Saturn);
sphereObjects.push(Saturn);
//#endregion

//#region Uranus
const Uranus = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Uranus), planetMaterials.planets.Uranus);
Uranus.name = 'Uranus';
Uranus.position.set(planetDistances.Uranus, 0, 0);
Uranus.castShadow = true;
Uranus.receiveShadow = true;

scene.add(Uranus);
sphereObjects.push(Uranus);
//#endregion

//#region Neptune
const Neptune = new THREE.Mesh(new THREE.SphereGeometry(planetRadiuses.Neptune), planetMaterials.planets.Neptune);
Neptune.name = 'Neptune';
Neptune.position.set(planetDistances.Neptune, 0, 0);
Neptune.castShadow = true;
Neptune.receiveShadow = true;

scene.add(Neptune);
sphereObjects.push(Neptune);
//#endregion

//#region 3d text
const fontLoader = new FontLoader();
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const sceneTitleGeometry = new TextGeometry('SOLAR SYSTEM', {
            font: font,
            size: 1000
        });
        const sceneTitleMaterial = new THREE.MeshStandardMaterial({ color: 'blue', wireframe: false});
        const sceneTitle = new THREE.Mesh(sceneTitleGeometry, sceneTitleMaterial);
        sceneTitle.position.set(13000, 200, -6000);
        sceneTitle.rotation.y = -Math.PI / 2
        scene.add(sceneTitle);
    }
)
//#endregion

//#region ISS
ISS.scale.set(0.1, 0.1, 0.1)
scene.add(ISS);
ISS.position.set(Earth.position.x + planetRadiuses.Earth + 5, 0, 0)
//#endregion


//#region Свет
const pointLight = new THREE.PointLight(0xffffff, 1, 500);
gui.add(pointLight, 'intensity').min(1).max(1000000).step(1).name('point light intensity');
gui.add(pointLight, 'distance').min(1).max(100000).step(1).name('point light distance');;
pointLight.position.set(0, 0, 0); // Позиция света внутри объекта
scene.add(pointLight);

const sunLight = new THREE.PointLight(0xffffff, 1, 15000);
sunLight.position.set(Sun.position);
sunLight.castShadow = true;
scene.add(sunLight)

const ambientLight = new THREE.AmbientLight(0x404040, 30); // Цвет окружающего света
scene.add(ambientLight);
//#endregion


//#region Параметры камеры
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
//#endregion


//#region Камера
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 20000);
camera.position.set(200, 100, 0);
scene.add(camera);
camera.position.set(0, 50, 0);
//#endregion


//#region Axis helper
const axesHelper = new THREE.AxesHelper(1000);
axesHelper.visible = true;
gui.add(axesHelper, 'visible').name('Axis helper');
scene.add(axesHelper)
//#endregion


//#region Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.render(scene, camera);
//#endregion


//#region Clock
const clock = new THREE.Clock();
//#endregion


/**
 * Animation
 */
// gsap.to(Sun.rotation, {delay: 0, duration: 1000, y: -10 })
// gsap.to(Earth.rotation, {delay: 0, duration: 200, y: -100})


//#region Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target = Earth.position;
gui.add(config, 'objectNumberToObserve').min(0).max(sphereObjects.length - 1).step(1).name('Observe object number').onChange(() => {
    controls.target = sphereObjects[config.objectNumberToObserve].position;
})
//#endregion


//#region Анимация
const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    if (!config.stopMoving) {
        
        // Mercury
        Mercury.position.x = planetDistances.Mercury * Math.cos(elapsedTime * planetParameters.sunSpeed.Mercury);
        Mercury.position.z = planetDistances.Mercury * Math.sin(elapsedTime * planetParameters.sunSpeed.Mercury);

        // Venus
        Venus.position.x = planetDistances.Venus * Math.cos(elapsedTime * planetParameters.sunSpeed.Venus);
        Venus.position.z = planetDistances.Venus * Math.sin(elapsedTime * planetParameters.sunSpeed.Venus);

        // Earth
        Earth.position.x = planetDistances.Earth * Math.cos(elapsedTime * planetParameters.sunSpeed.Earth);
        Earth.position.z = planetDistances.Earth * Math.sin(elapsedTime * planetParameters.sunSpeed.Earth);

        // ISS
        ISS.position.x = Earth.position.x + planetRadiuses.Earth * 1.2 * Math.cos(elapsedTime * planetParameters.sunSpeed.Earth * 1.1);
        ISS.position.z = Earth.position.z + planetRadiuses.Earth * 1.2 * Math.sin(elapsedTime * planetParameters.sunSpeed.Earth * 1.1);


        // Mars
        Mars.position.x = planetDistances.Mars * Math.cos(elapsedTime * planetParameters.sunSpeed.Mars);
        Mars.position.z = planetDistances.Mars * Math.sin(elapsedTime * planetParameters.sunSpeed.Mars);

        // Jupiter
        Jupiter.position.x = planetDistances.Jupiter * Math.cos(elapsedTime * planetParameters.sunSpeed.Jupiter);
        Jupiter.position.z = planetDistances.Jupiter * Math.sin(elapsedTime * planetParameters.sunSpeed.Jupiter);

        // Saturn
        Saturn.position.x = planetDistances.Saturn * Math.cos(elapsedTime * planetParameters.sunSpeed.Saturn);
        Saturn.position.z = planetDistances.Saturn * Math.sin(elapsedTime * planetParameters.sunSpeed.Saturn);

        // Uranus
        Uranus.position.x = planetDistances.Uranus * Math.cos(elapsedTime * planetParameters.sunSpeed.Uranus);
        Uranus.position.z = planetDistances.Uranus * Math.sin(elapsedTime * planetParameters.sunSpeed.Uranus);

        // Neptune
        Neptune.position.x = planetDistances.Neptune * Math.cos(elapsedTime * planetParameters.sunSpeed.Neptune);
        Neptune.position.z = planetDistances.Neptune * Math.sin(elapsedTime * planetParameters.sunSpeed.Neptune);
    }

    if (!config.stopRotation) {
        Sun.rotation.y = elapsedTime / 2;
        Mercury.rotation.y = elapsedTime * planetParameters.axisSpeed.Mercury;
        Venus.rotation.y = elapsedTime * planetParameters.axisSpeed.Venus;
        Earth.rotation.y = elapsedTime * planetParameters.axisSpeed.Earth;
        Mars.rotation.y = elapsedTime * planetParameters.axisSpeed.Mars;
        Jupiter.rotation.y = elapsedTime * planetParameters.axisSpeed.Jupiter;
        Saturn.rotation.y = elapsedTime * planetParameters.axisSpeed.Saturn;
        Uranus.rotation.y = elapsedTime * planetParameters.axisSpeed.Uranus;
        Neptune.rotation.y = elapsedTime * planetParameters.axisSpeed.Neptune;
    }

    // Update controls  
    controls.update()

    // заново отрендерить в каждом тике
    renderer.render(scene, camera);    
    window.requestAnimationFrame(tick)
}
//#endregion


// запуск анимации
tick();
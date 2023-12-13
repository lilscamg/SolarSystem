import gsap from 'gsap'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { PlanetParameters, RingParameters, issParameters } from './parameters/parameters';
import { createISS } from './objects/iss'
import { createPlanet } from './objects/planet';
import { createRocket } from './objects/rocket';
import { createText } from './objects/text3d';
import { config } from './config';

function getRandomAngle() {
    return Math.random() * 2 * Math.PI;
}


//#region GUI
const gui = new dat.GUI()
//#endregion


//#region Сцена
const scene = new THREE.Scene();
//#endregion


//#region Axis helper
const axesHelper = new THREE.AxesHelper(1000);
axesHelper.visible = false;
gui.add(axesHelper, 'visible').name('Axis helper');
scene.add(axesHelper)
//#endregion


//#region Звезды
const starsTexture = 'textures/other/stars.jpg'
const cubeTextureLoader = new THREE.CubeTextureLoader();
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
gui.add(config, 'showStars').name('Show stars').onChange(() => {
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


//#region Параметры объектов
const planetParameters = PlanetParameters;
const ringParameters = RingParameters;

let planetRadiuses = config.isReal ? planetParameters.realRadiuses : planetParameters.fancyRadiuses;
let planetDistances = config.isReal ? planetParameters.realDistanceToSun : planetParameters.fancyDistanceToSun; 

gui.add(config, 'stopMoving').name('Stop moving');
gui.add(config, 'stopRotation').name('Stop rotating');
gui.add(config, 'isReal').name('Is real').onChange(() => {
    // planets
    planetRadiuses = config.isReal ? planetParameters.realRadiuses : planetParameters.fancyRadiuses;
    planetDistances = config.isReal ? planetParameters.realDistanceToSun : planetParameters.fancyDistanceToSun; 

    sphereObjects.forEach(x => {
        let newRadius = planetRadiuses[x.name];
    
        if (x instanceof THREE.Group) {
            let newSphereGeometry = new THREE.SphereGeometry(newRadius);
            let newRingsGeometry = new THREE.RingGeometry(
                ringParameters.innerRadiuses[x.name] * newRadius, 
                ringParameters.outerRadiuses[x.name] * newRadius)
            x.children[0].geometry = newSphereGeometry;
            x.children[1].geometry = newRingsGeometry;   
        }
        else {
            let newGeometry = new THREE.SphereGeometry(newRadius);
            x.geometry = newGeometry;
        }
        
    });

    // iss
    issDistance = planetRadiuses.Earth + (config.isReal ? issParameters.distance.realDistance : issParameters.distance.fancyDistance);
    let issScale = config.isReal ? new THREE.Vector3(1, 1, 1).divideScalar(issParameters.size.realSize) :  new THREE.Vector3(1, 1, 1).divideScalar(issParameters.size.fancySize);
    issSpeed = config.isReal ? issParameters.realSpeed : issParameters.speed.fancySpeed;
    ISS.scale.set(issScale.x, issScale.y, issScale.z);
    ISS.position.set(Earth.position.x + issDistance, 0, Earth.position.z)
});
//#endregion


//#region Создание объектов
let sphereObjects = []

//#region Sun
let Sun = createPlanet('Sun', config.isReal, true);
scene.add(Sun);
sphereObjects.push(Sun);
//#endregion

//#region Mercury
let Mercury = createPlanet('Mercury', config.isReal, false);
Mercury.position.set(planetDistances.Mercury * Math.cos(getRandomAngle()), 0, planetDistances.Mercury * Math.sin(getRandomAngle()));
scene.add(Mercury);
sphereObjects.push(Mercury);
//#endregion

//#region Venus
let Venus = createPlanet('Venus', config.isReal, false);
Venus.position.set(planetDistances.Venus * Math.cos(getRandomAngle()), 0, planetDistances.Venus * Math.sin(getRandomAngle()));
scene.add(Venus);
sphereObjects.push(Venus);
//#endregion

//#region Earth
let Earth = createPlanet('Earth', config.isReal, false);
Earth.position.set(planetDistances.Earth * Math.cos(getRandomAngle()), 0, planetDistances.Earth * Math.sin(getRandomAngle()));
scene.add(Earth);
sphereObjects.push(Earth);
//#endregion

//#region Mars
let Mars = createPlanet('Mars', config.isReal, false);
Mars.position.set(planetDistances.Mars * Math.cos(getRandomAngle()), 0, planetDistances.Mars * Math.sin(getRandomAngle()));
scene.add(Mars);
sphereObjects.push(Mars);
//#endregion

//#region Jupiter
let Jupiter = createPlanet('Jupiter', config.isReal, false);
Jupiter.position.set(planetDistances.Jupiter * Math.cos(getRandomAngle()), 0, planetDistances.Jupiter * Math.sin(getRandomAngle()));
scene.add(Jupiter);
sphereObjects.push(Jupiter);
//#endregion

//#region Saturn
let Saturn = createPlanet('Saturn', config.isReal, false, { axis: 'x', angle: Math.PI * (1/2)});
Saturn.position.set(planetDistances.Saturn * Math.cos(getRandomAngle()), 0, planetDistances.Saturn * Math.sin(getRandomAngle()));
scene.add(Saturn);
sphereObjects.push(Saturn);
//#endregion

//#region Uranus
let Uranus = createPlanet('Uranus', config.isReal, false);
Uranus.position.set(planetDistances.Uranus, 0, 0);
scene.add(Uranus);
sphereObjects.push(Uranus);
//#endregion

//#region Neptune
let Neptune = createPlanet('Neptune', config.isReal, false);
Neptune.position.set(planetDistances.Neptune, 0, 0);
scene.add(Neptune);
sphereObjects.push(Neptune);
//#endregion

sphereObjects.forEach(x => {
    x.visible = config.showPlanets;
})
gui.add(config, 'showPlanets').name('Show planets').onChange(() => {
    sphereObjects.forEach(x => {
        x.visible = config.showPlanets;
    })
})
gui.add(config, 'showSun').name('Show Sun').onChange(() => {
    if (config.showSun)
        scene.remove(Sun);
    else 
        scene.add(Sun);
})

//#region 3d text
createText('SOLAR SYSTEM', 1000, 'blue', new THREE.Vector3(13000, 200, -600))
    .then(sceneTitle => {
        scene.add(sceneTitle);
    })
    .catch(error => {
        console.error('Failed to create text:', error);
    });
//#endregion

//#region ISS
let ISS = createISS(config.isReal);
let issDistance = planetRadiuses.Earth + (config.isReal ? issParameters.distance.realDistance : issParameters.distance.fancyDistance);
let issSpeed = config.isReal ? issParameters.speed.realSpeed : issParameters.speed.fancySpeed;
ISS.position.set(Earth.position.x + issDistance, 0, Earth.position.z);
scene.add(ISS);
gui.add(config, 'stopIss').name('Stop ISS');
//#endregion

//#region Rocket
let Rocket = createRocket();
Rocket.position.set(300, 300, 0);
Rocket.rotateZ(Math.PI / 2)
scene.add(Rocket);
//#endregion

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
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.001, 20000);
camera.position.set(200, 100, 0);
scene.add(camera);
camera.position.set(0, 50, 0);
//#endregion


//#region Свет
const pointLight = new THREE.PointLight(0xffffff, 350000, 100000);
gui.add(pointLight, 'intensity').min(1).max(1000000).step(1).name('point light intensity');
pointLight.position.set(0, 0, 0); // Позиция света внутри объекта
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
// pointLight.shadow.radius = 5;
Sun.receiveShadow = false;
Sun.castShadow = false;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 35); // Цвет окружающего света
gui.add(ambientLight, 'intensity').min(0).max(100).step(1).name('ambient light intensity');
scene.add(ambientLight);
//#endregion


//#region Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.outputColorSpace = THREE.LinearDisplayP3ColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
controls.target = ISS.position;
gui.add(config, 'objectNumberToObserve').min(0).max(sphereObjects.length - 1).step(1).name('Observe object number').onChange(() => {
    controls.target = sphereObjects[config.objectNumberToObserve].position;
})
//#endregion


//#region Анимация
const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    if (!config.stopIss) {
        // ISS
        ISS.position.x = Earth.position.x + (issDistance) * Math.cos(elapsedTime * issSpeed);
        ISS.position.z = Earth.position.z + (issDistance) * Math.sin(elapsedTime * issSpeed);
        
    }
    
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
        ISS.rotation.y = elapsedTime / 3;
        Rocket.rotation.x = elapsedTime / 4;
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
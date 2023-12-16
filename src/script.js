import gsap from 'gsap'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { PlanetParameters, RingParameters, asteroidParameters, issParameters, rocketParameters } from './parameters/parameters';
import { createISS } from './objects/iss'
import { createPlanet } from './objects/planet';
import { createRocket } from './objects/rocket';
import { createAsteroid } from './objects/asteroid';
import { createAsteroidBelt } from './objects/asteroidBelt';
import { createText } from './objects/text3d';
import { config } from './config';
import { rocketMaterials } from './materials/rocketMaterial';

function getRandomAngle() {
    return Math.random() * 2 * Math.PI;
}


//#region GUI
const gui = new dat.GUI();
const defailtFolder = gui.addFolder('Default settings');
//#endregion


//#region Сцена
const scene = new THREE.Scene();
//#endregion


//#region Axis helper
const axesHelper = new THREE.AxesHelper(1000);
if (!config.showAxes)
    axesHelper.visible = false;
defailtFolder.add(axesHelper, 'visible').name('Show axes');
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
defailtFolder.add(config, 'showStars').name('Show stars').onChange(() => {
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

defailtFolder.add(config, 'stopMoving').name('Stop moving');
defailtFolder.add(config, 'stopRotation').name('Stop rotating');
defailtFolder.add(config, 'isReal').name('Is real').onChange(() => {
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

    // Rocket
    rocketSize = config.isReal? rocketParameters.size.realSize : rocketParameters.size.fancySize;
    Rocket.scale.set(rocketSize, rocketSize, rocketSize);

    // asteroid belt
    scene.remove(asteroidBelt);
    asteroidBelt.material.dispose();
    asteroidBelt.geometry.dispose();
    asteroidBelt = null;
    asteroidBelt = createAsteroidBelt(config.isReal);
    scene.add(asteroidBelt);
});
//#endregion


//#region Создание объектов
let sphereObjects = [];
let angle;

//#region Sun
let Sun = createPlanet('Sun', config.isReal, true);
scene.add(Sun);
sphereObjects.push(Sun);
//#endregion

//#region Mercury
let Mercury = createPlanet('Mercury', config.isReal, false);
angle = getRandomAngle();
Mercury.position.set(planetDistances.Mercury * Math.cos(angle), 0, planetDistances.Mercury * Math.sin(angle));
scene.add(Mercury);
sphereObjects.push(Mercury);
//#endregion

//#region Venus
let Venus = createPlanet('Venus', config.isReal, false);
angle = getRandomAngle();
Venus.position.set(planetDistances.Venus * Math.cos(angle), 0, planetDistances.Venus * Math.sin(angle));
scene.add(Venus);
sphereObjects.push(Venus);
//#endregion

//#region Earth
let Earth = createPlanet('Earth', config.isReal, false);
angle = getRandomAngle();
Earth.position.set(planetDistances.Earth * Math.cos(angle), 0, planetDistances.Earth * Math.sin(angle));
scene.add(Earth);
sphereObjects.push(Earth);
//#endregion

//#region Mars
let Mars = createPlanet('Mars', config.isReal, false);
angle = getRandomAngle();
Mars.position.set(planetDistances.Mars * Math.cos(angle), 0, planetDistances.Mars * Math.sin(angle));
scene.add(Mars);
sphereObjects.push(Mars);
//#endregion

//#region Jupiter
let Jupiter = createPlanet('Jupiter', config.isReal, false);
angle = getRandomAngle();
Jupiter.position.set(planetDistances.Jupiter * Math.cos(angle), 0, planetDistances.Jupiter * Math.sin(angle));
scene.add(Jupiter);
sphereObjects.push(Jupiter);
//#endregion

//#region Saturn
let Saturn = createPlanet('Saturn', config.isReal, false, [{ axis: 'x', angle: Math.PI * (1 / 2)}]);
angle = getRandomAngle();
Saturn.position.set(planetDistances.Saturn * Math.cos(angle), 0, planetDistances.Saturn * Math.sin(angle));
scene.add(Saturn);
sphereObjects.push(Saturn);
//#endregion

//#region Uranus
let Uranus = createPlanet('Uranus', config.isReal, false, [{ axis: 'x', angle: Math.PI * (1 / 2)}, { axis: 'z', angle: Math.PI * (1 / 2)}]);
angle = getRandomAngle();
Uranus.position.set(planetDistances.Uranus * Math.cos(angle), 0, planetDistances.Uranus * Math.sin(angle));
scene.add(Uranus);
sphereObjects.push(Uranus);
//#endregion

//#region Neptune
let Neptune = createPlanet('Neptune', config.isReal, false);
angle = getRandomAngle();
Neptune.position.set(planetDistances.Neptune * Math.cos(angle), 0, planetDistances.Neptune * Math.sin(angle));
scene.add(Neptune);
sphereObjects.push(Neptune);
//#endregion

sphereObjects.forEach(x => {
    if (x.name !== 'Sun')
        x.visible = config.showPlanets;
})
defailtFolder.add(config, 'showPlanets').name('Show planets').onChange(() => {
    sphereObjects.forEach(x => {
        if (x.name !== 'Sun')
            x.visible = config.showPlanets;
    })
})
defailtFolder.add(config, 'showSun').name('Show Sun').onChange(() => {
    if (!config.showSun)
        scene.remove(Sun);
    else 
        scene.add(Sun);
})

//#region 3d text
createText('SOLAR SYSTEM', 1000, 'blue', new THREE.Vector3(10000, 200, -5000))
    .then(sceneTitle => {
        scene.add(sceneTitle);
        sceneTitle.visible = config.showText;
        defailtFolder.add(config, 'showText').name('Show text').onChange(() => {
            sceneTitle.visible = config.showText;
        })
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
const issFolder = gui.addFolder('ISS');
issFolder.add(config, 'stopIss').name('Stop ISS');
//#endregion

//#region Rocket
let Rocket = createRocket();
Rocket.position.set(300, 200, 100);
Rocket.rotateZ(Math.PI);
let rocketSize = config.isReal? rocketParameters.size.realSize : rocketParameters.size.fancySize;
Rocket.scale.set(rocketSize, rocketSize, rocketSize);
scene.add(Rocket);

const rocketFolder = gui.addFolder('Rocket');
rocketFolder.add(config, 'stopRocket').name('Stop rocket');
let rocketTarget = sphereObjects[config.rocketTarget];
rocketFolder.add(config, 'rocketTarget', rocketParameters.targets).name('Rocket target').onChange(() => {
    rocketTarget = sphereObjects[config.rocketTarget];
})
//#endregion

//#region Asteroid belt 
let asteroidBelt = createAsteroidBelt(config.isReal);
scene.add(asteroidBelt);
const asteroidFolder = gui.addFolder('Asteroids');
let asteroidParams = asteroidParameters;
asteroidFolder.add(asteroidParams, 'maxSize').name('Flying asteroid size').min(10).max(50).step(1);
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
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 13000);
camera.position.set(300, 100, 0);
scene.add(camera);
//#endregion


//#region Свет
const lightsFolder = gui.addFolder('Lights');

const pointLight = new THREE.PointLight(0xffffff, 350000, Infinity);
pointLight.position.set(0, 0, 0); // Позиция света внутри объекта
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 4096;
pointLight.shadow.mapSize.height = 4096;
// pointLight.shadow.radius = 15;

Sun.receiveShadow = false;
Sun.castShadow = true;
Sun.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 35); // Цвет окружающего света
scene.add(ambientLight);

lightsFolder.add(ambientLight, 'intensity').min(0).max(100).step(1).name('Ambient light intensity');
lightsFolder.add(pointLight, 'intensity').min(1).max(1000000).step(1).name('Point light intensity');
lightsFolder.add(pointLight, 'distance').min(1).max(1000000).step(1).name('Point light distance');
//#endregion


//#region Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);
//#endregion


//#region Анимации
// Анимация движения астероид по нажатию на пробел
document.addEventListener('keydown', (event) => {
    if (event.keyCode != 32) return;
    event.preventDefault(); // Предотвращаем стандартное контекстное меню браузера
    let radius = 1000;
    let angle = getRandomAngle();

    let asteroid = createAsteroid(asteroidParams.maxSize);
    let randomHeight = Math.random() * 100 - 50;
    asteroid.position.set(radius * Math.cos(angle), 100, radius * Math.sin(angle));
    scene.add(asteroid);

    angle = getRandomAngle();
    let _x = radius * Math.cos(angle);
    let _z = radius * Math.sin(angle); 
    let duration = Math.round(Math.random() * asteroidParameters.flightDuration);

    
    gsap.to(asteroid.position, {
        duration: duration,
        x: _x,
        y: -randomHeight,
        z: _z,
        ease: "none",
        onComplete: function () {
            scene.remove(asteroid);
        }
    });
});

// остановить движение
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        config.stopMoving = !config.stopMoving;
    }
});
//#endregion


//#region Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

if (config.observeIss && config.observeRocket)
    controls.target = sphereObjects[config.planetNumberToObserve].position;
else if (config.observeIss)
    controls.target = ISS.position;
else if (config.observeRocket)
    controls.target = Rocket.position;
else 
    controls.target = sphereObjects[config.planetNumberToObserve].position;

const observeFolder = gui.addFolder('Observe');
observeFolder.add(config, 'planetNumberToObserve', planetParameters.sphereOrder).name('Sphere observe').onChange(() => {
    controls.target = sphereObjects[config.planetNumberToObserve].position;
})
observeFolder.add(config, 'observeIss').name('Observe ISS').onChange(() => {
    controls.target = null;
    if (config.observeIss) {
        controls.target = ISS.position;
    }
    else
        controls.target = sphereObjects[config.planetNumberToObserve].position;
})
observeFolder.add(config, 'observeRocket').name('Observe rocket').onChange(() => {
    controls.target = null;
    if (config.observeRocket) {
        controls.target = Rocket.position;
    }
    else
        controls.target = sphereObjects[config.planetNumberToObserve].position;
})
//#endregion


const clock = new THREE.Clock();
let time = Date.now();
//#region Анимация
const tick = () => {

    let currentTime = Date.now();
    const elapsedTime = (currentTime - time) / 1000;
    //const elapsedTime = clock.getElapsedTime()

    if (!config.stopIss) {
        // ISS
        ISS.position.x = Earth.position.x + (issDistance) * Math.cos(elapsedTime * issSpeed);
        ISS.position.z = Earth.position.z + (issDistance) * Math.sin(elapsedTime * issSpeed);
    }
    
    if (!config.stopRocket) {
        // Rocket
        Rocket.position.x += (rocketTarget.position.x - Rocket.position.x) * rocketParameters.speed;
        Rocket.position.y += (rocketTarget.position.y - Rocket.position.y) * rocketParameters.speed;
        Rocket.position.z += (rocketTarget.position.z - Rocket.position.z) * rocketParameters.speed;
        Rocket.lookAt(rocketTarget.position);
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
        Sun.rotation.y = elapsedTime / 5;
        Mercury.rotation.y = elapsedTime * planetParameters.axisSpeed.Mercury;
        Venus.rotation.y = elapsedTime * planetParameters.axisSpeed.Venus;
        Earth.rotation.y = elapsedTime * planetParameters.axisSpeed.Earth;
        Mars.rotation.y = elapsedTime * planetParameters.axisSpeed.Mars;
        Jupiter.rotation.y = elapsedTime * planetParameters.axisSpeed.Jupiter;
        Saturn.rotation.y = elapsedTime * planetParameters.axisSpeed.Saturn;
        Uranus.rotation.y = elapsedTime * planetParameters.axisSpeed.Uranus;
        Neptune.rotation.y = elapsedTime * planetParameters.axisSpeed.Neptune;
        ISS.rotation.y = elapsedTime / 3;
        Rocket.rotation.z = elapsedTime / 2;
        asteroidBelt.rotation.y = elapsedTime / 20;
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
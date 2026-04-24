/**
 * Creates a 3D view of a NEO's orbit around Earth, using three.js.
 * 
 * @typedef {Object} ThreeObjects
 * @property {THREE.WebGLRenderer} renderer
 * @property {THREE.PerspectiveCamera} camera
 * @property {OrbitControls} controls 
 * @property {THREE.Timer} timer
 * @property {THREE.Scene} scene
 * @property {THREE.Mesh} neo
 * @property {THREE.Mesh} earth
 * @property {THREE.Line | null} orbit
 * 
 * @typedef {Object} OrbitData
 * @property {number} axis_au
 * @property {number} eccentricity
 * @property {number} inclination_deg
 * @property {number} mean_anomaly_deg
 * @property {number} node_deg
 * @property {number} peri_deg
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import backgroundImg from '../../../assets/stars.jpg'
import earthImg from '../../../assets/earth.jpg'
import haumeaImg from '../../../assets/haumea.jpg'

/**
 * Creates instances of all needed THREE objects and stores them in
 * a container for later use.
 * 
 * @param {HTMLElement} container - Element to render the 3D view on.
 * @returns {ThreeObjects}
 */
export function setup(container) {
  const width = container.clientWidth
  const height = container.clientHeight

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  const camera = createCamera(width, height)
  const controls = createOrbitControls(camera, renderer)
  const timer = createTimer()
  const scene = createScene()
  const neo = createNeo(scene)
  const earth = createEarth(scene)

  return { 
    renderer, 
    camera, 
    controls, 
    timer, 
    scene, 
    neo, 
    earth, 
    orbit: null 
  }
}

/**
 * Calculates the NEO's orbit around the Earth and renders it on 
 * the viewport in 3D.
 * 
 * @param {OrbitData} data - Raw values used to calculate an orbit.
 * @param {ThreeObjects} setup - Objects needed for rendering.
 * @returns {void}
 */
export function renderOrbit(data, setup) {
  if (!data) 
    return
  
  const orbitData = calculate(data)
  const animation = animateNeo(orbitData, setup)
  setup.orbit?.removeFromParent() // Clear previous orbit
  setup.orbit = createOrbit(orbitData, setup.scene)

  return () => animation?.() // Stops animation if running
}

/**
 * Disposes of all THREE objects in memory and empties the container
 * where the 3D view is currently rendered.
 * 
 * @param {ThreeObjects} setup - Current instances of THREE objects.
 * @param {HTMLElement} container - Element where 3D view is rendered.
 * @returns {void}
 */
export function cleanup(setup, container) {
  const { orbit, renderer, controls, timer, neo, earth } = setup

  orbit?.removeFromParent()
  renderer.dispose()
  controls.dispose()
  timer.dispose()
  neo.material.dispose()
  earth.material.dispose()

  container.removeChild(renderer.domElement)
}


function createCamera(width, height) {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(2, 2, 2)

  return camera
}

function createOrbitControls(camera, renderer) {
  return new OrbitControls(camera, renderer.domElement)
}

function createTimer() {
  return new THREE.Timer()
}

function createScene() {
  const scene = new THREE.Scene()
  const texture = new THREE.TextureLoader()
  const starsTexture = texture.load(backgroundImg)

  scene.background = starsTexture
  scene.backgroundIntensity = .55

  return scene
}

function createNeo(scene) {
  const texture = new THREE.TextureLoader()
  const neoTexture = texture.load(haumeaImg)

  const neoGeometry = new THREE.SphereGeometry(.1, 16, 16)
  const neoMaterial = new THREE.MeshBasicMaterial({ map: neoTexture })
  const neo = new THREE.Mesh(neoGeometry, neoMaterial)

  scene.add(neo)

  return neo
}

function createEarth(scene) {
  const texture = new THREE.TextureLoader()
  const earthTexture = texture.load(earthImg)

  const earthGeometry = new THREE.SphereGeometry(.2, 32, 32)
  const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture })
  const earth = new THREE.Mesh(earthGeometry, earthMaterial)

  scene.add(earth)

  return earth
}

function calculate(data) {
  const { axis_au, eccentricity, inclination_deg, 
    node_deg, peri_deg, mean_anomaly_deg } = data

  // Calculate minor axis from major axis & eccentricity
  const majorAxis = axis_au
  const minorAxis = majorAxis * Math.sqrt(1 - eccentricity * eccentricity)

  // Convert all other values from degrees to radians
  const inclination = THREE.MathUtils.degToRad(inclination_deg)
  const node = THREE.MathUtils.degToRad(node_deg)
  const perihelon = THREE.MathUtils.degToRad(peri_deg)
  const meanAnomaly = THREE.MathUtils.degToRad(mean_anomaly_deg)

  // Create a rotation matrix for orbit and NEO-animation
  const rotationMatrix = new THREE.Matrix4()
    .makeRotationZ(node)
    .multiply(new THREE.Matrix4().makeRotationX(inclination))
    .multiply(new THREE.Matrix4().makeRotationZ(perihelon))

  return {
    majorAxis, 
    minorAxis, 
    eccentricity,
    rotationMatrix, 
    meanAnomaly
  }
}

function createOrbit(orbitData, scene) {
  const { majorAxis, minorAxis, eccentricity, rotationMatrix } = orbitData

  const points = []
  const segments = 200
  for (let i = 0; i <= segments; i++) {
    const E = (i / segments) * Math.PI * 2
    const x = majorAxis * Math.cos(E) - majorAxis * eccentricity
    const z = minorAxis * Math.sin(E)

    points.push(new THREE.Vector3(x, 0, z))
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
  const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
  orbit.applyMatrix4(rotationMatrix)

  scene.add(orbit)

  return orbit
}

function animateNeo(orbitData, setup) {
  const { majorAxis, minorAxis, eccentricity, 
    meanAnomaly, rotationMatrix } = orbitData
  const { neo, renderer, scene, camera, timer } = setup

  let animationFrame
  let animatedMeanAnomaly = meanAnomaly
  const animate = () => {
    animationFrame = requestAnimationFrame(animate)

    timer.update()
    const speed = .5
    const deltaTime = timer.getDelta()
    animatedMeanAnomaly += speed * deltaTime
    animatedMeanAnomaly %= Math.PI * 2 // Clamp to avoid large values

    const kepler = solveKepler(animatedMeanAnomaly, eccentricity)
    const x = majorAxis * Math.cos(kepler) - majorAxis * eccentricity
    const z = minorAxis * Math.sin(kepler)
    const position = new THREE.Vector3(x, 0, z)
      .applyMatrix4(rotationMatrix)

    neo.position.copy(position)
    renderer.render(scene, camera)
  }

  animate()

  return () => cancelAnimationFrame(animationFrame)
}

function solveKepler(meanAnomaly, eccentricity, iterations = 10) {
  let kepler = eccentricity < 0.8
    ? meanAnomaly
    : Math.PI

  for (let i = 0; i < iterations; i++) {
    kepler = kepler - (kepler - eccentricity * Math.sin(kepler) - meanAnomaly) /
      (1 - eccentricity * Math.cos(kepler))
  }

  return kepler
}
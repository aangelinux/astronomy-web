/**
 * Creates a 3D view of a NEO's orbit around the Sun, using three.js.
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { RawOrbitData, OrbitData3D, SceneObjects } from './types'
import backgroundImg from '../../../assets/stars.jpg'
import sunImg from '../../../assets/sun.jpg'
import earthImg from '../../../assets/earth.jpg'
import haumeaImg from '../../../assets/haumea.jpg'

/**
 * Creates instances of all scene objects and adds them to
 * a div container for orbit rendering.
 */
export function setup(viewport: HTMLElement): SceneObjects {
  const width = viewport.clientWidth
  const height = viewport.clientHeight

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  viewport.appendChild(renderer.domElement)

  const camera = createCamera(width, height)
  const controls = createControls(camera, renderer)
  const timer = createTimer()
  const scene = createScene()
  const neo = createNeo(scene)
  const sun = createSun(scene)
  const earth = createEarth(scene)

  return { 
    renderer, 
    camera, 
    controls, 
    timer, 
    scene, 
    neo, 
    sun, 
    earth, 
    neoOrbit: null,
    earthOrbit: null
  }
}

/**
 * Calculates the Earth's and the NEO's orbits around the Sun and renders 
 * them on the viewport in 3D.
 */
export function renderOrbit(data: RawOrbitData, setup: SceneObjects) {
  if (!data) 
    return
  
  const orbitData = calculate(data)

  // Clear previous orbits and create new ones
  setup.neoOrbit?.removeFromParent()
  setup.earthOrbit?.removeFromParent()
  setup.neoOrbit = createNeoOrbit(orbitData, setup.scene)
  setup.earthOrbit = createEarthOrbit(1, setup.scene)

  const animation = animateObjects(orbitData, setup)

  return () => animation?.() // Stops animation if running
}

/**
 * Disposes of all THREE objects in memory and empties the container
 * where the 3D view is currently rendered.
 */
export function cleanup(setup: SceneObjects, viewport: HTMLElement) {
  const { earthOrbit, neoOrbit, renderer, controls, timer, neo, sun, earth } = setup

  neoOrbit?.removeFromParent()
  earthOrbit?.removeFromParent()
  renderer.dispose()
  controls.dispose()
  timer.dispose()
  neo.geometry.dispose()
  sun.geometry.dispose()
  earth.geometry.dispose()

  viewport.removeChild(renderer.domElement)
}


function createCamera(width: number, height: number) {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(2, 2, 2)

  return camera
}

function createControls(
  camera: THREE.PerspectiveCamera, 
  renderer: THREE.WebGLRenderer
) {
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

function createNeo(scene: THREE.Scene) {
  const texture = new THREE.TextureLoader()
  const neoTexture = texture.load(haumeaImg)

  const neoGeometry = new THREE.SphereGeometry(.1, 16, 16)
  const neoMaterial = new THREE.MeshBasicMaterial({ map: neoTexture })
  const neo = new THREE.Mesh(neoGeometry, neoMaterial)

  scene.add(neo)

  return neo
}

function createSun(scene: THREE.Scene) {
  const texture = new THREE.TextureLoader()
  const sunTexture = texture.load(sunImg)

  const sunGeometry = new THREE.SphereGeometry(.3, 32, 32)
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture })
  const sun = new THREE.Mesh(sunGeometry, sunMaterial)

  scene.add(sun)

  return sun
}

function createEarth(scene: THREE.Scene) {
  const texture = new THREE.TextureLoader()
  const earthTexture = texture.load(earthImg)

  const earthGeometry = new THREE.SphereGeometry(.15, 32, 32)
  const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture })
  const earth = new THREE.Mesh(earthGeometry, earthMaterial)

  scene.add(earth)

  return earth
}

function calculate(data: RawOrbitData) {
  const { 
    axis_au, 
    eccentricity, 
    inclination_deg, 
    node_deg, 
    peri_deg, 
    mean_anomaly_deg 
  } = data

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
    meanAnomaly,
    rotationMatrix
  }
}

function createNeoOrbit(data: OrbitData3D, scene: THREE.Scene) {
  const { majorAxis, minorAxis, eccentricity, rotationMatrix } = data

  const points = []
  const segments = 200
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const x = majorAxis * Math.cos(angle) - majorAxis * eccentricity
    const z = minorAxis * Math.sin(angle)

    points.push(new THREE.Vector3(x, 0, z))
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
  const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
  orbit.applyMatrix4(rotationMatrix)

  scene.add(orbit)

  return orbit
}

function createEarthOrbit(radius = 1, scene: THREE.Scene) {
  const points = []
  const segments = 200
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    points.push(new THREE.Vector3(x, 0, z))
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
  const orbit = new THREE.Line(orbitGeometry, orbitMaterial)

  scene.add(orbit)

  return orbit
}

function animateObjects(data: OrbitData3D, setup: SceneObjects) {
  const { majorAxis, minorAxis, eccentricity, meanAnomaly, rotationMatrix } = data
  const { neo, earth, renderer, scene, camera, timer } = setup

  let animationFrameID: number
  let animatedMeanAnomaly = meanAnomaly
  let earthAngle = 0
  const animate = () => {
    animationFrameID = requestAnimationFrame(animate)

    timer.update()
    const speed = .5
    const deltaTime = timer.getDelta()

    // ---------- NEO ------------ //
    animatedMeanAnomaly += speed * deltaTime
    animatedMeanAnomaly %= Math.PI * 2 // Clamp value

    const kepler = solveKepler(animatedMeanAnomaly, eccentricity)
    const x = majorAxis * Math.cos(kepler) - majorAxis * eccentricity
    const z = minorAxis * Math.sin(kepler)
    const neoPosition = new THREE.Vector3(x, 0, z)
      .applyMatrix4(rotationMatrix)

    neo.position.copy(neoPosition)

    // -------- Earth ----------- //
    earthAngle += speed * deltaTime

    const earthOrbitRadius = 1 // AU
    const earthPosition = new THREE.Vector3(
      Math.cos(earthAngle) * earthOrbitRadius, 
      0,
      Math.sin(earthAngle) * earthOrbitRadius
    )

    earth.position.copy(earthPosition)

    renderer.render(scene, camera)
  }
  animate()

  return () => cancelAnimationFrame(animationFrameID)
}

function solveKepler(meanAnomaly: number, eccentricity: number, iterations = 10) {
  let kepler = eccentricity < 0.8
    ? meanAnomaly
    : Math.PI

  for (let i = 0; i < iterations; i++) {
    kepler = kepler - (kepler - eccentricity * Math.sin(kepler) - meanAnomaly) /
      (1 - eccentricity * Math.cos(kepler))
  }

  return kepler
}
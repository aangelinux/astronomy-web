/**
 * Renders a 3D view of an orbit using three.js.
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

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

  return { renderer, camera, controls, timer, scene, 
    neo, earth, orbit: null }
}

export function renderOrbit(data, setup) {
  if (!data) return
  if (setup.orbit) setup.orbit.removeFromParent()
  
  const orbitData = calculate(data)
  const animation = animateNeo(orbitData, setup)
  setup.orbit = createOrbit(orbitData, setup.scene)

  return () => animation?.() // Stops animation, if running
}

export function cleanup(setup, container) {
  const { orbit, renderer, controls, timer, neo, earth } = setup

  if (orbit) orbit.removeFromParent()
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
  const starsTexture = texture.load('/assets/stars.jpg')

  scene.background = starsTexture
  scene.backgroundIntensity = .55

  return scene
}

function createNeo(scene) {
  const texture = new THREE.TextureLoader()
  const neoTexture = texture.load('/assets/haumea.jpg')

  const neoGeometry = new THREE.SphereGeometry(.1, 16, 16)
  const neoMaterial = new THREE.MeshBasicMaterial({ map: neoTexture })
  const neo = new THREE.Mesh(neoGeometry, neoMaterial)

  scene.add(neo)

  return neo
}

function createEarth(scene) {
  const texture = new THREE.TextureLoader()
  const earthTexture = texture.load('/assets/earth.jpg')

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

  // Convert other values from degrees to radians
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
    majorAxis, minorAxis, eccentricity,
    rotationMatrix, meanAnomaly
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
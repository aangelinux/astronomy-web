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

  const camera = createCamera(width, height, renderer)
  const controls = createOrbitControls(camera, renderer)
  const scene = createScene()
  const neo = createNeo(scene)
  const earth = createEarth(scene)

  return { renderer, camera, controls, scene, neo, earth }
}

export function renderOrbit(data, setup) {
  if (!data) return
  
  const orbitData = calculate(data)
  const animation = animateNeo(orbitData, setup)
  createOrbit(orbitData, setup.scene)

  return () => animation?.() // Stops animation, if running
}

export function cleanup({ renderer, controls, neo, earth }, container) {
  renderer.dispose()
  controls.dispose()
  neo.material.dispose()
  earth.material.dispose()

  container.removeChild(renderer.domElement)
}


function createCamera(width, height, renderer) {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.y = 2
  camera.position.x = 2
  camera.position.z = 2

  return camera
}

function createOrbitControls(camera, renderer) {
  return new OrbitControls(camera, renderer.domElement)
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

  const neoGeometry = new THREE.SphereGeometry(0.1, 16, 16)
  const neoMaterial = new THREE.MeshBasicMaterial({ map: neoTexture })
  const neo = new THREE.Mesh(neoGeometry, neoMaterial)

  scene.add(neo)

  return neo
}

function createEarth(scene) {
  const texture = new THREE.TextureLoader()
  const earthTexture = texture.load('/assets/earth.jpg')

  const earthGeometry = new THREE.SphereGeometry(.4, 32, 32)
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

  return {
    majorAxis, minorAxis, eccentricity,
    inclination, node, perihelon, meanAnomaly
  }
}

function createOrbit(orbitData, scene) {
  const { majorAxis, minorAxis, eccentricity, 
    inclination, node, perihelon } = orbitData

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
  orbit.rotation.z = node
  orbit.rotation.x = inclination
  orbit.rotation.z += perihelon

  scene.add(orbit)
}

function animateNeo(orbitData, setup) {
  const { majorAxis, minorAxis, eccentricity,
    inclination, node, perihelon, meanAnomaly } = orbitData
  const { neo, renderer, scene, camera } = setup

  let animationFrame
  let animatedMeanAnomaly = meanAnomaly
  const animate = () => {
    animationFrame = requestAnimationFrame(animate)
    animatedMeanAnomaly += 0.01

    const kepler = solveKepler(animatedMeanAnomaly, eccentricity)
    const x = majorAxis * Math.cos(kepler) - majorAxis * eccentricity
    const z = minorAxis * Math.sin(kepler)
    neo.position.set(x, 0, z)
    neo.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), node)
    neo.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), inclination)
    neo.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), perihelon)

    renderer.render(scene, camera)
  }
  animate()

  return () => cancelAnimationFrame(animationFrame)
}

function solveKepler(meanAnomaly, eccentricity, iterations = 5) {
  let kepler = meanAnomaly
  for (let i = 0; i < iterations; i++) {
    kepler = meanAnomaly + eccentricity * Math.sin(kepler)
  }

  return kepler
}
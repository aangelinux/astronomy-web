/**
 * Renders a 3D view of an orbit using three.js.
 */

import * as three from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export const orbit = (container, rawOrbitData) => {
  const renderer = new three.WebGLRenderer({ antialias: true })
	const width = container.clientWidth
  const height = container.clientHeight

  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

	const camera = createCamera(width, height, renderer)
	const scene = createScene()
	const orbitData = calculate(rawOrbitData)
	const neo = createNeo(scene)

	renderNeo({ orbitData, neo, renderer, scene, camera })
	renderOrbit(scene, orbitData)
	renderEarth(scene)

  // Cleanup
  return () => {
    renderer.dispose()
    container.removeChild(renderer.domElement)
  }
}


function createCamera(width, height, renderer) {
  const camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000)
	camera.position.y = 2
	camera.position.x = 2
  camera.position.z = 2
	
	new OrbitControls(camera, renderer.domElement)

	return camera
}

function createScene() {
  const scene = new three.Scene()
	const texture = new three.TextureLoader()
	const starsTexture = texture.load('../../assets/stars.jpg')

	scene.background = starsTexture
	scene.backgroundIntensity = .55

	return scene
}

function calculate(orbitData) {
	const { axis_au, eccentricity, inclination_deg, 
		node_deg, peri_deg, mean_anomaly_deg } = orbitData

	// Calculate minor axis from major axis & eccentricity
	const majorAxis = axis_au
	const minorAxis = majorAxis * Math.sqrt(1 - eccentricity * eccentricity)

	// Convert other values from degrees to radians
	const inclination = three.MathUtils.degToRad(inclination_deg)
	const node = three.MathUtils.degToRad(node_deg)
	const perihelon = three.MathUtils.degToRad(peri_deg)
	const meanAnomaly = three.MathUtils.degToRad(mean_anomaly_deg)

	return { majorAxis, minorAxis, eccentricity, inclination, node, perihelon, meanAnomaly }
}

function createNeo(scene) {
	const texture = new three.TextureLoader()
	const neoTexture = texture.load('../../assets/haumea.jpg')

  const neoGeometry = new three.SphereGeometry(0.1, 16, 16)
  const neoMaterial = new three.MeshBasicMaterial({ map: neoTexture })
  const neo = new three.Mesh(neoGeometry, neoMaterial)

	scene.add(neo)

	return neo
}

function renderNeo({ orbitData, neo, renderer, scene, camera }) {
	const { majorAxis, minorAxis, eccentricity, 
		inclination, node, perihelon, meanAnomaly } = orbitData 

	let animatedMeanAnomaly = meanAnomaly
	const animate = () => {
		requestAnimationFrame(animate)
		animatedMeanAnomaly += 0.01

		const kepler = solveKepler(animatedMeanAnomaly, eccentricity)
		const x = majorAxis * Math.cos(kepler) - majorAxis * eccentricity
		const z = minorAxis * Math.sin(kepler)
		neo.position.set(x, 0, z)
		neo.position.applyAxisAngle(new three.Vector3(0, 0, 1), node)
		neo.position.applyAxisAngle(new three.Vector3(1, 0, 0), inclination)
		neo.position.applyAxisAngle(new three.Vector3(0, 0, 1), perihelon)

		renderer.render(scene, camera)
	}

	animate()
}

function solveKepler(meanAnomaly, eccentricity, iterations = 5) {
	let kepler = meanAnomaly
	for (let i = 0; i < iterations; i++) {
		kepler = meanAnomaly + eccentricity * Math.sin(kepler)
	}

	return kepler
}

function renderOrbit(scene, orbitData) {
	const { majorAxis, minorAxis, eccentricity, inclination, node, perihelon } = orbitData 

  const points = []
  const segments = 200
  for (let i = 0; i <= segments; i++) {
		const E = (i / segments) * Math.PI * 2
		const x = majorAxis * Math.cos(E) - majorAxis * eccentricity
		const z = minorAxis * Math.sin(E)

		points.push(new three.Vector3(x, 0, z))
  }

  const orbitGeometry = new three.BufferGeometry().setFromPoints(points)
  const orbitMaterial = new three.LineBasicMaterial({ color: 0xffffff })
  const orbit = new three.Line(orbitGeometry, orbitMaterial)

	orbit.rotation.z = node
	orbit.rotation.x = inclination
	orbit.rotation.z += perihelon

  scene.add(orbit)
}

function renderEarth(scene) {
	const texture = new three.TextureLoader()
	const earthTexture = texture.load('../../assets/earth.jpg')
	const earthSpecular = texture.load('../../assets/earth_specular.jpg')

  const earthGeometry = new three.SphereGeometry(.4, 32, 32)
  const earthMaterial = new three.MeshBasicMaterial({ 
		map: earthTexture, 
		specularMap: earthSpecular  
	})
  const earth = new three.Mesh(earthGeometry, earthMaterial)

  scene.add(earth)
}

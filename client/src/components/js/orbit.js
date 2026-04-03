/**
 * Creates a 3D view of an orbit using three.js.
 */

import * as three from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export const orbit = (container, orbitData) => {
  const width = container.clientWidth
  const height = container.clientHeight

  // Renderer
  const renderer = new three.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  // Scene
	const scene = createScene()

  // Camera
	const camera = addCamera(scene, renderer, width, height)

	// Earth
	addEarth(scene)

  // Orbit path
	addOrbit(scene, orbitData)

	// NEO
	addNeo(scene, camera, renderer, orbitData)
	
  // Cleanup
  return () => {
    renderer.dispose()
    container.removeChild(renderer.domElement)
  }
}

function createScene() {
  const scene = new three.Scene()
	const texture = new three.TextureLoader()
	const starsTexture = texture.load('../../assets/stars.jpg')

	scene.background = starsTexture
	scene.backgroundIntensity = .55

	return scene
}

function addCamera(scene, renderer, width, height) {
  const camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000)
	camera.position.y = 2
	camera.position.x = 2
  camera.position.z = 2
	
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.update()
	const animateCamera = () => {
		controls.update()
		renderer.render(scene, camera)
	}
	animateCamera()

	return camera
}

function addEarth(scene) {
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

function addOrbit(scene, orbitData) {
	const majorAxis = orbitData.axis_au
	const eccentricity = orbitData.eccentricity
	const minorAxis = majorAxis * Math.sqrt(1 - eccentricity * eccentricity)

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
  const orbitLine = new three.Line(orbitGeometry, orbitMaterial)

	const inclination = three.MathUtils.degToRad(orbitData.inclination_deg)
	const node = three.MathUtils.degToRad(orbitData.node_deg)
	const perihelon = three.MathUtils.degToRad(orbitData.peri_deg)

	orbitLine.rotation.z = node
	orbitLine.rotation.x = inclination
	orbitLine.rotation.z += perihelon

  scene.add(orbitLine)
}

function addNeo(scene, camera, renderer, orbitData) {
	const texture = new three.TextureLoader()

	const majorAxis = orbitData.axis_au
	const eccentricity = orbitData.eccentricity
	const minorAxis = majorAxis * Math.sqrt(1 - eccentricity * eccentricity)

	const solveKepler = (mean_anomaly, e, iterations = 5) => {
		let kepler = mean_anomaly
		for (let i = 0; i < iterations; i++) {
			kepler = mean_anomaly + e * Math.sin(kepler)
		}
		return kepler
	}

	const mean_anomaly_rad = three.MathUtils.degToRad(orbitData.mean_anomaly_deg)
	const kepler = solveKepler(mean_anomaly_rad, eccentricity)

	const x = majorAxis * Math.cos(kepler) - majorAxis * eccentricity
	const z = minorAxis * Math.sin(kepler)

  const neoGeometry = new three.SphereGeometry(0.1, 16, 16)
	const neoTexture = texture.load('../../assets/haumea.jpg')
  const neoMaterial = new three.MeshBasicMaterial({ map: neoTexture })
  const neo = new three.Mesh(neoGeometry, neoMaterial)
	neo.position.set(x, 0, z)

	const inclination = three.MathUtils.degToRad(orbitData.inclination_deg)
	const node = three.MathUtils.degToRad(orbitData.node_deg)
	const perihelon = three.MathUtils.degToRad(orbitData.peri_deg)

	neo.position.applyAxisAngle(new three.Vector3(0, 0, 1), node)
	neo.position.applyAxisAngle(new three.Vector3(1, 0, 0), inclination)
	neo.position.applyAxisAngle(new three.Vector3(0, 0, 1), perihelon)

  scene.add(neo)

	let animated_ma = mean_anomaly_rad
	const animate = () => {
		requestAnimationFrame(animate)

		animated_ma += 0.01
		const kepler = solveKepler(animated_ma, eccentricity)
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
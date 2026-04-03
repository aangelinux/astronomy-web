/**
 * Creates a 3D view of an orbit using three.js.
 */

import * as three from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export const orbit = (container, orbitData) => {
  const width = container.clientWidth
  const height = container.clientHeight

	// Texture loader
	const texture = new three.TextureLoader()

  // Scene
  const scene = new three.Scene()
	const starsTexture = texture.load('../../assets/stars.jpg')
	scene.background = starsTexture
	scene.backgroundIntensity = .55

  // Camera
  const camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000)
	camera.position.y = 2
	camera.position.x = 2
  camera.position.z = 2

  // Renderer
  const renderer = new three.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

	// Textures (images)
	const earthTexture = texture.load('../../assets/earth.jpg')
	const earthSpecular = texture.load('../../assets/earth_specular.jpg')

  // Earth (center)
  const earthGeometry = new three.SphereGeometry(.4, 32, 32)
  const earthMaterial = new three.MeshBasicMaterial({ 
		map: earthTexture, 
		specularMap: earthSpecular  
	})
  const earth = new three.Mesh(earthGeometry, earthMaterial)
  scene.add(earth)

  // Orbit path
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

  // NEO
	function solveKepler(mean_anomaly, eccentricity, iterations = 5) {
		let kepler = mean_anomaly
		for (let i = 0; i < iterations; i++) {
			kepler = mean_anomaly + eccentricity * Math.sin(kepler)
		}

		return kepler
	}

	const mean_anomaly = three.MathUtils.degToRad(orbitData.mean_anomaly_deg)
	const kepler = solveKepler(mean_anomaly, eccentricity)

	const x = majorAxis * Math.cos(kepler) - majorAxis * eccentricity
	const z = minorAxis * Math.sin(kepler)

  const neoGeometry = new three.SphereGeometry(0.1, 16, 16)
	const neoTexture = texture.load('../../assets/haumea.jpg')
  const neoMaterial = new three.MeshBasicMaterial({ map: neoTexture })
  const neo = new three.Mesh(neoGeometry, neoMaterial)
	neo.position.set(x, 0, z)

	neo.position.applyAxisAngle(new three.Vector3(0, 0, 1), node)
	neo.position.applyAxisAngle(new three.Vector3(1, 0, 0), inclination)
	neo.position.applyAxisAngle(new three.Vector3(0, 0, 1), perihelon)

  scene.add(neo)

	let animated_ma = mean_anomaly
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

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.update()

	const animateCamera = () => {
		controls.update()
		renderer.render(scene, camera)
	}
	animateCamera()
	
  // Cleanup
  return () => {
    renderer.dispose()
    container.removeChild(renderer.domElement)
  }
}
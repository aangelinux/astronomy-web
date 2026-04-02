/**
 * Creates a 3D view of an orbit using three.js.
 */

import * as three from 'three'

export const orbit = (container, neoData) => {
  const width = container.clientWidth
  const height = container.clientHeight

  // Scene
  const scene = new three.Scene()

  // Camera
  const camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  // Renderer
  const renderer = new three.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  // Sun (center)
  const sunGeometry = new three.SphereGeometry(0.2, 32, 32)
  const sunMaterial = new three.MeshBasicMaterial({ color: 0xffff00 })
  const sun = new three.Mesh(sunGeometry, sunMaterial)
  scene.add(sun)

  // Orbit path
  const points = []
  const radius = 2

  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * Math.PI * 2
    points.push(new three.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ))
  }

  const orbitGeometry = new three.BufferGeometry().setFromPoints(points)
  const orbitMaterial = new three.LineBasicMaterial({ color: 0xffffff })
  const orbitLine = new three.Line(orbitGeometry, orbitMaterial)
  scene.add(orbitLine)

  // NEO
  const neoGeometry = new three.SphereGeometry(0.08, 16, 16)
  const neoMaterial = new three.MeshBasicMaterial({ color: 0xff0000 })
  const neo = new three.Mesh(neoGeometry, neoMaterial)
  scene.add(neo)

  let t = 0
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate)

    t += 0.01
    neo.position.x = Math.cos(t) * radius
    neo.position.z = Math.sin(t) * radius
    renderer.render(scene, camera)
  }

  animate()

  // Cleanup
  return () => {
    renderer.dispose()
    container.removeChild(renderer.domElement)
  }	
}
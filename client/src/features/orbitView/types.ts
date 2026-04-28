import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export type RawOrbitData = {
  axis_au: number
  eccentricity: number
  inclination_deg: number
  mean_anomaly_deg: number
  node_deg: number
  peri_deg: number
}

export type OrbitData3D = {
  majorAxis: number
  minorAxis: number
  eccentricity: number
  meanAnomaly: number
  rotationMatrix: THREE.Matrix4
}

export type SceneObjects = {
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  timer: THREE.Timer
  scene: THREE.Scene
  neo: THREE.Mesh
  sun: THREE.Mesh
  earth: THREE.Mesh
  neoOrbit: THREE.Line | null
  earthOrbit: THREE.Line | null
}
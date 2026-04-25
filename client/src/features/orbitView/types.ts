import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export type OrbitData = {
  axis_au: number
  eccentricity: number
  inclination_deg: number
  mean_anomaly_deg: number
  node_deg: number
  peri_deg: number
}

export type SceneObjects = {
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  timer: THREE.Timer
  scene: THREE.Scene
  neo: THREE.Mesh
  earth: THREE.Mesh
  orbit: THREE.Line | null
}
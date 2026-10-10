import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'

function VehicleModel() {
  const sourceGeometry = useLoader(STLLoader, '/models/kapsul.STL')
  const pivot = useRef<THREE.Group>(null)
  const prepared = useMemo(() => {
    const geometry = sourceGeometry.clone()
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    geometry.center()
    geometry.computeBoundingBox()
    const box = geometry.boundingBox as THREE.Box3
    const size = box.getSize(new THREE.Vector3())
    const scale = 5.8 / Math.max(size.x, size.y, size.z)
    return { geometry, scale }
  }, [sourceGeometry])

  useEffect(() => () => prepared.geometry.dispose(), [prepared.geometry])

  useFrame((state) => {
    if (pivot.current) pivot.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.035
  })

  return (
    <group ref={pivot} rotation={[0, -0.34, 0]}>
      <mesh geometry={prepared.geometry} scale={prepared.scale} position={[0, 0.08, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#101b2e"
          metalness={0.72}
          roughness={0.3}
          clearcoat={0.75}
          clearcoatRoughness={0.22}
        />
      </mesh>
    </group>
  )
}

function CameraControls() {
  const { camera, gl, size } = useThree()
  const controls = useRef<OrbitControls | null>(null)

  useEffect(() => {
    const compact = size.width / size.height < 1.15
    const distance = compact ? 10.8 : 8.35
    camera.position.set(distance * 0.61, distance * 0.3, distance * 0.73)
    const instance = new OrbitControls(camera, gl.domElement)
    instance.enableDamping = true
    instance.dampingFactor = 0.055
    instance.enablePan = false
    instance.minDistance = 4.2
    instance.maxDistance = compact ? 12.5 : 9.5
    instance.minPolarAngle = Math.PI * 0.24
    instance.maxPolarAngle = Math.PI * 0.67
    instance.autoRotate = true
    instance.autoRotateSpeed = 0.55
    instance.target.set(0, 0.05, 0)
    instance.update()
    controls.current = instance
    return () => instance.dispose()
  }, [camera, gl, size.height, size.width])

  useFrame(() => controls.current?.update())
  return null
}

function LoadingModel() {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <capsuleGeometry args={[0.55, 3.5, 8, 24]} />
      <meshStandardMaterial color="#16191f" wireframe />
    </mesh>
  )
}

export default function PodVisual() {
  return (
    <div className="pod-viewer">
      <Canvas
        shadows
        camera={{ position: [5.4, 2.7, 6.5], fov: 34 }}
        dpr={[1, 1.65]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.65} />
        <hemisphereLight args={['#ffffff', '#0a1628', 2.35]} />
        <directionalLight position={[5, 7, 4]} intensity={3.6} castShadow />
        <directionalLight position={[-5, 2, -2]} intensity={3} color="#4f8ef7" />
        <directionalLight position={[0, -1, 5]} intensity={1.4} color="#c9cfd9" />
        <Suspense fallback={<LoadingModel />}>
          <VehicleModel />
        </Suspense>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.22, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial transparent opacity={0.32} />
        </mesh>
        <CameraControls />
      </Canvas>
      <div className="model-meta">
        <span>TEAM PARS / KAPSÜL.STL</span>
        <strong>HYPERLOOP KAPSÜLÜ</strong>
      </div>
      <div className="model-control">SÜRÜKLE · DÖNDÜR · YAKINLAŞTIR</div>
      <a className="model-source" href="https://teampars.com.tr/" target="_blank" rel="noreferrer">KAPSÜL.STL · 3D MODEL</a>
    </div>
  )
}

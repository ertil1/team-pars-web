import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'

function VehicleModel() {
  const gltf = useLoader(GLTFLoader, '/models/anadolu-parsi.glb')
  const pivot = useRef<THREE.Group>(null)
  const prepared = useMemo(() => {
    const object = gltf.scene.clone(true)
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material = child.material.clone()
        child.material.envMapIntensity = 1.1
      }
    })
    object.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(object)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = 5.4 / Math.max(size.x, size.y, size.z)
    return { object, scale, offset: center.multiplyScalar(-scale) }
  }, [gltf.scene])

  useFrame((state) => {
    if (pivot.current) pivot.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.035
  })

  return (
    <group ref={pivot} rotation={[0, -0.45, 0]}>
      <primitive
        object={prepared.object}
        scale={prepared.scale}
        position={[prepared.offset.x, prepared.offset.y + 0.15, prepared.offset.z]}
      />
    </group>
  )
}

function CameraControls() {
  const { camera, gl } = useThree()
  const controls = useRef<OrbitControls | null>(null)

  useEffect(() => {
    const instance = new OrbitControls(camera, gl.domElement)
    instance.enableDamping = true
    instance.dampingFactor = 0.055
    instance.enablePan = false
    instance.minDistance = 4.2
    instance.maxDistance = 8.5
    instance.minPolarAngle = Math.PI * 0.24
    instance.maxPolarAngle = Math.PI * 0.67
    instance.autoRotate = true
    instance.autoRotateSpeed = 0.55
    instance.target.set(0, 0.05, 0)
    instance.update()
    controls.current = instance
    return () => instance.dispose()
  }, [camera, gl])

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
        <ambientLight intensity={1.35} />
        <hemisphereLight args={['#ffffff', '#14110b', 2.1]} />
        <directionalLight position={[5, 7, 4]} intensity={3.2} castShadow />
        <directionalLight position={[-5, 2, -2]} intensity={2.2} color="#4f8ef7" />
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
        <span>TEAM PARS / KABUK.GLB</span>
        <strong>ANADOLU PARSI</strong>
      </div>
      <div className="model-control">SÜRÜKLE · DÖNDÜR · YAKINLAŞTIR</div>
      <a className="model-source" href="https://teampars.com.tr/" target="_blank" rel="noreferrer">TEAM PARS 3D MODELİ</a>
    </div>
  )
}

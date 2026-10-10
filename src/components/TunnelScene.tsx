import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Tunnel() {
  const group = useRef<THREE.Group>(null)
  const particles = useMemo(() => Array.from({ length: 52 }, (_, i) => ({
    angle: (i / 52) * Math.PI * 2,
    z: -18 + (i % 18) * 1.2,
    len: 1.2 + (i % 5) * .32,
  })), [])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * .18) * .035
    group.current.children.forEach((child) => {
      child.position.z += delta * 8
      if (child.position.z > 5) child.position.z = -18
    })
  })

  return (
    <>
      <fog attach="fog" args={['#090a0c', 4, 22]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 2, 2]} color="#e29d2b" intensity={12} />
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={i} position={[0, 0, -i * 1.55]}>
          <torusGeometry args={[3.1, i % 3 === 0 ? .028 : .012, 8, 72]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#5a4930' : '#242932'} transparent opacity={i % 3 === 0 ? .62 : .36} />
        </mesh>
      ))}
      <group ref={group}>
        {particles.map((p, i) => {
          const x = Math.cos(p.angle) * (1.6 + (i % 4) * .34)
          const y = Math.sin(p.angle) * (1.6 + (i % 4) * .34)
          return <mesh key={i} position={[x, y, p.z - p.len / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[i % 7 === 0 ? .012 : .006, i % 7 === 0 ? .012 : .006, p.len, 4]} />
            <meshBasicMaterial color={i % 7 === 0 ? '#ff5500' : '#e29d2b'} transparent opacity={.56} />
          </mesh>
        })}
      </group>
    </>
  )
}

export default function TunnelScene() {
  return (
    <Canvas camera={{ position: [0, .25, 4.8], fov: 58 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Tunnel />
    </Canvas>
  )
}

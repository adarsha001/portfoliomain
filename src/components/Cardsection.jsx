import React from 'react'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Avater } from './Avatar'

// Create a separate component for the 3D content
const SphereWithTexture = () => {
  const map = useTexture('./texture/square-3d-tiles-textures-vector.jpg')
  
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
           <Avater/>
      <meshStandardMaterial map={map} ins />
    </mesh>
  )
}

const Cardsection = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
 
      <SphereWithTexture />
    </>
  )
}

export default Cardsection
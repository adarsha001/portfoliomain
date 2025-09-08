import React from 'react'
import { MeshPortalMaterial, OrbitControls, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Avater } from './Avatar'

// 3D content
const SphereWithTexture = () => {
  const map = useTexture('./texture/ComfyUI_01219_.png')

  return (
 
     
      <mesh>
         <ambientLight intensity={1} />
      
        <sphereGeometry args={[40, 20, 20]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
   
  )
}

const Cardsection = () => {
  return (
    <div className="w-[100%] h-[100%]">

    <Canvas>
      <OrbitControls />
      <ambientLight intensity={1} />

      <mesh>
              <ambientLight intensity={1} />
        <planeGeometry args={[2, 2]} />
        <MeshPortalMaterial side={THREE.DoubleSide}>
          <SphereWithTexture/>
       <Avater scale={0.5} position-y={-1} />
        </MeshPortalMaterial>
      </mesh>
    </Canvas>
    </div>
  )
}

export default Cardsection

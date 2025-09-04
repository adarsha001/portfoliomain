import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Typewritting from './components/Typewritting'
import Videosection from './components/Videosection'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cardsection from './components/Cardsection';
import { Canvas } from '@react-three/fiber';

const App = () => {
  return (
    <div className="w-screen h-screen">
      {/* Remove the overflow-hidden if it's clipping content */}
      {/* <div className=''> */}
      {/* <Canvas camera={{position:[0,0,10],fov:30}}>
        <Cardsection/>
      </Canvas> */}
    
    
        <Typewritting/> 
      <Videosection />
    <Typewritting/>
      </div>
    // </div>
  )
}

export default App
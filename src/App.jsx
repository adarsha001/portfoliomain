import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Typewritting from './components/Typewritting'
import Videosection from './components/Videosection'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cardsection from './components/Cardsection';
import { Canvas } from '@react-three/fiber';
import ScrollSnapPages from './components/ScrollSnapPage';

const App = () => {
  return (
    <>
   <div className="w-screen h-screen">
      
      {/* Side-by-side layout section */}
      <div className="relative flex flex-row justify-center items-center h-screen bg-gray-100">
        {/* Left: Typewritting */}
        <div className="w-1/2 ">
          <Typewritting />
        </div>

        {/* Right: Cardsection */}
        <div className="w-[70%] h-[90%] ">
          <Cardsection />
        </div>
      </div>

      {/* Video Section */}
      <Videosection />


      {/* (Optional) Another instance of Typewritting */}
      {/* <Typewritting /> */}
    </div>
    
    </>
  )
}

export default App
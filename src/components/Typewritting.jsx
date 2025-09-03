import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
const Typewritting = () => {
  return (
    <div className=' min-h-screen text-7xl  flex  '>
<div className=' flex flex-col mt-[40vh] ml-[3vw] '>
      <span className=''>
Adarsha 
      </span>
  
<span>

         <Typewriter
            words={[
              ' Full-Stack Developer ',
              ' React & GSAP Enthusiast ',
              ' AI + Web Solutions ',
              ' Voice-Activated Apps '
            ]}
            loop={0} // infinite
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={40}
            delaySpeed={1500}
            />
            </span>
            </div>
    </div>
  )
}

export default Typewritting

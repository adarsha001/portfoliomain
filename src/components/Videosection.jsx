import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Videosection = () => {
  const videoref = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);


  useGSAP(() => {
    if (!videoLoaded) return;

    // Set initial state
    gsap.set(".layout", { opacity: 1 });

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // Increased scroll distance for smoother animation
        scrub: 1.5, // Smoother scrubbing with higher value
        pin: true,
        anticipatePin: 1, // Helps prevent jerky pinning
      
      }
    });

    // Animate the video's currentTime based on scroll
    tl.to(videoref.current, {
      currentTime: videoref.current.duration,
      ease: "none" // Linear easing for smooth scrubbing
    }, 0);

    // Add a subtle zoom effect for depth
    tl.to(videoref.current, {
      scale: 1.1,
      ease: "sine.out"
    }, 0);

    // Fade out overlay as video plays
    tl.to(overlayRef.current, {
      opacity: 0,
      ease: "power1.out"
    }, 0);

  }, [videoLoaded]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div ref={containerRef} className='relative h-screen w-full overflow-hidden  layout opacity-0'>
  
      
      <video 
        ref={videoref}
        className='h-full w-full object-cover scale-105' // Initial scale for zoom effect
        src="./video/Cyberpunk_Street_Light_Trails_Video (1) (1).mp4"
        playsInline 
        muted
        preload="auto"
        onLoadedMetadata={handleVideoLoaded}
      ></video>
      
    
      </div>

  );
};

export default Videosection;
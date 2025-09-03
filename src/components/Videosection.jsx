import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Videosection = () => {
  const videoref = useRef(null);
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useGSAP(() => {
    // Only set up the animation if the video is loaded
    if (!videoLoaded) return;

    // Set initial state
    gsap.set(".layout", { opacity: 1 });

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
        markers: true // helpful for debugging, remove in production
      }
    });

    // Animate the video's currentTime based on scroll
    tl.to(videoref.current, {
      currentTime: videoref.current.duration || 10,
      ease: 'none'
    });

  }, [videoLoaded]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div ref={containerRef} className='h-screen w-full overflow-hidden bg-gray-950 layout opacity-0'>
      <video 
        ref={videoref}
        className='h-full w-full object-cover'
        src="./video/Urban_Rooftop_Boombox_Video_Generation.mp4"
        playsInline 
        muted
        onLoadedMetadata={handleVideoLoaded}
      ></video>
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>Loading video...</p>
        </div>
      )}
    </div>
  );
};

export default Videosection;
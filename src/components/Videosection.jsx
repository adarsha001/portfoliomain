import React, { useRef, useState, useEffect } from 'react';
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
  const [videoDuration, setVideoDuration] = useState(0);

  // Preload and optimize video
  useEffect(() => {
    const video = videoref.current;
    if (!video) return;

    // Set video properties for better performance
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    
    // Force load the video
    video.load();
    
    return () => {
      // Cleanup
      if (video) {
        video.currentTime = 0;
      }
    };
  }, []);

  useGSAP(() => {
    if (!videoLoaded || !videoDuration) return;

    const video = videoref.current;
    const container = containerRef.current;

    // Set initial state
    gsap.set(".layout", { opacity: 1 });
    gsap.set(video, { scale: 1 });

    // Create timeline with optimized ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%', // Adjusted for better control
        scrub: 1.5, // Lower value for more responsive scrubbing
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true, // Helps with responsive behavior
        fastScrollEnd: true, // Prevents lag on fast scrolling
        preventOverlaps: true, // Prevents animation conflicts
      }
    });

    // Smooth video currentTime animation
    tl.to({}, {
      duration: 1,
      ease: "none",
      onUpdate: function() {
        const progress = this.progress();
        const targetTime = progress * videoDuration;
        
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          if (video && !video.seeking) {
            video.currentTime = targetTime;
          }
        });
      }
    }, 0);

    // Subtle scale animation for depth
    tl.to(video, {
      scale: 1.05,
      duration: 1,
      ease: "power1.out"
    }, 0);

    // Fade overlay
    if (overlayRef.current) {
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 0);
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [videoLoaded, videoDuration]);

  const handleVideoLoaded = () => {
    const video = videoref.current;
    if (video && video.duration) {
      setVideoDuration(video.duration);
      setVideoLoaded(true);
      
      // Ensure video is ready
      video.currentTime = 0;
    }
  };

  const handleVideoError = (e) => {
    console.error('Video loading error:', e);
  };

  return (
    <div 
      ref={containerRef} 
      className='relative h-screen w-full overflow-hidden layout opacity-0'
      style={{ willChange: 'transform' }} // Optimize for animations
    >
      <video 
        ref={videoref}
        className='h-full w-full object-cover'
        src="./video/Cyberpunk_Street_Light_Trails_Video (1) (1).mp4"
        playsInline 
        muted
        preload="metadata" // Changed from "auto" for faster initial load
        onLoadedMetadata={handleVideoLoaded}
        onLoadedData={handleVideoLoaded} // Backup event
        onError={handleVideoError}
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden' // Prevents flickering
        }}
      />
      
      {/* Optional loading indicator */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white">Loading video...</div>
        </div>
      )}
      
      {/* Overlay ref for potential use */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-20 pointer-events-none"
      />
    </div>
  );
};

export default Videosection;
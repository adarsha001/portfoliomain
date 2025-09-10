import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollSnapPages = () => {
  const containerRef = useRef(null);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for page 1 content
      gsap.fromTo(page1Ref.current.querySelector('.content'), 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );

      // Animation for page 2 content on scroll
      gsap.fromTo(page2Ref.current.querySelector('.content'),
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: page2Ref.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Optional: Add a subtle parallax effect to backgrounds
      gsap.to(page1Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: page1Ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Page 1 */}
      <div 
        ref={page1Ref}
        className="h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="content text-center text-white px-8">
          <h1 className="text-6xl font-bold mb-6">Welcome</h1>
          <p className="text-xl opacity-90 max-w-md mx-auto leading-relaxed">
            Scroll down to discover the next page with smooth GSAP animations
          </p>
          <div className="mt-8 animate-bounce">
            <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div 
        ref={page2Ref}
        className="h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="content text-center text-white px-8">
          <h1 className="text-6xl font-bold mb-6">Discover</h1>
          <p className="text-xl opacity-90 max-w-md mx-auto leading-relaxed mb-8">
            This page animates in with GSAP when you scroll down
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-sm">Fast</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-3xl mb-2">✨</div>
              <p className="text-sm">Smooth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSnapPages;
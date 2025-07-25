import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!vantaEffect && window.VANTA?.NET && vantaRef.current) {
        setVantaEffect(
          window.VANTA.NET({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x000000,
            color: 0xffffff,
            points: 10.0,
            maxDistance: 25.0,
            spacing: 15.0,
          })
        );
      }
    }, 300);

    return () => {
      if (vantaEffect) vantaEffect.destroy();
      clearTimeout(timeout);
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
};

export default SpaceBackground;

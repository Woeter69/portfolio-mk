"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DNAIntroProps {
  onComplete: () => void;
}

export default function DNAIntro({ onComplete }: DNAIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  // Phase: 0 = DNA, 1 = Cluster, 2 = Exiting
  const phaseRef = useRef(0); 
  const [buttonText, setButtonText] = useState("CLICK TO INITIALIZE");
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleClick = () => {
    if (phaseRef.current === 0) {
      phaseRef.current = 1;
      setButtonText("CLICK TO ENTER");
    } else if (phaseRef.current === 1) {
      phaseRef.current = 2;
      setButtonText("");
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    // ... (scene setup remains same)

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // DNA Particles
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3); // Helix
    const starPositions = new Float32Array(particleCount * 3); // Stars
    const spherePositions = new Float32Array(particleCount * 3); // Singularity
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color("#00c3ff"); // Cyan
    const color2 = new THREE.Color("#8a5cff"); // Purple

    for (let i = 0; i < particleCount; i++) {
      // ... (existing helix logic setup)
      // Random start positions (Scattered)
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Target Helix Positions
      const t = (i / particleCount) * Math.PI * 10 - (Math.PI * 5); // Spread along Y
      const radius = 5;
      
      const isStrandA = i % 2 === 0;
      const angle = t + (isStrandA ? 0 : Math.PI);
      
      targetPositions[i * 3] = Math.cos(angle) * radius; // x
      targetPositions[i * 3 + 1] = t * 1.5; // y
      targetPositions[i * 3 + 2] = Math.sin(angle) * radius; // z

      if (i % 10 === 0) {
          targetPositions[i * 3] *= (Math.random()); 
          targetPositions[i * 3 + 2] *= (Math.random()); 
      }

      // Star Positions (Explosion)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 30 + Math.random() * 40; 
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      // Sphere Positions (Singularity)
      const r2 = 2 + Math.random() * 2; // Small dense sphere radius 2-4
      spherePositions[i * 3] = r2 * Math.sin(phi) * Math.cos(theta);
      spherePositions[i * 3 + 1] = r2 * Math.sin(phi) * Math.sin(theta);
      spherePositions[i * 3 + 2] = r2 * Math.cos(phi);

      // Colors
      const color = isStrandA ? color1 : color2;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId: number;
    let exitStartTime = 0;

    const animate = () => {
      const time = clock.getElapsedTime();
      
      const targetRotX = mouseRef.current.y * 1.5; 
      const targetRotY = mouseRef.current.x * 1.5; 

      particles.rotation.x += (targetRotX - particles.rotation.x) * 0.05;
      particles.rotation.y += (targetRotY - particles.rotation.y) * 0.05;
      
      if (phaseRef.current < 2) {
          particles.rotation.y += 0.002;
      }

      const posAttribute = geometry.attributes.position;
      const currentPhase = phaseRef.current;

      // PHASE 2: BIG BANG / FLY OUT
      if (currentPhase === 2) {
          if (exitStartTime === 0) exitStartTime = time;
          const exitTime = time - exitStartTime;
          
          // Acceleration factor
          const speed = 1.0 + (exitTime * exitTime * 50.0);

          for (let i = 0; i < particleCount; i++) {
            const cx = posAttribute.getX(i);
            const cy = posAttribute.getY(i);
            const cz = posAttribute.getZ(i);

            // Normalize direction from center
            const d = Math.sqrt(cx*cx + cy*cy + cz*cz) || 1;
            const dx = cx / d;
            const dy = cy / d;
            const dz = cz / d;

            // Move outwards
            posAttribute.setXYZ(
                i, 
                cx + dx * speed,
                cy + dy * speed,
                cz + dz * speed
            );
          }
          
          // Trigger Complete
          if (exitTime > 1.0) {
             onComplete();
          }
      }
      // PHASE 1: STAR CLUSTER
      else if (currentPhase === 1) {
          for (let i = 0; i < particleCount; i++) {
            const cx = posAttribute.getX(i);
            const cy = posAttribute.getY(i);
            const cz = posAttribute.getZ(i);

            const tx = starPositions[i * 3];
            const ty = starPositions[i * 3 + 1];
            const tz = starPositions[i * 3 + 2];

            posAttribute.setXYZ(
                i, 
                cx + (tx - cx) * 0.05,
                cy + (ty - cy) * 0.05,
                cz + (tz - cz) * 0.05
            );
          }
      }
      // PHASE 0: DNA HELIX
      else {
        if (time < 3.0 || true) {
             for (let i = 0; i < particleCount; i++) {
                const cx = posAttribute.getX(i);
                const cy = posAttribute.getY(i);
                const cz = posAttribute.getZ(i);

                const tx = targetPositions[i * 3];
                const ty = targetPositions[i * 3 + 1];
                const tz = targetPositions[i * 3 + 2];

                posAttribute.setXYZ(
                    i, 
                    cx + (tx - cx) * 0.05,
                    cy + (ty - cy) * 0.05,
                    cz + (tz - cz) * 0.05
                );
             }
        }
      }
      
      posAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
        ref={containerRef} 
        onClick={handleClick}
        className="fixed inset-0 z-50 bg-black transition-opacity duration-1000 cursor-pointer"
        style={{ opacity: opacity, pointerEvents: opacity < 0.1 ? 'none' : 'auto' }}
    >
      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
        <p className="text-white/50 text-sm tracking-[0.2em] animate-pulse">
          {buttonText}
        </p>
      </div>
    </div>
  );
}

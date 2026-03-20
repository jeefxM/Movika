"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeBackground({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Torus Knot geometry
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 256, 64);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2,
      transmission: 0.9,
      ior: 1.5,
      thickness: 0.5,
      iridescence: 0.3,
      iridescenceIOR: 1.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lighting
    const blueLight = new THREE.DirectionalLight(0x00d2ff, 3);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x8a2be2, 5, 20);
    purpleLight.position.set(-5, -5, 2);
    scene.add(purpleLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    // Animation loop
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.01;
      torusKnot.rotation.x += 0.002;
      torusKnot.rotation.y += 0.003;
      camera.position.x = Math.sin(time * 0.5) * 0.1;
      camera.position.y = Math.cos(time * 0.3) * 0.1;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // GSAP scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(camera.position, { z: 0.1, ease: "power1.inOut" }, 0);
    tl.to(camera.rotation, { z: Math.PI / 2, ease: "power1.inOut" }, 0);
    tl.to(
      torusKnot.rotation,
      { x: Math.PI * 2, y: Math.PI * 2, ease: "power1.inOut" },
      0
    );

    // Fade-in sections
    const textBlocks = document.querySelectorAll(".fade-in-section");
    textBlocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-100"
    />
  );
}

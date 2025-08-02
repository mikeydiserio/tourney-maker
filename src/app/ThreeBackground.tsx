'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CosmicNebulaBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

      if (typeof window === "undefined") {
      console.log("Component is running on the server.");
    } else {
      console.log("Component is running on the client.");
    }

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1) // Black background
    mountRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    // Create starfield with 5000 white particles
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 5000
    const starPositions = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starOpacities = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      
      // Random positions in a sphere
      const radius = Math.random() * 50 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i3 + 2] = radius * Math.cos(phi)
      
      // Random sizes for stars
      starSizes[i] = Math.random() * 0.1 + 0.05
      
      // Random initial opacities for twinkling
      starOpacities[i] = Math.random() * 0.5 + 0.5
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))
    starGeometry.setAttribute('opacity', new THREE.BufferAttribute(starOpacities, 1))

    // Star material with white color
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Create nebula clouds with purple/pink gradient
    const nebulaColors = [0x21EBA5, 0xEAA900, 0xC521EB] // Purple to pink gradient
    const nebulae: THREE.Points[] = []

    for (let i = 0; i < 3; i++) {
      const nebulaGeometry = new THREE.BufferGeometry()
      const nebulaParticleCount = 2000 + Math.random() * 1000
      const nebulaPositions = new Float32Array(nebulaParticleCount * 3)
      const nebulaSizes = new Float32Array(nebulaParticleCount)
      const nebulaColorsArray = new Float32Array(nebulaParticleCount * 3)

      for (let j = 0; j < nebulaParticleCount; j++) {
        const j3 = j * 3
        
        // Create cloud-like distribution
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 8 + 2
        const height = (Math.random() - 0.5) * 4
        
        nebulaPositions[j3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 10
        nebulaPositions[j3 + 1] = height + (Math.random() - 0.5) * 10
        nebulaPositions[j3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 10
        
        // Larger sizes for nebula particles
        nebulaSizes[j] = Math.random() * 0.3 + 0.2
        
        // Color variation within the nebula
        const colorIndex = Math.floor(Math.random() * nebulaColors.length)
        const color = new THREE.Color(nebulaColors[colorIndex])
        
        // Add some color variation
        const variation = 0.3
        nebulaColorsArray[j3] = Math.min(1, color.r + (Math.random() - 0.5) * variation)
        nebulaColorsArray[j3 + 1] = Math.min(1, color.g + (Math.random() - 0.5) * variation)
        nebulaColorsArray[j3 + 2] = Math.min(1, color.b + (Math.random() - 0.5) * variation)
      }

      nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3))
      nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1))
      nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColorsArray, 3))

      // Nebula material with additive blending
      const nebulaMaterial = new THREE.PointsMaterial({
        size: 0.3,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
        sizeAttenuation: true
      })

      const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
      
      // Position nebulae at different locations
      nebula.position.x = (Math.random() - 0.5) * 30
      nebula.position.y = (Math.random() - 0.5) * 30
      nebula.position.z = (Math.random() - 0.5) * 30
      
      scene.add(nebula)
      nebulae.push(nebula)
    }

    let animationId: number
    const clock = new THREE.Clock()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      const elapsedTime = clock.getElapsedTime()
      
      // Overall rotation
      scene.rotation.y += 0.001
      
      // Rotate nebulae at different speeds
      nebulae.forEach((nebula, index) => {
        nebula.rotation.y += 0.0005 * (index + 1)
        nebula.rotation.x += 0.0003 * (index + 1)
      })
      
      // Star twinkling effect
      const starOpacityAttribute = starGeometry.getAttribute('opacity') as THREE.BufferAttribute
      const starOpacityArray = starOpacityAttribute.array as Float32Array
      
      for (let i = 0; i < starCount; i++) {
        // Create twinkling effect using sine wave
        const twinkle = Math.sin(elapsedTime * 2 + i * 0.1) * 0.3 + 0.7
        starOpacityArray[i] = twinkle
      }
      
      starOpacityAttribute.needsUpdate = true
      
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      style={{ 
        background: '#000000',
        pointerEvents: 'none' // Allow interaction with elements above
      }}
    />
  )
}
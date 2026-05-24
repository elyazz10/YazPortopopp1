"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

export function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Perhitungan kemiringan
    setPosition({ x: middleX / 15, y: middleY / 15 })
  }

  const resetMouse = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      animate={{ rotateX: -position.y, rotateY: position.x }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      className={`relative ${className}`}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{ x: position.x / 2, y: position.y / 2 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

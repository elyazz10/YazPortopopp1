"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

export function MagneticBtn({ children, className, onClick, type = "button", disabled }: { children: React.ReactNode, className?: string, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Magnetic pull
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

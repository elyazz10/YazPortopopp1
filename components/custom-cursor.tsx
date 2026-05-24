"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSoundEffect } from "@/hooks/use-sound"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const playSound = useSoundEffect()

  useEffect(() => {
    // Hanya tampilkan kustom kursor di desktop, di HP/Touchscreen disembunyikan
    if (window.matchMedia("(pointer: coarse)").matches) return

    setIsVisible(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    let lastHoverState = false

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null

      setIsHovering(isClickable)
      
      // Play hover sound only when transitioning to a clickable element
      if (isClickable && !lastHoverState) {
        playSound("hover")
      }
      lastHoverState = isClickable
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null

      if (isClickable) {
        playSound("click")
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [playSound])

  if (!isVisible) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, a, button, input, textarea {
            cursor: none !important;
          }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[3px] border-foreground bg-background/80 backdrop-blur-sm rounded-full pointer-events-none z-[9999] flex items-center justify-center shadow-[2px_2px_0px_var(--foreground)]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "var(--foreground)" : "var(--background)",
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 35,
          mass: 0.5
        }}
      >
        <motion.div 
          className="w-2 h-2 rounded-full"
          animate={{
            backgroundColor: isHovering ? "var(--background)" : "var(--foreground)",
            scale: isHovering ? 0 : 1
          }}
        />
        {isHovering && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute text-[8px] font-bold text-background font-mono tracking-widest whitespace-nowrap"
          >
            CLICK
          </motion.span>
        )}
      </motion.div>
    </>
  )
}

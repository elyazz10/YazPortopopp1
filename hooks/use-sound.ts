"use client"

import { useCallback } from "react"

export function useSoundEffect() {
  const playSound = useCallback((type: "hover" | "click" | "switch") => {
    // Prevent errors on server-side or if AudioContext isn't supported
    if (typeof window === "undefined" || !window.AudioContext && !(window as any).webkitAudioContext) return

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioContext()
      
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      const now = ctx.currentTime
      
      if (type === "hover") {
        // High, short click
        osc.type = "sine"
        osc.frequency.setValueAtTime(800, now)
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05)
        gain.gain.setValueAtTime(0.05, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
        osc.start(now)
        osc.stop(now + 0.05)
      } else if (type === "click") {
        // Lower, slightly longer mechanical click
        osc.type = "square"
        osc.frequency.setValueAtTime(300, now)
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
        osc.start(now)
        osc.stop(now + 0.1)
      } else if (type === "switch") {
        // Sci-fi power switch sound
        osc.type = "triangle"
        osc.frequency.setValueAtTime(200, now)
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15)
        gain.gain.setValueAtTime(0.15, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
        osc.start(now)
        osc.stop(now + 0.15)
      }
    } catch (e) {
      // Ignore audio errors (e.g., user hasn't interacted with page yet)
    }
  }, [])

  return playSound
}

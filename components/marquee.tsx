"use client"

import { motion } from "framer-motion"

export function MarqueeText({ text = "AVAILABLE FOR FREELANCE • FULLSTACK ENGINEER • CREATIVE UI/UX • " }: { text?: string }) {
  return (
    <div className="w-full bg-foreground text-background py-3 border-y-2 border-[var(--border-color)] overflow-hidden flex whitespace-nowrap relative z-10">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 15 // kecepatan scrolling (semakin kecil, semakin cepat)
        }}
        className="flex gap-4 items-center"
      >
        <span className="font-heading text-2xl md:text-4xl tracking-widest uppercase">
          {text}
        </span>
        <span className="font-heading text-2xl md:text-4xl tracking-widest uppercase">
          {text}
        </span>
        <span className="font-heading text-2xl md:text-4xl tracking-widest uppercase">
          {text}
        </span>
      </motion.div>
    </div>
  )
}

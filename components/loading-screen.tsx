"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0c0c0c" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] font-heading uppercase leading-none tracking-tighter"
            style={{ color: "#f5f5f5" }}
          >
            AHMAD
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] font-heading uppercase leading-none tracking-tighter"
            style={{ WebkitTextStroke: "2px #f5f5f5", color: "transparent" }}
          >
            ILYAS
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-[2px] mt-10 rounded-full"
            style={{ backgroundColor: "#f5f5f5" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

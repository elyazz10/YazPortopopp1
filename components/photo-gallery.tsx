"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface PhotoGalleryProps {
  isOpen: boolean
  onClose: () => void
  title: string
  photos: string[]
}

export function PhotoGallery({ isOpen, onClose, title, photos }: PhotoGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const prev = () => setSelected((s) => (s !== null ? (s - 1 + photos.length) % photos.length : null))
  const next = () => setSelected((s) => (s !== null ? (s + 1) % photos.length : null))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
          onClick={selected !== null ? () => setSelected(null) : onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-4xl bg-background border-[3px] border-foreground shadow-[8px_8px_0px_var(--foreground)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-[3px] border-foreground px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📁</span>
                <div>
                  <p className="font-heading text-xl uppercase tracking-widest">{title}</p>
                  <p className="font-mono text-[10px] opacity-50">{photos.length} FILES</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Grid view */}
            {selected === null ? (
              <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="relative aspect-video border-[3px] border-foreground overflow-hidden cursor-pointer group"
                    onClick={() => setSelected(i)}
                  >
                    <Image
                      src={src}
                      alt={`Journey photo ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-background text-xs font-bold border-2 border-background px-3 py-1">
                        EXPAND →
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-background border border-foreground px-2 py-0.5 font-mono text-[9px] font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Lightbox view */
              <div className="relative flex flex-col items-center justify-center bg-black/10 p-4 gap-4">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full max-h-[400px] aspect-video border-[3px] border-foreground overflow-hidden"
                >
                  <Image
                    src={photos[selected]}
                    alt={`Journey photo ${selected + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Nav toolbar — mobile friendly */}
                <div className="flex items-center gap-4 w-full justify-center pb-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 border-2 border-foreground bg-background flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="bg-background border-2 border-foreground px-4 py-1 font-mono text-xs font-bold">
                    {selected + 1} / {photos.length}
                  </span>
                  <button
                    onClick={next}
                    className="w-10 h-10 border-2 border-foreground bg-background flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-10 h-10 border-2 border-foreground bg-background flex items-center justify-center hover:bg-foreground hover:text-background transition-colors ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t-[3px] border-foreground px-6 py-3 flex items-center gap-2 font-mono text-[10px] opacity-50">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              CLICK PHOTO TO EXPAND • ESC TO CLOSE
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

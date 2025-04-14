"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Loader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-lg w-full mx-auto px-4"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome to my <span className="text-green-500">Portfolio</span>
            </h2>
            <p className="text-gray-400 mb-8">Loading your experience...</p>
          </motion.div>

          <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-2 mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>

          <p className="text-green-500/60 text-sm font-mono">Initializing...</p>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500/10 text-xs font-mono"
              initial={{
                x: i % 2 === 0 ? -20 : window.innerWidth + 20,
                y: (window.innerHeight * i) / 50,
              }}
              animate={{
                x: i % 2 === 0 ? window.innerWidth + 20 : -20,
                y: (window.innerHeight * i) / 50,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

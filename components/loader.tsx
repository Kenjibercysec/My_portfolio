"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, Code } from "lucide-react"

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const [glitchEffect, setGlitchEffect] = useState(false)
  const loadingTexts = [
    "Initializing security protocols...",
    "Scanning for vulnerabilities...",
    "Establishing secure connection...",
    "Decrypting access codes...",
    "Loading security dashboard...",
    "Analyzing network traffic...",
    "Verifying encryption keys...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 25)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setText(loadingTexts[randomIndex])
    }, 1500)

    return () => clearInterval(textInterval)
  }, [])

  useEffect(() => {
    // Add glitch effect occasionally
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          className="mb-8 relative"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="w-24 h-24 rounded-full border-4 border-dashed border-green-500/30 absolute inset-0" />
        </motion.div>

        <div className="relative w-24 h-24 mx-auto mb-8">
          <Shield className={`w-24 h-24 text-green-500 ${glitchEffect ? "opacity-0" : "opacity-100"}`} />

          {glitchEffect && (
            <>
              <Shield className="w-24 h-24 text-red-500 absolute top-0 left-0 transform translate-x-1" />
              <Shield className="w-24 h-24 text-blue-500 absolute top-0 left-0 transform -translate-x-1" />
            </>
          )}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Shield className="w-24 h-24 text-green-400" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Silas<span className="text-green-500">Kenji</span>
        </h2>
        <p className="text-green-500 font-mono mb-6 h-6">{text}</p>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-gray-500 mt-2 text-sm font-mono">{progress}%</p>

        {/* Binary code animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500/10 text-xs font-mono"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 0.1 + Math.random() * 0.3,
              }}
              animate={{
                y: window.innerHeight + 20,
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              {Array.from({ length: 8 })
                .map(() => (Math.random() > 0.5 ? "1" : "0"))
                .join("")}
            </motion.div>
          ))}
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute"
            initial={{ x: "10%", y: "20%", opacity: 0.3 }}
            animate={{ y: ["20%", "25%", "20%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Lock className="w-8 h-8 text-green-500/40" />
          </motion.div>

          <motion.div
            className="absolute"
            initial={{ x: "80%", y: "70%", opacity: 0.3 }}
            animate={{ y: ["70%", "75%", "70%"] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Code className="w-8 h-8 text-green-500/40" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

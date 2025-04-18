"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal } from "lucide-react"
import Hero from "@/components/hero"
import TerminalSection from "@/components/terminal-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import Loader from "@/components/loader"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black text-green-500 relative overflow-hidden"
          >
            <ParticleBackground />
            <Navbar />
            <Hero />
            <TerminalSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />

            <footer className="py-6 text-center text-sm text-green-500/60 relative z-10">
              <div className="container mx-auto">
                <p>© {new Date().getFullYear()} Silas Kenji. All rights reserved.</p>
                <div className="flex items-center justify-center mt-2 gap-2">
                  <Terminal size={14} />
                  <span>Secured with passion</span>
                </div>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}

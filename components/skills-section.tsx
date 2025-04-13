"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Code, Server, Database, Wifi, Bug, FileCode, AlertTriangle, Key } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

export default function SkillsSection() {
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({})

  const skills = [
    { name: "Penetration Testing", icon: Bug, value: 36 },
    { name: "Network Security", icon: Wifi, value: 44 },
    { name: "Incident Response", icon: AlertTriangle, value: 32 },
    { name: "Cryptography", icon: Key, value: 40 },
    { name: "Security Architecture", icon: Shield, value: 41 },
    { name: "Database Security", icon: Database, value: 34 },
    { name: "Development", icon: Code, value: 67 },
    { name: "Access Management", icon: Lock, value: 51 },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start animating skills when section is visible
          const timer = setTimeout(() => {
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedSkills((prev) => ({
                  ...prev,
                  [skill.name]: skill.value,
                }))
              }, index * 100)
            })
          }, 500)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("skills")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <section className="py-20 bg-gray-900 relative z-10" id="skills">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Technical <span className="text-green-500">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My expertise spans across multiple areas
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-800 p-6 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-all duration-300">
                  <skill.icon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                  <div className="text-green-500 font-mono">{animatedSkills[skill.name] || 0}%</div>
                </div>
              </div>
              <Progress
                value={animatedSkills[skill.name] || 0}
                className="h-2 bg-gray-700"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Programming Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { name: "C/C++", level: 81 },
              { name: "Python", level: 77 },
              { name: "JavaScript", level: 55 },
              { name: "HTML/CSS", level: 56 },
              { name: "Bash", level: 70 },
              { name: "PowerShell", level: 70 },
              { name: "SQL", level: 77 },
              { name: "Go", level: 32 },
            ].map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-800 py-4 px-4 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
              >
                <span className="text-gray-300 block mb-2">{lang.name}</span>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
                <span className="text-xs text-green-400 mt-1 block">{lang.level}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-500/30"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  )
}

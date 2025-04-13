"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalIcon, X, Minimize, Maximize, ChevronRight } from "lucide-react"

export default function TerminalSection() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [terminalMinimized, setTerminalMinimized] = useState(false)
  const [terminalMaximized, setTerminalMaximized] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const lines = [
    "$ whoami",
    "silas_kenji",
    "$ cat about.txt",
    "Cybersecurity specialist with expertise in penetration testing,",
    "vulnerability assessment, and security architecture.",
    "Experienced in developing secure applications and tools.",
    "$ ls -la projects/",
    "drwxr-xr-x  2 silas staff  68B Apr 12 10:30 cryptofile",
    "drwxr-xr-x  2 silas staff  68B Apr 12 10:30 dexter",
    "drwxr-xr-x  2 silas staff  68B Apr 12 10:30 api_c",
    "drwxr-xr-x  2 silas staff  68B Apr 12 10:30 singed",
    "drwxr-xr-x  2 silas staff  68B Apr 12 10:30 raspberry_pi_monitor",
    "drwxr-xr-x  2 silas staff  68B Apr 12 10:30 ecommerce_frutas",
    "$ cat skills.json",
    "{",
    '  "languages": ["C", "Python", "JavaScript", "HTML/CSS"],',
    '  "security": ["Penetration Testing", "Network Security", "Encryption"],',
    '  "tools": ["Wireshark", "Metasploit", "Burp Suite", "Nmap"]',
    "}",
    "$ sudo nmap -sV secure.target.com",
    "Password: ********",
    "Starting Nmap scan...",
    "Scanning secure.target.com...",
    "PORT    STATE SERVICE  VERSION",
    "22/tcp  open  ssh      OpenSSH 8.4",
    "80/tcp  open  http     nginx 1.18.0",
    "443/tcp open  https    nginx 1.18.0",
    "$ exit",
  ]

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine >= lines.length) return

    let i = 0
    const typingInterval = setInterval(() => {
      if (i <= lines[currentLine].length) {
        setText(lines[currentLine].substring(0, i))
        i++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          if (terminalRef.current) {
            const newLine = document.createElement("div")
            newLine.className = "terminal-line"
            newLine.innerHTML = lines[currentLine]
            terminalRef.current.appendChild(newLine)
            setText("")
            setCurrentLine((prev) => prev + 1)
          }
        }, 500)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentLine])

  const handleMinimize = () => {
    setTerminalMinimized(true)
    setTerminalMaximized(false)
  }

  const handleMaximize = () => {
    setTerminalMaximized(true)
    setTerminalMinimized(false)
  }

  const handleRestore = () => {
    setTerminalMinimized(false)
    setTerminalMaximized(false)
  }

  return (
    <section className="py-20 bg-black relative z-10" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            About <span className="text-green-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <AnimatePresence>
            {!terminalMinimized && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-green-500/30 ${
                  terminalMaximized ? "fixed inset-4 z-50" : ""
                }`}
              >
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <TerminalIcon size={16} className="text-green-500 mr-2" />
                    <span className="text-gray-300 text-sm">silas@security-terminal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-200" onClick={handleMinimize}>
                      <Minimize size={14} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-200"
                      onClick={terminalMaximized ? handleRestore : handleMaximize}
                    >
                      <Maximize size={14} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-200" onClick={handleMinimize}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4 font-mono text-sm text-green-500 bg-black min-h-[300px] max-h-[500px] overflow-auto">
                  <div ref={terminalRef} className="terminal-content">
                    {/* Terminal lines will be appended here */}
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500">$ </span>
                    <span className="ml-1">{text}</span>
                    <span
                      className={`ml-0.5 inline-block w-2 h-4 bg-green-500 ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {terminalMinimized && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-green-500/30 p-2 cursor-pointer"
              onClick={handleRestore}
            >
              <div className="flex items-center">
                <TerminalIcon size={16} className="text-green-500 mr-2" />
                <span className="text-gray-300 text-sm">Terminal (minimized)</span>
                <ChevronRight size={14} className="ml-2 text-green-500" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

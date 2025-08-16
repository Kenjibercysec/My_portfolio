"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github, FileText, Calendar, Tag, Eye, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Writeup {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  platform: string
  date: string
  tags: string[]
  githubUrl: string
  readmeUrl?: string
  solved: boolean
  points?: number
  rating?: number
}

const writeups: Writeup[] = [
  {
    id: "pwn-101",
    title: "Pwn 101 - Buffer Overflow Basics",
    description: "Basic buffer overflow exploitation on a simple binary. Covers stack overflow, ret2libc, and basic ROP chains.",
    category: "Pwn",
    difficulty: "Easy",
    platform: "CTFTime",
    date: "2024-01-15",
    tags: ["pwn", "buffer-overflow", "rop", "ret2libc"],
    githubUrl: "https://github.com/silaskenji/ctf-writeups/tree/main/pwn-101",
    readmeUrl: "https://github.com/silaskenji/ctf-writeups/blob/main/pwn-101/README.md",
    solved: true,
    points: 100,
    rating: 4.5
  },
  {
    id: "web-xss",
    title: "Web XSS Challenge - DOM Manipulation",
    description: "Cross-site scripting challenge involving DOM manipulation and filter bypass techniques.",
    category: "Web",
    difficulty: "Medium",
    platform: "HackTheBox",
    date: "2024-01-20",
    tags: ["web", "xss", "dom", "filter-bypass"],
    githubUrl: "https://github.com/silaskenji/ctf-writeups/tree/main/web-xss",
    solved: true,
    points: 250,
    rating: 4.8
  },
  {
    id: "crypto-rsa",
    title: "Crypto RSA - Wiener's Attack",
    description: "RSA cryptography challenge implementing Wiener's attack on small private exponents.",
    category: "Crypto",
    difficulty: "Hard",
    platform: "CTFTime",
    date: "2024-02-01",
    tags: ["crypto", "rsa", "wiener-attack", "number-theory"],
    githubUrl: "https://github.com/silaskenji/ctf-writeups/tree/main/crypto-rsa",
    solved: true,
    points: 400,
    rating: 5.0
  },
  {
    id: "forensics-memory",
    title: "Forensics - Memory Dump Analysis",
    description: "Memory forensics challenge involving process analysis, network connections, and hidden data extraction.",
    category: "Forensics",
    difficulty: "Medium",
    platform: "HackTheBox",
    date: "2024-02-10",
    tags: ["forensics", "memory", "volatility", "process-analysis"],
    githubUrl: "https://github.com/silaskenji/ctf-writeups/tree/main/forensics-memory",
    solved: true,
    points: 300,
    rating: 4.6
  },
  {
    id: "rev-crackme",
    title: "Reverse Engineering - CrackMe Challenge",
    description: "Reverse engineering challenge analyzing a custom binary and understanding its protection mechanisms.",
    category: "Reverse",
    difficulty: "Medium",
    platform: "CTFTime",
    date: "2024-02-15",
    tags: ["reverse", "ida", "ghidra", "assembly", "crackme"],
    githubUrl: "https://github.com/silaskenji/ctf-writeups/tree/main/rev-crackme",
    solved: true,
    points: 350,
    rating: 4.7
  },
  {
    id: "misc-forensics",
    title: "Misc - Steganography & Forensics",
    description: "Miscellaneous challenge combining steganography techniques with file forensics analysis.",
    category: "Misc",
    difficulty: "Easy",
    platform: "HackTheBox",
    date: "2024-02-20",
    tags: ["misc", "steganography", "forensics", "file-analysis"],
    githubUrl: "https://github.com/silaskenji/ctf-writeups/tree/main/misc-forensics",
    solved: true,
    points: 150,
    rating: 4.3
  }
]

const categories = [
  { id: "all", name: "All Writeups", count: writeups.length },
  { id: "pwn", name: "Pwn", count: writeups.filter(w => w.category === "Pwn").length },
  { id: "web", name: "Web", count: writeups.filter(w => w.category === "Web").length },
  { id: "crypto", name: "Crypto", count: writeups.filter(w => w.category === "Crypto").length },
  { id: "forensics", name: "Forensics", count: writeups.filter(w => w.category === "Forensics").length },
  { id: "reverse", name: "Reverse", count: writeups.filter(w => w.category === "Reverse").length },
  { id: "misc", name: "Misc", count: writeups.filter(w => w.category === "Misc").length }
]

export default function WriteupsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedWriteup, setSelectedWriteup] = useState<Writeup | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filteredWriteups = activeCategory === "all" 
    ? writeups 
    : writeups.filter(writeup => writeup.category.toLowerCase() === activeCategory)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const handleWriteupClick = (writeup: Writeup) => {
    setSelectedWriteup(writeup)
    setIsModalOpen(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'hard': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Pwn': 'bg-red-500/10 text-red-400 border-red-500/30',
      'Web': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'Crypto': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'Forensics': 'bg-green-500/10 text-green-400 border-green-500/30',
      'Reverse': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      'Misc': 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
    return colors[category as keyof typeof colors] || colors['Misc']
  }

  return (
    <section id="writeups" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            CTF <span className="text-red-600">Writeups</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Detailed solutions and walkthroughs for Capture The Flag challenges I've solved. 
            From pwn to web, crypto to forensics - explore my journey through various security challenges.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
                    : "border-red-600/50 text-red-600 hover:bg-red-900/20"
                }
                border`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Writeups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWriteups.map((writeup, index) => (
            <motion.div
              key={writeup.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-red-600/20 overflow-hidden h-full flex flex-col hover:border-red-600/50 transition-all duration-300 cursor-pointer group">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getCategoryColor(writeup.category)}>
                      {writeup.category}
                    </Badge>
                    <Badge className={getDifficultyColor(writeup.difficulty)}>
                      {writeup.difficulty}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {writeup.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {writeup.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span>{new Date(writeup.date).toLocaleDateString()}</span>
                    </div>
                    {writeup.points && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Star size={14} />
                        <span>{writeup.points} pts</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {writeup.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-red-600/10 text-red-400 border-none">
                        {tag}
                      </Badge>
                    ))}
                    {writeup.tags.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-600/20 text-gray-400 border-none">
                        +{writeup.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600/50 text-red-600 hover:bg-red-900/20 flex-1"
                      onClick={() => handleWriteupClick(writeup)}
                    >
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600/50 text-red-600 hover:bg-red-900/20"
                      onClick={() => window.open(writeup.githubUrl, "_blank")}
                    >
                      <Github size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GitHub Repository Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gray-900 p-8 rounded-lg border border-red-600/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-500">
            <h3 className="text-2xl font-semibold text-white mb-4">Complete Writeups Repository</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              All my CTF writeups are organized and documented in my GitHub repository. 
              Each writeup includes detailed explanations, code snippets, and step-by-step solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.open("https://github.com/silaskenji/ctf-writeups", "_blank")}
              >
                <Github className="w-5 h-5 mr-2" />
                View Repository
              </Button>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-900/20"
                onClick={() => window.open("https://github.com/silaskenji/ctf-writeups/blob/main/README.md", "_blank")}
              >
                <FileText className="w-5 h-5 mr-2" />
                Repository README
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Writeup Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedWriteup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full border border-red-600/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedWriteup.title}</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={getCategoryColor(selectedWriteup.category)}>
                      {selectedWriteup.category}
                    </Badge>
                    <Badge className={getDifficultyColor(selectedWriteup.difficulty)}>
                      {selectedWriteup.difficulty}
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                      {selectedWriteup.platform}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </Button>
              </div>

              <p className="text-gray-300 mb-6">{selectedWriteup.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Date Solved</h4>
                  <p className="text-white">{new Date(selectedWriteup.date).toLocaleDateString()}</p>
                </div>
                {selectedWriteup.points && (
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Points</h4>
                    <p className="text-yellow-400">{selectedWriteup.points}</p>
                  </div>
                )}
                {selectedWriteup.rating && (
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Rating</h4>
                    <p className="text-yellow-400">{selectedWriteup.rating}/5.0</p>
                  </div>
                )}
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Status</h4>
                  <p className={selectedWriteup.solved ? "text-green-400" : "text-red-400"}>
                    {selectedWriteup.solved ? "Solved" : "Unsolved"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-gray-400 text-sm mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWriteup.tags.map((tag, index) => (
                    <Badge key={index} className="bg-red-600/10 text-red-400 border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white flex-1"
                  onClick={() => window.open(selectedWriteup.githubUrl, "_blank")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
                {selectedWriteup.readmeUrl && (
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-900/20"
                    onClick={() => window.open(selectedWriteup.readmeUrl, "_blank")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Read Writeup
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 
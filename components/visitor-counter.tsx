"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function VisitorCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Recupera o contador atual do localStorage
    const currentCount = parseInt(localStorage.getItem("visitorCount") || "0")
    
    // Incrementa o contador
    const newCount = currentCount + 1
    
    // Salva o novo valor no localStorage
    localStorage.setItem("visitorCount", newCount.toString())
    
    // Atualiza o estado
    setCount(newCount)
  }, []) // Executa apenas uma vez quando o componente é montado

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 border border-green-500/20 rounded-full bg-black/50 hover:border-green-500/40 transition-colors">
      <Users size={12} className="text-green-500/60" />
      <span className="text-green-500/60 text-xs">{count.toLocaleString()} visitors</span>
    </div>
  )
} 
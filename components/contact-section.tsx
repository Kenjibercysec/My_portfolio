"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <section className="py-20 bg-gray-900 relative z-10" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Get In <span className="text-green-500">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a security concern or interested in working together? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 p-8 rounded-lg border border-green-500/20 h-full hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-all duration-500">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Email</h4>
                    <p className="text-green-500">silas.kenji@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Phone</h4>
                    <p className="text-green-500">+55 (87) 98806-7754</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Location</h4>
                    <p className="text-green-500">Petrolina, PE</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 hover:bg-green-500/20 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 hover:bg-green-500/20 transition-colors"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 hover:bg-green-500/20 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 p-8 rounded-lg border border-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-all duration-500">
              <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="bg-gray-700 border-gray-600 focus-visible:ring-green-500"
                      required
                    />
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="bg-gray-700 border-gray-600 focus-visible:ring-green-500"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="bg-gray-700 border-gray-600 focus-visible:ring-green-500"
                    required
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="bg-gray-700 border-gray-600 focus-visible:ring-green-500 min-h-[150px]"
                    required
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-green-500/40"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  )
}

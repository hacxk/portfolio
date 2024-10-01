"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Database, Cloud, Lock, Zap, Layers } from 'lucide-react'
import FloatingIcon from '../ui/FloatingIcon'


export default function HeroSection() {
    const [text, setText] = useState('')
    const fullText = "Elevate Your API Experience"
    const words = ['Intuitive', 'Powerful', 'Scalable', 'Secure']
    const [currentWord, setCurrentWord] = useState(0)

    useEffect(() => {
        if (text.length < fullText.length) {
            setTimeout(() => {
                setText(fullText.slice(0, text.length + 1))
            }, 100)
        }
    }, [text])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [words.length])

    const onHeroClick = () => {

    };

    return (
        <section id="home" className="relative min-h-screen w-full overflow-hidden bg-[#F0F4F8] text-[#2C3E50] font-sans">
            <div className="absolute inset-0">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E1E8ED" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <FloatingIcon
                icon={Code}
                x={10}
                y={20}
                delay={2.8}
                description="Clean, efficient code architecture"
            />
            <FloatingIcon
                icon={Database}
                x={85}
                y={15}
                delay={3.2}
                description="Robust and scalable database solutions"
            />
            <FloatingIcon
                icon={Cloud}
                x={75}
                y={75}
                delay={3.6}
                description="Cloud-native infrastructure for reliability"
            />
            <FloatingIcon
                icon={Lock}
                x={15}
                y={85}
                delay={4}
                description="Advanced security measures and encryption"
            />
            <FloatingIcon
                icon={Zap}
                x={90}
                y={50}
                delay={4.4}
                description="Lightning-fast response times"
            />
            <FloatingIcon
                icon={Layers}
                x={5}
                y={50}
                delay={4.8}
                description="Flexible, multi-layered API structure"
            />


            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] bg-clip-text text-transparent font-display"
                        whileHover={{ scale: 1.05 }}
                    >
                        API
                    </motion.span>
                    <motion.span
                        className="text-[#2C3E50] font-display"
                        whileHover={{ scale: 1.05 }}
                    >
                        Nexus
                    </motion.span>
                </motion.div>

                <motion.h1
                    className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C3E50] max-w-4xl font-display"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {text}
                </motion.h1>

                <motion.div
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#34495E] mb-8 font-display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <span className="mr-2">Discover</span>
                    <span className="inline-block w-32 sm:w-40 text-left">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={words[currentWord]}
                                className="inline-block text-[#3498DB]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {words[currentWord]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <span>APIs</span>
                </motion.div>

                <motion.p
                    className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-[#7F8C8D] leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    Empower your applications with our cutting-edge API solutions. Seamlessly integrate, scale, and transform your projects with unparalleled ease and efficiency.
                </motion.p>

                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <button
                        className="px-8 py-3 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        onClick={onHeroClick}
                    >
                        Start Your Journey
                    </button>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 flex justify-between items-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
            >
                <div className="text-left">
                    <p className="text-sm text-[#95A5A6]">Powering Innovation</p>
                    <p className="text-lg font-semibold text-[#34495E]">Since 2024</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-[#95A5A6]">Trusted by industry leaders</p>
                    <p className="text-lg font-semibold text-[#34495E]">0+ Enterprise Clients</p>
                </div>
            </motion.div>
        </section>
    )
}
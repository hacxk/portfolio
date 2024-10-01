"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, Home, Layers, DollarSign, Info, Mail } from 'lucide-react'
import { CTAButton } from '../ui/CTAButton'

interface NavItem {
    name: string
    href: string
    icon: React.ElementType
}

const navItems: NavItem[] = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Features', href: '#features', icon: Layers },
    { name: 'Pricing', href: '#pricing', icon: DollarSign },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('')
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                    history.replaceState(null, '', `#${entry.target.id}`)
                }
            })
        }, observerOptions)

        navItems.forEach((item) => {
            const element = document.querySelector(item.href)
            if (element) observerRef.current?.observe(element)
        })

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observerRef.current?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (pathname === '/' && !activeSection) {
            setActiveSection('home')
        }
    }, [pathname, activeSection])

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[#F0F4F8] bg-opacity-90 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="#home" className="text-2xl sm:text-3xl font-bold" onClick={() => handleNavClick('#home')}>
                            <span className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] bg-clip-text text-transparent">API</span>
                            <span className="text-[#2C3E50]">Nexus</span>
                        </Link>
                    </motion.div>
                    <div className="hidden md:flex items-center justify-center flex-grow">
                        <AnimatePresence>
                            {navItems.map((item) => (
                                <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={item.href}
                                        className={`relative flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeSection === item.href.slice(1)
                                            ? 'text-[#3498DB]'
                                            : 'text-[#2C3E50] hover:text-[#3498DB]'
                                            } transition-all duration-300 ease-in-out`}
                                        onClick={() => handleNavClick(item.href)}
                                    >
                                        <item.icon className="w-4 h-4 mr-2" />
                                        {item.name}
                                        {activeSection === item.href.slice(1) && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3498DB]"
                                                layoutId="underline"
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="hidden md:block">
                        <CTAButton text="Get Started" onClick={() => console.log('CTA clicked')} className="ml-4 p-2" />
                    </div>
                    <div className="md:hidden">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[#2C3E50] hover:text-[#3498DB] focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#F0F4F8] bg-opacity-90 backdrop-blur-md"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${activeSection === item.href.slice(1)
                                        ? 'text-[#3498DB] bg-[#E1E8ED]'
                                        : 'text-[#2C3E50] hover:text-[#3498DB] hover:bg-[#E1E8ED]'
                                        } transition-all duration-300 ease-in-out`}
                                    onClick={() => handleNavClick(item.href)}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            ))}
                            <div className="mt-4 px-3">
                                <CTAButton text="Get Started" onClick={() => console.log('Mobile CTA clicked')} className="w-full" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
    text: string
    onClick?: () => void
    className?: string
}

export const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick, className }) => {
    return (
        <motion.button
            className={`group rounded-full bg-gradient-to-r from-[#3498DB] to-[#2980B9] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl flex items-center justify-center space-x-2 ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <span>{text}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
    )
}
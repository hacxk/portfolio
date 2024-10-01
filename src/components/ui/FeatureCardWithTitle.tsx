import React from 'react'
import { motion } from 'framer-motion'

export interface FeatureStep {
    icon: React.ElementType
    title: string
    description: string
}

const FeatureCardWithTitle: React.FC<FeatureStep & { isActive: boolean; onClick: () => void }> = ({ icon: Icon, title, description, isActive, onClick }) => (
    <motion.div
        className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${isActive ? 'border-2 border-[#3498DB] scale-105' : 'hover:shadow-xl'
            }`}
        whileHover={{ scale: isActive ? 1.05 : 1.02 }}
        onClick={onClick}
    >
        <div className="flex items-center mb-4">
            <Icon className={`w-8 h-8 mr-3 ${isActive ? 'text-[#3498DB]' : 'text-[#7F8C8D]'}`} />
            <h3 className={`text-xl font-semibold ${isActive ? 'text-[#3498DB]' : 'text-[#2C3E50]'}`}>{title}</h3>
        </div>
        <p className="text-[#7F8C8D]">{description}</p>
    </motion.div>
)

export default FeatureCardWithTitle;
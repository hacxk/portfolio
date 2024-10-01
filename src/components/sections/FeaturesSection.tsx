"use client"

import React from 'react'
import { motion } from 'framer-motion'
import FeatureCard from '../ui/FeatureCard'
import { features } from '@/constants/sections/FeaturesSec-const'

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-[#F0F4F8]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
                        Powerful Features for Your API Needs
                    </h2>
                    <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                        Discover why developers choose API Nexus for their projects
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <FeatureCard {...feature} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
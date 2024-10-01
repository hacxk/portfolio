"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FeatureCardWithTitle from '../ui/FeatureCardWithTitle'
import { featureSteps } from '@/constants/sections/AboutSec-const'

const AboutSection: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0)

    const nextStep = () => {
        setActiveStep((prev) => (prev + 1) % featureSteps.length)
    }

    return (
        <section id="about" className="py-20 bg-gradient-to-b from-white to-[#F0F4F8]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
                        Transform Your Business with API Nexus
                    </h2>
                    <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                        Discover how our scalable API solutions can revolutionize your application development process.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featureSteps.map((step, index) => (
                        <FeatureCardWithTitle
                            key={index}
                            {...step}
                            isActive={index === activeStep}
                            onClick={() => setActiveStep(index)}
                        />
                    ))}
                </div>

                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={nextStep}
                        className="bg-[#3498DB] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#2980B9] transition-colors duration-300 flex items-center"
                    >
                        Next Feature <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </motion.div>

                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-3xl font-bold text-[#2C3E50] mb-6 text-center">Ready to Scale Your API?</h3>
                    <div className="bg-white rounded-xl shadow-xl p-8 max-w-3xl mx-auto">
                        <p className="text-lg text-[#34495E] mb-6">
                            Join thousands of developers who have already transformed their applications with API Nexus.
                            Start your journey towards limitless scalability and performance today.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-[#3498DB] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#2980B9] transition-colors duration-300">
                                Start Free Trial
                            </button>
                            <button className="bg-white text-[#3498DB] font-semibold py-3 px-8 rounded-full border-2 border-[#3498DB] hover:bg-[#F0F4F8] transition-colors duration-300">
                                Schedule a Demo
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutSection
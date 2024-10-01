"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, BarChart, Users, Star } from 'lucide-react'
import ToggleSwitch from '../ui/ToggleSwitch'
import PricingCard from '../ui/PricingCard'
import { pricingTiers } from '@/constants/sections/PricingSec-const'

const PricingSection: React.FC = () => {
    const [isYearly, setIsYearly] = useState(false)

    const handleSelect = (tier: string) => {
        console.log(`Selected tier: ${tier}`)
        // Implement your logic for tier selection here
    }

    return (
        <section id="pricing" className="py-20 bg-gradient-to-b from-[#F0F4F8] to-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                        Choose the perfect plan to power your API needs. No hidden fees, no surprises.
                    </p>
                </motion.div>

                <ToggleSwitch isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <PricingCard {...tier} isYearly={isYearly} onSelect={handleSelect} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">All Plans Include</h3>
                    <div className="flex flex-wrap justify-center gap-6 mt-8">
                        {[
                            { icon: BarChart, text: "Real-time Analytics" },
                            { icon: Shield, text: "Enterprise-grade Security" },
                            { icon: Users, text: "Collaborative Tools" },
                            { icon: Star, text: "99.99% Uptime Guarantee" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center bg-white rounded-lg shadow-md p-4"
                                whileHover={{ y: -5, boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.2)' }}
                                transition={{ duration: 0.2 }}
                            >
                                <item.icon className="w-6 h-6 mr-3 text-[#3498DB]" />
                                <span className="text-[#2C3E50] font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                        Not sure which plan is right for you? Try our 14-day free trial on any plan, no credit card required.
                    </p>
                    <button className="mt-6 bg-[#3498DB] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#2980B9] transition-colors duration-300">
                        Start Your Free Trial
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

export default PricingSection
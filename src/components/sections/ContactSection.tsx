"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github } from 'lucide-react'

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setSubmitMessage('Thank you for your message. We\'ll get back to you soon!')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-[#F0F4F8] to-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                        Have questions about API Nexus? We&apos;re here to help. Reach out to us anytime.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6">Send us a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[#34495E] mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#34495E] mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-[#34495E] mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-[#34495E] mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-[#3498DB] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#2980B9] transition-colors duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <>
                                        Send Message
                                        <Send className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                        {submitMessage && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-[#27AE60] font-medium"
                            >
                                {submitMessage}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6">Contact Information</h3>
                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-[#3498DB] mt-1" />
                            <div>
                                <h4 className="font-medium text-[#34495E]">Email</h4>
                                <p className="text-[#7F8C8D]">support@apinexus.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Phone className="w-6 h-6 text-[#3498DB] mt-1" />
                            <div>
                                <h4 className="font-medium text-[#34495E]">Phone</h4>
                                <p className="text-[#7F8C8D]">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-6 h-6 text-[#3498DB] mt-1" />
                            <div>
                                <h4 className="font-medium text-[#34495E]">Address</h4>
                                <p className="text-[#7F8C8D]">123 API Street, San Francisco, CA 94105</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-[#34495E] mb-2">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-[#3498DB] hover:text-[#2980B9] transition-colors duration-300">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-[#3498DB] hover:text-[#2980B9] transition-colors duration-300">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-[#3498DB] hover:text-[#2980B9] transition-colors duration-300">
                                    <Github className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
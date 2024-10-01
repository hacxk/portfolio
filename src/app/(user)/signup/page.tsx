'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

interface FormData {
    userName: string
    emailAddress: string
    phoneNumber: string
    password: string
    firstName: string
    lastName: string
    nickName: string
}

interface FormErrors {
    [key: string]: string
}

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        emailAddress: '',
        phoneNumber: '',
        password: '',
        firstName: '',
        lastName: '',
        nickName: ''
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateStep1 = (): boolean => {
        const newErrors: FormErrors = {}
        if (!formData.userName) newErrors.userName = 'Username is required'
        if (!formData.emailAddress) newErrors.emailAddress = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) newErrors.emailAddress = 'Email is invalid'
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateStep2 = (): boolean => {
        const newErrors: FormErrors = {}
        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateStep2()) {
            // Here you would typically send the data to your API
            console.log('Form submitted:', formData)
            // Redirect or show success message
        }
    }

    const pageVariants = {
        initial: { opacity: 0, y: 50 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -50 }
    }

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#E1F0FA] flex items-center justify-center px-4 py-12">
            <motion.div
                className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-8">Create Your Account</h2>
                <div className="mb-8 flex justify-center">
                    <div className="flex items-center">
                        {[1, 2].map((stepNumber) => (
                            <React.Fragment key={stepNumber}>
                                <motion.div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${step >= stepNumber ? 'bg-[#3498DB] text-white' : 'bg-gray-200 text-gray-600'
                                        }`}
                                    animate={{ scale: step === stepNumber ? 1.1 : 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {stepNumber}
                                </motion.div>
                                {stepNumber < 2 && (
                                    <div className="w-16 h-1 bg-gray-200 mx-2">
                                        <motion.div
                                            className="h-full bg-[#3498DB]"
                                            initial={{ width: 0 }}
                                            animate={{ width: step > stepNumber ? '100%' : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        {step === 1 ? (
                            <form onSubmit={e => e.preventDefault()} className="space-y-6">
                                <Input
                                    label="Username"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    error={errors.userName}
                                />
                                <Input
                                    label="Email Address"
                                    name="emailAddress"
                                    type="email"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    error={errors.emailAddress}
                                />
                                <Input
                                    label="Phone Number"
                                    name="phoneNumber"
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    error={errors.phoneNumber}
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                                <Button fullWidth onClick={handleNextStep}>
                                    Next <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={errors.firstName}
                                />
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={errors.lastName}
                                />
                                <Input
                                    label="Nickname (Optional)"
                                    name="nickName"
                                    value={formData.nickName}
                                    onChange={handleChange}
                                />
                                <div className="flex space-x-4">
                                    <Button variant="secondary" onClick={() => setStep(1)}>
                                        <ChevronLeft className="mr-2 h-5 w-5" /> Back
                                    </Button>
                                    <Button type="submit" fullWidth>
                                        Create Account <CheckCircle className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
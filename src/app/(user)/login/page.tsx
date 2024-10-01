'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { User, Lock, Mail, AlertCircle } from 'lucide-react'

interface LoginForm {
    userIdentifier: string
    password: string
}

interface LoginError {
    message: string
}

export default function LoginPage() {
    const [form, setForm] = useState<LoginForm>({ userIdentifier: '', password: '' })
    const [error, setError] = useState<LoginError | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/user/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    [form.userIdentifier.includes('@') ? 'emailAddress' : 'userName']: form.userIdentifier,
                    password: form.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                // Handle successful login
                console.log('Login successful:', data)
                router.push('/dashboard') // Redirect to dashboard or home page
            } else {
                setError({ message: data.error || 'An error occurred during login' })
            }
        } catch {
            setError({ message: 'An unexpected error occurred. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    }

    const inputVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <motion.div
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={inputVariants}>
                        <Input
                            label="Username or Email"
                            name="userIdentifier"
                            value={form.userIdentifier}
                            onChange={handleChange}
                            icon={form.userIdentifier.includes('@') ? <Mail className="text-gray-400" /> : <User className="text-gray-400" />}
                            placeholder="Enter your username or email"
                            required
                        />
                    </motion.div>
                    <motion.div variants={inputVariants}>
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            icon={<Lock className="text-gray-400" />}
                            placeholder="Enter your password"
                            required
                        />
                    </motion.div>
                    <motion.div
                        variants={inputVariants}
                        className="flex items-center justify-between text-sm"
                    >
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox text-blue-600" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </motion.div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="medium"
                        fullWidth
                        loading={loading}
                    >
                        Sign In
                    </Button>
                </form>
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center"
                        >
                            <AlertCircle className="w-5 h-5 mr-2" />
                            <span>{error.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.p
                    className="mt-6 text-center text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Don&apos;t have an account?{' '}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </motion.p>
            </motion.div>
        </div>
    )
}
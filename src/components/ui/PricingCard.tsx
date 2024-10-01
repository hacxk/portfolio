import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export interface PricingTier {
    name: string
    monthlyPrice: number
    yearlyPrice: number
    features: string[]
    cta: string
    popular?: boolean
    icon: React.ElementType
}

interface PricingCardProps extends PricingTier {
    isYearly: boolean
    onSelect: (tier: string) => void
}

const PricingCard: React.FC<PricingCardProps> = ({ name, monthlyPrice, yearlyPrice, features, cta, popular, icon: Icon, isYearly, onSelect }) => {
    const price = isYearly ? yearlyPrice : monthlyPrice

    return (
        <motion.div
            className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col relative overflow-hidden ${popular ? 'border-2 border-[#3498DB]' : ''
                }`}
            whileHover={{ y: -10, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)' }}
            transition={{ duration: 0.3 }}
        >
            {popular && (
                <div className="absolute top-0 right-0">
                    <div className="bg-[#3498DB] text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                        Most Popular
                    </div>
                </div>
            )}
            <div className="flex items-center mb-4">
                <Icon className="w-8 h-8 mr-3 text-[#3498DB]" />
                <h3 className="text-2xl font-bold text-[#2C3E50]">{name}</h3>
            </div>
            <div className="text-5xl font-bold text-[#3498DB] mb-6">
                ${price}
                <span className="text-base font-normal text-[#7F8C8D]">/{isYearly ? 'year' : 'month'}</span>
            </div>
            <ul className="mb-8 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-3 text-[#34495E]">
                        <Check className="w-5 h-5 mr-2 text-[#2ECC71] flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => onSelect(name)}
                className={`py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 ${popular
                    ? 'bg-[#3498DB] text-white hover:bg-[#2980B9] hover:shadow-lg'
                    : 'bg-[#ECF0F1] text-[#2C3E50] hover:bg-[#BDC3C7] hover:shadow-md'
                    }`}
            >
                {cta}
            </button>
        </motion.div>
    )
}

export default PricingCard;
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = memo(({ icon: Icon, title, description }) => (
    <motion.div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
        whileHover="hover"
        initial="rest"
        variants={{
            rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
            hover: {
                y: -5,
                boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.2, ease: 'easeInOut' }
            }
        }}
    >
        <motion.div
            className="bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full p-4 mb-5"
            variants={{
                rest: { rotate: 0 },
                hover: { rotate: 12, transition: { duration: 0.2 } }
            }}
        >
            <Icon className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-[#2C3E50]">{title}</h3>
        <p className="text-[#7F8C8D] leading-relaxed">{description}</p>
    </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;

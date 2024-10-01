import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface FloatingIconProps {
    icon: LucideIcon;
    x: number;
    y: number;
    delay: number;
    description: string;
}

const FloatingIcon = ({ icon: Icon, x, y, delay, description }: FloatingIconProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative p-3 rounded-full transition-colors duration-300 cursor-pointer"
                animate={{
                    backgroundColor: isHovered ? "#3498DB" : "transparent",
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            >
                <Icon size={24} className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#3498DB]'}`} />

                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white text-[#3498DB] text-xs rounded shadow-lg whitespace-nowrap"
                    >
                        {description}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}

export default FloatingIcon;

import { motion } from 'framer-motion'

const ToggleSwitch: React.FC<{ isYearly: boolean; onToggle: () => void }> = ({ isYearly, onToggle }) => (
    <div className="flex items-center justify-center mb-12">
        <span className={`mr-3 ${isYearly ? 'text-[#7F8C8D]' : 'text-[#2C3E50] font-semibold'}`}>Monthly</span>
        <div
            className="w-14 h-7 flex items-center bg-[#3498DB] rounded-full p-1 cursor-pointer"
            onClick={onToggle}
        >
            <motion.div
                className="bg-white w-5 h-5 rounded-full shadow-md"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{ x: isYearly ? 28 : 0 }}
            />
        </div>
        <span className={`ml-3 ${isYearly ? 'text-[#2C3E50] font-semibold' : 'text-[#7F8C8D]'}`}>Yearly</span>
        <span className="ml-2 bg-[#E74C3C] text-white text-xs font-bold py-1 px-2 rounded-full">Save 20%</span>
    </div>
)

export default ToggleSwitch;
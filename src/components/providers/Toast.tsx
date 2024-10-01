import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, BellRing } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose: () => void;
}

const toastVariants = {
    initial: { opacity: 0, x: '100%', y: 0, scale: 0.8 },
    animate: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 380,
            damping: 20
        }
    },
    exit: {
        opacity: 0,
        x: '100%',
        scale: 0.8,
        transition: { duration: 0.3 }
    }
};

const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000, onClose }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(oldProgress + 100 / (duration / 100), 100);
            });
        }, 100);

        const closeTimer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearInterval(timer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-6 h-6 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-6 h-6 text-red-500" />;
            case 'info':
                return <Info className="w-6 h-6 text-blue-500" />;
            case 'warning':
                return <BellRing className="w-6 h-6 text-yellow-500" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
            case 'error':
                return 'bg-gradient-to-r from-red-400 to-red-600 text-white';
            case 'info':
                return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
            case 'warning':
                return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
        }
    };

    return (
        <motion.div
            className={`fixed right-0 max-w-sm w-full sm:w-96 rounded-l-xl shadow-2xl overflow-hidden ${getStyles()}`}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ top: 'calc(5% + var(--toast-offset, 0px))' }}
        >
            <div className="p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {getIcon()}
                    </div>
                    <div className="ml-3 w-0 flex-1">
                        <p className="text-sm font-medium">{message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            className="rounded-full p-1 hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white bg-opacity-20 h-1">
                <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>
        </motion.div>
    );
};

interface ToastContextType {
    showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: ToastType; duration?: number }>>([]);

    const showToast = (message: string, type: ToastType, duration?: number) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    };

    const closeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <AnimatePresence>
                {toasts.map((toast, index) => (
                    <motion.div
                        key={toast.id}
                        style={{
                            '--toast-offset': `${index * 110}px`,
                            position: 'absolute',
                            right: 0,
                            left: 'auto',
                            zIndex: 9999 - index
                        } as React.CSSProperties}
                    >
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={() => closeToast(toast.id)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default Toast;
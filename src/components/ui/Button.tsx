import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, HTMLMotionProps, MotionValue } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    loading?: boolean;
    ripple?: boolean;
    motionValue?: MotionValue<number>;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    icon,
    loading = false,
    disabled,
    className,
    ripple = false,
    motionValue,
    ...props
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const controls = useAnimation();
    const scale = useMotionValue(1);
    const opacity = useTransform(scale, [0.95, 1], [0.7, 1]);

    const renderableValue = useTransform(motionValue || scale, (value) => value.toString());

    const baseStyles = 'font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ease-in-out';
    const sizeStyles: Record<ButtonSize, string> = {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };
    const variantStyles: Record<ButtonVariant, string> = {
        primary: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-300',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
        outline: 'bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-50 focus:ring-blue-300',
        ghost: 'bg-transparent text-blue-400 hover:bg-blue-50 focus:ring-blue-300',
    };

    const buttonStyles = twMerge(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        disabled && 'opacity-50 cursor-not-allowed',
        className
    );

    const handleMouseDown = () => {
        controls.start({ scale: 0.95 });
    };

    const handleMouseUp = () => {
        controls.start({ scale: 1 });
    };

    const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!ripple || disabled) return;

        const button = buttonRef.current;
        if (!button) return;

        const existingRipple = button.getElementsByClassName('ripple')[0];
        if (existingRipple) {
            existingRipple.remove();
        }

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        button.appendChild(circle);
    };

    useEffect(() => {
        return () => {
            controls.stop();
        };
    }, [controls]);

    return (
        <motion.button
            ref={buttonRef}
            className={`${buttonStyles} relative overflow-hidden`}
            disabled={disabled || loading}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleRipple}
            animate={controls}
            style={{ scale, opacity }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            {...props}
        >
            <span className="flex items-center justify-center">
                {icon && <span className="mr-2">{icon}</span>}
                {loading ? (
                    <motion.span
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                ) : (
                    <>
                        {motionValue && <motion.span>{renderableValue}</motion.span>}
                        {children}
                    </>
                )}
            </span>
            <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.7);
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
        </motion.button>
    );
};

export default Button;
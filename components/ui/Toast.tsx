'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
    duration?: number;
}

export const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to finish
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (typeof document === 'undefined') return null;

    const bgColor =
        type === 'success'
            ? 'bg-[var(--color-green)]'
            : type === 'error'
                ? 'bg-[var(--color-burgundy)]'
                : 'bg-slate-800';

    return createPortal(
        <div
            className={`fixed bottom-4 right-4 z-50 flex items-center rounded-lg px-4 py-3 text-white shadow-lg transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                } ${bgColor}`}
        >
            <span className="text-sm font-medium">{message}</span>
        </div>,
        document.body
    );
};

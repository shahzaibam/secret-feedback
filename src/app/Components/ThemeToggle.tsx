'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleToggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="flex items-center space-x-4">
            <MoonIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />

            <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    id="theme-toggle"
                    className="sr-only"
                    checked={theme === 'dark'}
                    onChange={handleToggle}
                />
                <div className="w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div
                        className={`absolute w-4 h-4 rounded-full transition-transform duration-300 ease-in-out top-1 ${theme === 'dark' ? 'translate-x-6 bg-blue-400' : 'translate-x-1 bg-yellow-400'
                            }`}
                    />
                </div>
            </label>

            <SunIcon className="h-6 w-6 text-yellow-500 dark:text-gray-300" />
        </div>
    );
}
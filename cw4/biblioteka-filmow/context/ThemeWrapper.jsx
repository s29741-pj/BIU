'use client';

import { useTheme } from "@/context/ThemeContext";

export default function ThemeWrapper({ children }) {
    const { theme } = useTheme();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
            color: theme === 'light' ? '#000000' : '#ffffff',
            transition: 'background-color 0.3s, color 0.3s',
        }}>
            {children}
        </div>
    );
}
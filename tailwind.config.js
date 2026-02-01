/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                colors: {
                    background: '#0f172a', // Slate-900 (Deep Dark Background)
                    surface: '#1e293b',    // Slate-800 (Card Background)
                    primary: {
                        DEFAULT: '#3b82f6', // Blue-500 (Vibrant Accent)
                        light: '#60a5fa',
                        dark: '#2563eb',
                    },
                    secondary: {
                        DEFAULT: '#10b981', // Emerald-500
                        light: '#34d399',
                    },
                    accent: {
                        DEFAULT: '#8b5cf6', // Violet-500
                        light: '#a78bfa',
                    },
                    text: {
                        main: '#f8fafc',    // Slate-50
                        muted: '#94a3b8',   // Slate-400
                    }
                }
            }
        },
    },
    plugins: [],
}

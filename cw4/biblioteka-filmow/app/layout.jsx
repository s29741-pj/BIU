import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import { FilmProvider } from "@/context/FilmContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeWrapper from "@/context/ThemeWrapper";
import Notifications from "@/components/Notifications";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Biblioteka Filmów",
    description: "Aplikacja do zarządzania filmami",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body>
                <ThemeProvider>
                    <FilmProvider>
                        <ThemeWrapper>
                            <Nav />
                            <Notifications />
                            {children}
                        </ThemeWrapper>
                    </FilmProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
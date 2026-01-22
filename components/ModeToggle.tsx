"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    // Determine current mode, fallback to "light"
    const currentTheme = theme === "system" ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme

    // Toggle function
    const toggleTheme = () => {
        setTheme(currentTheme === "dark" ? "light" : "dark")
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden"
        >
            <Sun className={`h-5 w-5 transition-all ${currentTheme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
            <Moon className={`absolute h-5 w-5 transition-all ${currentTheme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

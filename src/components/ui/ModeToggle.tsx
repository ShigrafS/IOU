import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "../../lib/utils"

export function ModeToggle({ className }: { className?: string }) {
    const [theme, setTheme] = useState<"dark" | "light">("dark")

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)
    }, [theme])

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn("p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors", className)}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}

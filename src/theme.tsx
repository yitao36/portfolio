import { createContext, ReactNode, useEffect, useState } from "react"
import { ScriptOnce } from "@tanstack/react-router"
import { createClientOnlyFn, createIsomorphicFn, IsomorphicFn } from "@tanstack/react-start"

// User theme is the user's preferred theme, or the browser's default if they haven't set one.
// System theme is the chosen theme.
type ThemeContextProps = {
  userTheme: "light" | "dark" | "system"
  systemTheme: "light" | "dark"
  setTheme: (theme: "light" | "dark" | "system") => void
}
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

// If user selects the system theme, this listener will listen for changes to the system theme and update the user theme accordingly.
const setupPreferredListener = createClientOnlyFn((userTheme: "system") => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  const handler = () => {
    document.documentElement.classList.remove("light", "dark", "system")
    document.documentElement.classList.add(getSystemTheme())
    applyThemeVars(getSystemTheme())
    document.documentElement.classList.add(userTheme)
  }
  mediaQuery.addEventListener("change", handler)
  return () => mediaQuery.removeEventListener("change", handler)
})

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [userTheme, setUserTheme] = useState<"dark" | "light" | "system">(getStoredTheme())

  useEffect(() => {
    if (userTheme === "system") return setupPreferredListener(userTheme)
  }, [])

  useEffect(() => {
    applyThemeVars(userTheme)
    setStoredTheme(userTheme)
    if (userTheme === "system") return setupPreferredListener(userTheme)
  }, [userTheme])

  const systemTheme = userTheme === "system" ? getSystemTheme() : userTheme

  return (
    <ThemeContext value={{ userTheme: userTheme, systemTheme: systemTheme, setTheme: setUserTheme }}>
      <ScriptOnce children={themeScript} />
      {children}
    </ThemeContext>
  )
}

// The theme that the user has chosen, or the system's theme (light or dark mode).
type UserTheme = "light" | "dark" | "system"
const storageKey = "ui-theme"
const themes = ["light", "dark", "system"]

// Gets the user's theme from local storage or defaults to system theme.
const getStoredTheme: IsomorphicFn<[], "light" | "dark" | "system", "light" | "dark" | "system"> = createIsomorphicFn()
  .client(() => (window.localStorage.getItem(storageKey) as UserTheme) || "system")
  .server(() => "system")

// Gets the system theme from the browser.
const getSystemTheme: IsomorphicFn<[], "light" | "dark", "light" | "dark"> = createIsomorphicFn()
  .client(() => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))
  .server(() => "dark")

// Sets the user's theme in local storage.
const setStoredTheme: IsomorphicFn<[theme: UserTheme], void, void> = createIsomorphicFn()
  .client((theme: UserTheme) => window.localStorage.setItem(storageKey, theme))
  .server((theme: UserTheme) => {})

// Defines theme variables for all themes
type ThemeVariables = {
  name: string
  colorScheme: string
  cssVariables: {
    // Base colors
    "--color-background": string
    "--color-text": string
    "--color-primary": string
    "--color-secondary": string
    "--color-accent": string
    "--color-error": string

    // Surface/background variants
    "--color-background-page": string
    "--color-background-secondary": string
    "--color-background-tertiary": string
    "--color-background-hover": string
    "--color-background-active": string

    // Border colors
    "--color-border-default": string
    "--color-border-light": string
    "--color-border-dark": string
    "--color-border-focus": string

    // Shadow effects
    "--shadow-xs": string
    "--shadow-sm": string
    "--shadow-md": string
    "--shadow-lg": string
    "--shadow-xl": string

    // Spacing (gap)
    "--space-1": string
    "--space-2": string
    "--space-3": string
    "--space-4": string
    "--space-5": string
    "--space-6": string
    "--space-7": string
    "--space-8": string
  }
}

const darkTheme: ThemeVariables = {
  name: "dark",
  colorScheme: "dark",
  cssVariables: {
    // Base colors
    "--color-background": "#121212",
    "--color-text": "#ffffff",
    "--color-primary": "#007bff",
    "--color-secondary": "#6c757d",
    "--color-accent": "#dc3545",
    "--color-error": "#dc3545",

    // Surface/background variants
    "--color-background-page": "#1a1a1a",
    "--color-background-secondary": "#2d2d2d",
    "--color-background-tertiary": "#3d3d3d",
    "--color-background-hover": "#2d2d2d",
    "--color-background-active": "#3d3d3d",

    // Border colors
    "--color-border-default": "#424242",
    "--color-border-light": "#525252",
    "--color-border-dark": "#323232",
    "--color-border-focus": "#007bff",

    // Shadow effects (inverted for dark mode)
    "--shadow-xs": "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
    "--shadow-sm": "0 20px 25px -5px rgba(0, 0, 0, 0.25)",
    "--shadow-md": "0 20px 25px -5px rgba(0, 0, 0, 0.35)",
    "--shadow-lg": "0 20px 25px -5px rgba(0, 0, 0, 0.45)",
    "--shadow-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.55)",

    // Spacing
    "--space-1": "1rem",
    "--space-2": "1.25rem",
    "--space-3": "1.5rem",
    "--space-4": "2rem",
    "--space-5": "3rem",
    "--space-6": "5rem",
    "--space-7": "8rem",
    "--space-8": "12rem",
  },
}

const lightTheme: ThemeVariables = {
  name: "light",
  colorScheme: "light",
  cssVariables: {
    // Base colors
    "--color-background": "#ffffff",
    "--color-text": "#000000",
    "--color-primary": "#007bff",
    "--color-secondary": "#6c757d",
    "--color-accent": "#dc3545",
    "--color-error": "#dc3545",

    // Surface/background variants
    "--color-background-page": "#ffffff",
    "--color-background-secondary": "#f8f9fa",
    "--color-background-tertiary": "#e9ecef",
    "--color-background-hover": "#f1f3f4",
    "--color-background-active": "#e7e9ec",

    // Border colors
    "--color-border-default": "#dee2e6",
    "--color-border-light": "#edf0f5",
    "--color-border-dark": "#cdd3da",
    "--color-border-focus": "#007bff",

    // Shadow effects (standard for light mode)
    "--shadow-xs": "0 20px 25px -5px rgba(0, 0, 0, 0.06)",
    "--shadow-sm": "0 20px 25px -5px rgba(0, 0, 0, 0.12)",
    "--shadow-md": "0 20px 25px -5px rgba(0, 0, 0, 0.18)",
    "--shadow-lg": "0 20px 25px -5px rgba(0, 0, 0, 0.25)",
    "--shadow-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.32)",

    // Spacing (padding, margin, gap etc)
    "--space-1": "1rem",
    "--space-2": "1.25rem",
    "--space-3": "1.5rem",
    "--space-4": "2rem",
    "--space-5": "3rem",
    "--space-6": "5rem",
    "--space-7": "8rem",
    "--space-8": "12rem",
  },
}

const applyThemeVars: IsomorphicFn<[theme: UserTheme], void, void> = createIsomorphicFn()
  .client((theme: UserTheme) => {
    if (theme === "system") theme = getSystemTheme()
    switch (theme) {
      case "dark":
        Object.entries(darkTheme.cssVariables).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
        break
      case "light":
        Object.entries(lightTheme.cssVariables).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
        break
    }
  })
  .server((theme: UserTheme) => undefined)

// This script runs on the client's browser before the server-side rendering occurs.
// Thus it has to contain all the necessary CSS variables and JavaScript code inline to apply the theme.
const themeScript = `(${function () {
  try {
    const theme = localStorage.getItem("theme") || "auto"
    const resolved = theme === "auto" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme
    document.documentElement.classList.add(resolved)

    const darkTheme: ThemeVariables = {
      name: "dark",
      colorScheme: "dark",
      cssVariables: {
        // Base colors
        "--color-background": "#121212",
        "--color-text": "#ffffff",
        "--color-primary": "#007bff",
        "--color-secondary": "#6c757d",
        "--color-accent": "#dc3545",
        "--color-error": "#dc3545",

        // Surface/background variants
        "--color-background-page": "#1a1a1a",
        "--color-background-secondary": "#2d2d2d",
        "--color-background-tertiary": "#3d3d3d",
        "--color-background-hover": "#2d2d2d",
        "--color-background-active": "#3d3d3d",

        // Border colors
        "--color-border-default": "#424242",
        "--color-border-light": "#525252",
        "--color-border-dark": "#323232",
        "--color-border-focus": "#007bff",

        // Shadow effects (inverted for dark mode)
        "--shadow-xs": "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
        "--shadow-sm": "0 20px 25px -5px rgba(0, 0, 0, 0.25)",
        "--shadow-md": "0 20px 25px -5px rgba(0, 0, 0, 0.35)",
        "--shadow-lg": "0 20px 25px -5px rgba(0, 0, 0, 0.45)",
        "--shadow-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.55)",

        // Spacing
        "--space-1": "1rem",
        "--space-2": "1.25rem",
        "--space-3": "1.5rem",
        "--space-4": "2rem",
        "--space-5": "3rem",
        "--space-6": "5rem",
        "--space-7": "8rem",
        "--space-8": "12rem",
      },
    }

    const lightTheme: ThemeVariables = {
      name: "light",
      colorScheme: "light",
      cssVariables: {
        // Base colors
        "--color-background": "#ffffff",
        "--color-text": "#000000",
        "--color-primary": "#007bff",
        "--color-secondary": "#6c757d",
        "--color-accent": "#dc3545",
        "--color-error": "#dc3545",

        // Surface/background variants
        "--color-background-page": "#ffffff",
        "--color-background-secondary": "#f8f9fa",
        "--color-background-tertiary": "#e9ecef",
        "--color-background-hover": "#f1f3f4",
        "--color-background-active": "#e7e9ec",

        // Border colors
        "--color-border-default": "#dee2e6",
        "--color-border-light": "#edf0f5",
        "--color-border-dark": "#cdd3da",
        "--color-border-focus": "#007bff",

        // Shadow effects (standard for light mode)
        "--shadow-xs": "0 20px 25px -5px rgba(0, 0, 0, 0.06)",
        "--shadow-sm": "0 20px 25px -5px rgba(0, 0, 0, 0.12)",
        "--shadow-md": "0 20px 25px -5px rgba(0, 0, 0, 0.18)",
        "--shadow-lg": "0 20px 25px -5px rgba(0, 0, 0, 0.25)",
        "--shadow-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.32)",

        // Spacing
        "--space-1": "1rem",
        "--space-2": "1.25rem",
        "--space-3": "1.5rem",
        "--space-4": "2rem",
        "--space-5": "3rem",
        "--space-6": "5rem",
        "--space-7": "8rem",
        "--space-8": "12rem",
      },
    }

    switch (resolved) {
      case "dark":
        Object.entries(darkTheme.cssVariables).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
        break
      case "light":
        Object.entries(lightTheme.cssVariables).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
        break
    }
  } catch (e) {}
}.toString()})()`

import { createContext, ReactNode, useEffect, useState } from "react"
import { ScriptOnce } from "@tanstack/react-router"
import { createClientOnlyFn, createIsomorphicFn, IsomorphicFn } from "@tanstack/react-start"

// This file is used to manage the user's theme preference, which can be set by the user or by the browser's (e.g. on first visit).
// To prevent FOUC (Flash of Unstyled Content)


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

const applyThemeVars: IsomorphicFn<[theme: UserTheme], void, void> = createIsomorphicFn()
  .client((theme: UserTheme) => {
    
  })
  .server((theme: UserTheme) => undefined)

// This script runs on the client's browser before the server-side rendering occurs.
// It sets the theme class which is accessed by styles.css.
const themeScript = `(${function () {
  try {
    const key: typeof storageKey = "ui-theme"
    const theme = localStorage.getItem(key) || "system"
    if (theme === "system") document.documentElement.classList.add("system")
    const resolved = theme === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme
    document.documentElement.classList.add(resolved)
  } catch (e) {}
}.toString()})()`

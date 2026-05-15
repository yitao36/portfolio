// src/routes/__root.tsx
/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router"
import { use, type ReactNode } from "react"
import "../styles.css"
import { ThemeContext, ThemeProvider } from "../theme"
import { cn } from "@sglara/cn"
import { Moon, Sun } from "lucide-react"
import { IconStyle, TransitionStyle } from "../styles"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" },
    ],
    links: [{ href: "src/styles.css", rel: "stylesheet" }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <NavHeader />
          <div className="mb-auto"> {/** Footer shows at bottom if content height is less than screen height. */}
            <Outlet />
          </div>
          <NavFooter />
        </div>
      </ThemeProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className="group/root min-w-sm" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script src="https://kit.fontawesome.com/b3895d887d.js" crossOrigin="anonymous"></script>
      </head>
      <body className={cn("bg-(--color-background)",TransitionStyle)}>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

const navHeaderLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/blog", label: "Blog" },
]

function NavHeader() {
  const theme = use(ThemeContext)!
  if (theme === undefined) console.error("ThemeContext must be used within ThemeProvider.")
  return (
    <nav
      className={cn(`sticky top-0 flex items-center justify-between w-full text-(--color-text) bg-(--color-background-page)
      py-3 px-[20%] outline outline-(--color-border)`, TransitionStyle)}
    >
      <h1 className="text-3xl font-bold">Yitao</h1>
      <div className="flex flex-row gap-16">
        {navHeaderLinks.map(({ to, label }) => (
          <Link key={to} to={to} className="hover:underline self-center text-(--color-text)">
            {label}
          </Link>
        ))}

        {/** Toggle system theme button icon. Requires that html component has classname 'group/root' */}
        <Moon className={cn(IconStyle, "group-[.light]/root:hidden")} onClick={() => theme.setTheme("light")} />
        <Sun className={cn(IconStyle, "group-[.dark]/root:hidden")} onClick={() => theme.setTheme("dark")} />
      </div>
    </nav>
  )
}

function NavFooter() {
  return (
    <div
      className={cn(`flex min-w-sm items-center justify-between w-full text-(--color-text) bg-(--color-background-page)
    px-[20%] py-4`, TransitionStyle)}
    >
      <div className="flex flex-row justify-center w-full gap-16 text-center">
        <a className={IconStyle} href="https://github.com/yitao36">
          <i className={"fa-brands fa-github fa-lg"}></i>
        </a>
        <a className={IconStyle} href="https://www.linkedin.com/in/ding-yitao-a1ab83348/">
          <i className={"fa-brands fa-linkedin fa-lg"}></i>
        </a>
        <a className={IconStyle} href="https://t.me/yitao36">
          <i className={"fa-brands fa-telegram fa-lg"}></i>
        </a>
      </div>
    </div>
  )
}

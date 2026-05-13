import { createFileRoute, Link } from "@tanstack/react-router"
import { Box } from "../components/Box"
import { Moon, Sun } from "lucide-react"
import { IconStyle } from "../styles"
import { use } from "react"
import { ThemeContext } from "../theme"
import { cn } from "@sglara/cn"

export const Route = createFileRoute("/")({ component: RouteComponent })

/** The main portfolio page. */
function RouteComponent() {
  return (
    <>
      <NavHeader />
      <Box>
        <TitleCard />
      </Box>
    </>
  )
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
]

function NavHeader() {
  const theme = use(ThemeContext)!
  return (
    <nav
      className="flex items-center justify-between w-full p-8 text-(--color-text) bg-(--color-background-page)
    px-60" suppressHydrationWarning
    >
      <h1 className="text-3xl font-bold">Yitao</h1>
      {navLinks.map(({ to, label }) => (
        <Link key={to} to={to} className="hover:underline text-(--color-text)">
          {label}
        </Link>
      ))}

      {/** Toggle system theme button icon. Requires that html component has classname 'group' */}
      <Moon className={cn(IconStyle,"group-[.light]:hidden")} onClick={() => theme.setTheme("light")} />
      <Sun className={cn(IconStyle,"group-[.dark]:hidden")} onClick={() => theme.setTheme("dark")} />
    </nav>
  )
}

function TitleCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit p-8 text-(--color-text) bg-(--color-background)">
      <h1 className="text-3xl font-bold">Yitao</h1>
      <p className="text-lg">Full Stack Developer | Software Engineer</p>
    </div>
  )
}

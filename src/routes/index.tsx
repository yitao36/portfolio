import { createFileRoute, Link } from "@tanstack/react-router"
import { Box } from "../components/Box"

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
  return (
    <nav className="flex items-center justify-between w-full p-(--space-4) text-(--color-text) bg-(--color-background)
    pl-(--space-8)">
      <h1 className="text-3xl font-bold">Yitao</h1>
      {navLinks.map(({ to, label }) => (
        <Link key={to} to={to} className="hover:underline text-(--color-text)">
          {label}
        </Link>
      ))}
    </nav>
  )
}

function TitleCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit p-(--space-4) text-(--color-text) bg-(--color-background)">
      <h1 className="text-3xl font-bold">Yitao</h1>
      <p className="text-lg">Full Stack Developer | Software Engineer</p>
    </div>
  )
}


import { createFileRoute, Outlet, useLocation, useRouter } from "@tanstack/react-router"
import { ClickableStyle, textStyles } from "../../styles"
import { cn } from "@sglara/cn"

export const Route = createFileRoute("/blog")({ component: RouteComponent })

/** Route that provides layout for blog posts */
function RouteComponent() {
  const pathname = useLocation({ select: (l) => l.pathname })
  const breadcrumbs = pathname.split("/").slice(2)
  const router = useRouter()
  return (
    <>
      <div className="h-6" /> {/** gap */}
      <div className="grid grid-cols-[auto_24rem_auto] md:grid-cols-[auto_42rem_auto] min-w-sm">
        <div className="col-start-2">
          <div className="flex flex-row gap-1">
          <p className={cn(textStyles.breadcrumbs,ClickableStyle)} onClick={() => router.navigate({to: '/blog'})}>{'>'} Home</p>
          {breadcrumbs.map((bc,i) => <p key={i} className={textStyles.breadcrumbs}>
            {" > " + bc.slice(0,1).toUpperCase() + bc.slice(1).toLowerCase()}
          </p>)}
          </div>
          <div className="h-4" /> {/** gap */}
          <Outlet />
        </div>
      </div>
    </>
  )
}

import { createFileRoute, useLocation } from "@tanstack/react-router"
import { posts } from "./-posts/posts"
import { textStyles } from "../../styles"
import { cn } from "@sglara/cn"
import { marked, renderer } from "../../markdown"
import { useRef } from "react"

export const Route = createFileRoute("/blog/$postId")({ component: RouteComponent })

function RouteComponent() {
  const postId = parseInt(Route.useParams().postId)

  if (Number.isNaN(postId)) return <></>

  
  const ref = useRef<HTMLDivElement>(null)

  const post = posts[postId]
  return (
    <div>
      <h1 className={textStyles.heading1}>{post.title}</h1>
      <div className="h-4" /> {/* gap */}
      <div ref={ref}
        className={cn(textStyles.paragraph, "flex flex-col gap-4")}
        dangerouslySetInnerHTML={{ __html: marked.parse(post.description, { renderer }) }}
      ></div>
    </div>
  )
}

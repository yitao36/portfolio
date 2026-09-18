import { createFileRoute, useRouter } from "@tanstack/react-router"
import { Box } from "../../components/Box"
import { ClickableStyle, textStyles } from "../../styles"
import { cn } from "@sglara/cn"
import { useState, useTransition } from "react"
import { Post, posts } from "./-posts/posts"

export const Route = createFileRoute("/blog/")({ component: RouteComponent })

/** Renders a search bar and displays filtered posts */
function RouteComponent() {
  const [search, setSearch] = useState("")

  const filteredPosts = posts.filter((d) => d.title.toLowerCase().includes(search.toLowerCase())).reverse()

  return (
    <div className="flex flex-1 flex-col w-full">
      <input className={textStyles.input} onChange={(e) => setSearch(e.target.value)} placeholder="Search"></input>
      {filteredPosts.map((p) => (
        <PostCard key={p.id} post={p} id={p.id} />
      ))}
    </div>
  )
}

function PostCard({ id, post }: { id: number; post: Post }) {
  const navigate = useRouter()
  return (
    <Box onClick={() => navigate.navigate({ to: `/blog/${id}` })}>
      <div className={cn(ClickableStyle, "flex flex-col w-full p-4 gap-2")}>
        <p className={textStyles.heading2}>{post.title}</p>
        <p className={cn(textStyles.paragraph, "w-full line-clamp-2 text-ellipsis")}>{post.description}</p>
        <div className="flex flex-row gap-4">
          <p className={textStyles.paragraph}>{post.date.toDateString().split(" ").slice(1).join(" ")}</p>
          <p className={textStyles.additionalInfo + " self-end"}>{post.tags.join(', ')}</p>
        </div>
      </div>
    </Box>
  )
}

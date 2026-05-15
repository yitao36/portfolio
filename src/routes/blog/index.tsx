import { createFileRoute } from "@tanstack/react-router"
import { Box } from "../../components/Box"
import { ClickableStyle, textStyles } from "../../styles"
import { cn } from "@sglara/cn"
import { useState, useTransition } from "react"

export const Route = createFileRoute("/blog/")({ component: RouteComponent })

function RouteComponent() {
  return (
    <>
      <div className="h-8" /> {/** gap */}
      <div className="grid grid-cols-[33%_67%] md:grid-cols-[33%_34%_33%] min-w-sm">
        <div>a</div>
        <PostList />
        <div>a</div>
      </div>
    </>
  )
}

type Post = {
  title: string
  description: string
  date: Date
  tags: string[]
}

function PostList() {
  const [search, setSearch] = useState("")

  const filteredPosts = [""].filter(d => d.toLowerCase().includes(search.toLowerCase()))


  return (
    <div className="flex flex-1 flex-col w-full">
      <input className={textStyles.input} onChange={e => (setSearch(e.target.value))} placeholder="Search"></input>
      <PostCard />
    </div>
  )
}

function PostCard() {
  return (
    <Box>
      <div className={cn(ClickableStyle, "flex flex-col w-full p-4 gap-2")}>
        <p className={textStyles.heading2}>My first blog</p>
        <p className={cn(textStyles.paragraph, "w-full line-clamp-2 text-ellipsis")}>
          CoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCo
          CoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoololCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCoolCool!
        </p>
        <div className="flex flex-row gap-4">
          <p className={textStyles.paragraph}>{new Date().toDateString().split(" ").slice(1).join(" ")}</p>
          <p className={textStyles.paragraph}>tag</p>
        </div>
      </div>
    </Box>
  )
}

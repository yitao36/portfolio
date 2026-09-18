
export type Post = {
  id: number
  title: string
  description: string
  date: Date
  tags: string[]
}

export const posts = [
  {
    id: 0,
    title: "",
    description: "",
    date: new Date("2022-01-01"),
    tags: ["cool", "cool"]
  },
] satisfies Post[]
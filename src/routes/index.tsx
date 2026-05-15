import { createFileRoute, useRouter } from "@tanstack/react-router"
import { Box } from "../components/Box"
import { textStyles } from "../styles"
import profileImg from "../assets/Yitao's Dive - frame at 0m30s.jpg"
import { cn } from "@sglara/cn"

export const Route = createFileRoute("/")({ component: RouteComponent })

/** The main portfolio page. */
function RouteComponent() {
  const router = useRouter()
  return (
    <div className="grid grid-cols-[auto_24rem_auto] md:grid-cols-[auto_42rem_auto] place-items-center">
      <Box className="w-full col-start-2">
        <TitleCard />
      </Box>

      <Box className="w-full col-start-2">
        <Experience />
      </Box>

      <div className="flex justify-center col-start-2">
        <button className={textStyles.button} onClick={() => router.navigate({ to: "/about" })}>
          About
        </button>
      </div>
    </div>
  )
}

function TitleCard() {
  return (
    <>
      <p className={cn(textStyles.heading1, "w-full py-4 px-[5%] self-stretch")}>About</p>
      <div
        className="flex flex-col justify-center items-center w-full h-fit px-[3%] py-4 gap-6
      md:flex-row"
      >
        <img
          width={200}
          height={200}
          className="rounded-[50%] border-2 border-(--color-background-secondary)"
          src={profileImg}
        />
        <div className="outline outline-(--color-border) self-stretch my-[2.5%]"></div> {/** separator  */}
        <div className="flex flex-col self-center w-fit h-full">
          <h1 className={textStyles.heading2}>Ding Yitao</h1>
          <p className={textStyles.additionalInfo}>Computer Science Y2 student at National University of Singapore</p>
          <div className="h-2" /> {/** gap */}
          <p className={textStyles.paragraph}>Hey! I love to explore and design cool ideas.</p>
          <p className={textStyles.paragraph}>In my free time, I love to run, and I do freediving as a sport.</p>
          <p className={textStyles.paragraph}>Occassionally, I also like to get into some complex board games.</p>
          <p className={textStyles.paragraph}>I am able to pickup new skills quickly!</p>
        </div>
      </div>
      <div className="h-8" />
    </>
  )
}

const experiences = [
  {
    title: "Inventory Management Website (React)",
    description: `Built an inventory management website as part of an intensive 3-months school pair-work project. The inventory has a folder structure like Google Drive, with CRUD capabilities. I learnt to use key industry technologies like React, Git, and Tailwind CSS.
\n-	Learnt to design Role-based Access Control permission systems.
\n-	Used Jest for unit testing and integration testing
\n-	Learnt relevant skills such as documentation, project management, and important soft skills for group collaboration and time management.
`,
  },
  {
    title: "Freediving CCA Website (React)",
    description: `As the Captain, I built a personal project to help automate and streamline CCA processes, including creating sessions, incident management, attendance tracking, and exporting to Excel. I learnt to abstract and modularize my code for maintainability and develop concise long-term solutions.
\n-	Familiarized myself with Next.JS framework, RESTful APIs, Redux, TanStack Query.
\n-	Used libraries such as Zod for type validation
\n-	Integrate with Supabase and Prisma ORM for cloud storage.
`
  }
]

function Experience() {
  return (
    <>
      <p className={cn(textStyles.heading1, "w-full pt-4 px-[5%] self-stretch")}>Experience</p>
      <p className={cn(textStyles.additionalInfo, "w-full px-[5%]")}>Here are some of my experiences:</p>
      <div className="flex flex-col items-center justify-center w-full h-fit px-[5%]">
        <div className="h-4" /> {/** gap */}
        <ul className={cn(textStyles.list,"flex flex-col gap-4")}>
          {experiences.map((exp) => (
            <div>
              <li className={textStyles.heading2}>{exp.title}</li>
              {exp.description.split('\n').map((line) => (
                <p key={line} className="py-0.5">{line}</p>
              ))}
            </div>
          ))}
        </ul>
      </div>
      <div className="h-8" />
    </>
  )
}

function ImageScroll() {
  return <img src={undefined} />
}

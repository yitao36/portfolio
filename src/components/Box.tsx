import { cn } from "@sglara/cn"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ClickableStyle, TransitionStyle } from "../styles"

/**
 * An outlined box
 */
export const Box = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex flex-col w-full justify-center items-center py-6", props.className)}>
      <div
        className={cn(TransitionStyle,ClickableStyle,`flex flex-col items-center justify-center w-full h-full bg-(--color-background-page)
        rounded-lg outline outline-(--color-border)`)}
      >
        {props.children}
      </div>
    </div>
  )
}

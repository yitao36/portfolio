export const IconStyle = `transition-all hover:bg-(--color-background-hover) p-1.5 rounded-full cursor-pointer flex justify-center items-center w-[32px] h-[32px]`
export const ClickableStyle  = `hover:transition-duration-150 hover:bg-(--color-background-hover) cursor-pointer rounded-lg shadow-(--shadow-md)`
export const TransitionStyle = `transition-all duration-300 ease-in-out`

export const textStyles = {
  "heading1": "text-2xl font-bold text-(--color-text)",
  "heading2": "text-xl font-medium text-(--color-text)",
  "subheading": "text-md font-medium text-(--color-text)",
  "additionalInfo": "text-sm italic text-(--color-secondary)",
  "paragraph": "text-md leading-6 text-(--color-text)",
  "list": "text-md leading-6 text-(--color-text) list-disc list-inside",
  "code": "text-xs font-mono text-(--color-text)",
  "link": "text-blue-500 underline hover:text-blue-700",
  "button": "text-white bg-(--color-primary) hover:bg-(--color-primary-focus) rounded-full px-4 py-2 cursor-pointer transition-all",
  "input": "text-(--color-secondary) border border-(--color-border-dark) h-8 rounded-md p-2",
  "select": "text-(--color-secondary) border border-(--color-border) rounded-md p-2",
}
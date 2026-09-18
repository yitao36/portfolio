export const IconStyle = `transition-all hover:bg-(--color-background-hover) p-1.5 rounded-full cursor-pointer flex justify-center items-center w-[32px] h-[32px]` as const
export const ClickableStyle  = `hover:duration-150 hover:bg-(--color-background-hover) cursor-pointer rounded-lg shadow-(--shadow-md)` as const
export const TransitionStyle = `transition-all duration-300 ease-in-out` as const

export const textStyles = {
  "heading1": "text-2xl font-bold text-(--color-text) " + TransitionStyle,
  "heading2": "text-xl font-medium text-(--color-text) " + TransitionStyle,
  "heading3": "text-lg font-medium text-(--color-text) " + TransitionStyle,
  "subheading": "text-md font-medium text-(--color-text) " + TransitionStyle,
  "additionalInfo": "text-sm italic text-(--color-secondary) " + TransitionStyle,
  "paragraph": "text-md leading-6 text-(--color-text) " + TransitionStyle,
  "list": "text-md leading-6 text-(--color-text) list-disc list-inside " + TransitionStyle,
  "breadcrumbs": "text-md text-(--color-text) " + TransitionStyle,
  "code": "text-xs font-mono text-(--color-text) bg-(--color-background-page) p-4 rounded-md overflow-x-scroll " + TransitionStyle,
  "link": "text-blue-500 underline hover:text-blue-700 " + TransitionStyle,
  "button": "text-(--color-text) bg-(--color-background-secondary) border border-(--color-border-dark) rounded-full px-4 py-2 " + ClickableStyle + " " + TransitionStyle,
  "input": "text-(--color-text) bg-(--color-background-page) border border-(--color-border-dark) h-8 rounded-md p-2 " + TransitionStyle,
  "select": "text-(--color-secondary) border border-(--color-border) rounded-md p-2 " + TransitionStyle,
} as const
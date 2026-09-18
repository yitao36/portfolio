import { cn } from '@sglara/cn'
import { Renderer, Marked } from '@ts-stack/markdown';
import { textStyles } from './styles'

/* 
  This is the renderer for markdown. The renderer function takes in a text and a level, 
  and returns the corresponding HTML element with the appropriate style classes.

  Note: md files are not typically supported as module imports, thus `globals.d.ts` contains a module declaration,
  and vite.config.ts contains a transformer to load the module as string.
*/

export const marked = Marked


export const renderer = new Renderer()
  renderer.heading = (text, level) => {
    switch(level) {
      case 1:
        return `<h${level+1} class="${cn(textStyles.heading2)}">${text}</h${level+1}>`
      case 2:
        return `<h${level+1} class="${cn(textStyles.heading3)}">${text}</h${level+1}>`
      case 3:
        return `<h${level+1} class="${cn(textStyles.subheading)}">${text}</h${level+1}>`
      default:
        return `<p id="${text.toLowerCase()}" class="${cn(textStyles.paragraph)}">${text}</p>`
    }
  }
  renderer.code = (code, lang) => {
    switch(lang) {
      case undefined:
        return `<pre class='${textStyles.code}'><code>${code}</code></pre>`
      default:
        return new Renderer().code(code, lang)
    }
  }
  renderer.codespan = (text) => {
    return `<code class='${cn(textStyles.code, 'p-1 rounded')}'>${text}</code>`
  }
  

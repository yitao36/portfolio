import { createStart, createMiddleware } from '@tanstack/react-start'

const myGlobalMiddleware = createMiddleware().server(({ next }) => {
  return next()
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [myGlobalMiddleware], // runs for every (client) request
    functionMiddleware: [], // runs for every server function
  }
})
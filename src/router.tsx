// src/router.tsx
import { createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { captureOwnerStack } from "react"

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultNotFoundComponent: () => {
      console.log("[router] defaultNotFoundComponent", router.state.location.pathname)
      console.log(captureOwnerStack())
      return <p>Not found!</p>
    },
  })

  return router
}

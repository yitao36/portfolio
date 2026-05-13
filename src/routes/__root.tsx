// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "../theme"
import "../styles.css"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [{ href: "src/styles.css", rel: "stylesheet" }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-(--color-background)">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// vite.config.ts
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json';
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
    devtoolsJson()
  ],
})
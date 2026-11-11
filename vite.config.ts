import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Stand-alone apps copied into /public that run outside the React site.
 * Each lives in its own folder with its own index.html.
 */
const STANDALONE_APPS = ['/caie_pseudocode/']

/**
 * GitHub Pages has no server-side routing. Serving a copy of index.html as
 * 404.html lets deep links such as /a-level or /personal/some-article load the
 * app, which then renders the correct route on the client.
 */
function githubPagesFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

/**
 * GitHub Pages serves /caie_pseudocode/ as /caie_pseudocode/index.html, but
 * Vite's dev and preview servers would hand folder URLs to the React app.
 * This makes local testing behave like the live site.
 */
function standaloneApps(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const path = (req.url ?? '').split('?')[0]
    for (const app of STANDALONE_APPS) {
      if (path === app || path === app.slice(0, -1)) {
        req.url = `${app}index.html${(req.url ?? '').slice(path.length)}`
        break
      }
    }
    next()
  }
  return {
    name: 'standalone-apps',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [standaloneApps(), react(), tailwindcss(), githubPagesFallback()],
})

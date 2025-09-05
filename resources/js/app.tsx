import "../css/app.css"
import { Providers } from "@/components/providers"
import { createInertiaApp } from "@inertiajs/react"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { createRoot, hydrateRoot } from "react-dom/client"
import { initializeTheme } from "./hooks/use-theme"

const appName = import.meta.env.VITE_APP_NAME || "Laravel"

createInertiaApp({
  title: (title) => (title ? `${title} / ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);

    const appElement = (
      <Providers>
        <App {...props} />
      </Providers>
    )
    if (import.meta.env.SSR) {
      hydrateRoot(el, appElement)
      return
    }

    root.render(appElement)
  },
  progress: false,
})

initializeTheme()

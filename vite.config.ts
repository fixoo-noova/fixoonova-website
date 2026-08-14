import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { prerenderRouteHtml } from "./vite-plugin-prerender-routes";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), prerenderRouteHtml()],
});

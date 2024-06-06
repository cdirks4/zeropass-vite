import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { devErrorBoundary } from "@metronome-sh/dev-error-boundary";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ["**/*.css"],
      serverBuildFile: "index.js",
    }),
    nodePolyfills({
      include: ["path"],
      exclude: ["http"],
      globals: {
        Buffer: true,
      },
      protocolImports: true,
    }),
    tsconfigPaths(),
    devErrorBoundary(),
  ],
  build: {
    sourcemap: true,
  },
  optimizeDeps: { exclude: ["@zerodev/passkey-validator", "@zerodev/*"] },
  server: {
    hmr: { overlay: true },
  },
});

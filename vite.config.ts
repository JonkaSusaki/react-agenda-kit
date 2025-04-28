import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["lib"], tsconfigPath: "./tsconfig.lib.json" }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      // input: Object.fromEntries(
      //   glob
      //     .sync("lib/**/*.{ts,tsx}", {
      //       ignore: ["lib/**/*.d.ts"],
      //     })
      //     .map((file) => [
      //       // The name of the entry point
      //       // lib/nested/foo.ts becomes nested/foo
      //       relative("lib", file.slice(0, file.length - extname(file).length)),
      //       // The absolute path to the entry file
      //       // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
      //       fileURLToPath(new URL(file, import.meta.url)),
      //     ])
      // ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});

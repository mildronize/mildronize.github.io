import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    globals: true,
    /**
     * Absolute import for vitest
     * https://vitest.dev/guide/common-errors
     */
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname, 
    }
  },
});

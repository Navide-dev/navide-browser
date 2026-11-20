import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Self-contained: the public @navide packages resolve from node_modules (the
// tarballs a Navide GitHub Release carries), not from a Navide checkout.
const excluded = ['**/node_modules/**', '**/dist/**', '**/backend/.venv/**']
// Catalog checks read plugin-ui's own strings unmerged: they run on their own.
const i18n = ['tests/i18n/**/*.test.ts']

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'node',
    globals: false,
    // Transform the public packages like source, as the Navide repository's
    // aliases did: vi.resetModules() then re-evaluates their module state.
    server: { deps: { inline: [/@navide\//] } },
    projects: [
      { extends: true, test: { name: 'navide-browser', include: ['src/**/*.{test,spec}.ts'], exclude: excluded } },
      { extends: true, test: { name: 'navide-browser-artifacts', include: ['tests/**/*.{test,spec}.ts'], exclude: [...excluded, ...i18n] } },
      { extends: true, test: { name: 'navide-browser-i18n', include: i18n, exclude: excluded } },
    ],
  },
})

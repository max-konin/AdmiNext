import { defineConfig } from 'tsup';

export default defineConfig([
  {
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: false,
    dts: true,
    format: ['esm', 'cjs'],
    entry: {
      index: 'src/index.ts',
    },
    outDir: 'dist',
    external: ['@playwright/test'],
  },
]);

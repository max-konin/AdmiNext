import { defineConfig } from 'tsup';

const cfg = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ['esm', 'cjs'],
};

export default defineConfig([
  {
    ...cfg,
    entry: {
      index: 'src/index.ts',
    },
    outDir: 'dist',
  },
  {
    ...cfg,
    entry: {
      index: 'src/components/client/index.ts',
    },
    external: ['react', 'next'],
    outDir: 'dist/client',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      };
    },
  },
  {
    ...cfg,
    entry: {
      index: 'src/components/server/index.ts',
    },
    external: ['react', 'next'],
    outDir: 'dist/server',
    esbuildOptions: (options) => {
      // Append "use server" to the top of the react entry point
      options.banner = {
        js: '"use server";',
      };
    },
  },
]);

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/nuxt.ts',
    'src/cyph.ts',
    'src/si.ts',
  ],
  shims: true,
  target: 'esnext',
  sourcemap: false,
  minify: true,
  minifySyntax: true,
  minifyIdentifiers: true,
});

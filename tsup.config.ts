import { defineConfig } from 'tsup';

export default defineConfig([
  // {
  //   entry: ['src/dotenv.ts'],
  //   format: ['esm'],
  //   outDir: 'dist',
  //   dts: true,
  //   outExtension: () => ({ js: '.js' }),
  //   clean: false,
  //   splitting: false,
  //   target: 'esnext',
  // },
  // {
  //   entry: ['src/dotenv.cjs.ts'],
  //   format: ['cjs'],
  //   outDir: 'dist',
  //   dts: true,
  //   outExtension: () => ({ js: '.cjs' }),
  //   clean: false,
  //   splitting: false,
  //   target: 'esnext',
  // },
  {
  entry: [
    'src/index.ts',
    'src/nuxt.ts',
    'src/cyph.ts',
    'src/si.ts',
    'src/utils.ts',
    'src/dotenv.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  shims: true,
  target: 'esnext',
  sourcemap: false,
  minify: true,
  minifySyntax: true,
  minifyIdentifiers: true,
  cjsInterop: true,
  splitting: true,
  // footer(ctx) {
  //   if (ctx.format === 'cjs') {
  //     return {
  //       js: 'module.exports = module.exports.default;',
  //     };
  //   }
  // },
  // banner(ctx) {
  //   if (ctx.format === 'esm') {
  //     return {
  //       js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
  //     };
  //   }
  // },
  // esbuildOptions: (options) => {
  //   options.footer = {
  //     // This will ensure we can continue writing this plugin
  //     // as a modern ECMA module, while still publishing this as a CommonJS
  //     // library with a default export, as that's how ESLint expects plugins to look.
  //     // @see https://github.com/evanw/esbuild/issues/1182#issuecomment-1011414271
  //     js: 'module.exports = module.exports.default;',
  //   };
  // },
}]);

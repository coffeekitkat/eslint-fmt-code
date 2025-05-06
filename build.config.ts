import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  rollup: {
    esbuild: {
      minify: true,
      minifySyntax: true,
      minifyIdentifiers: true,
      sourcemap: false,
    },
  },
//   declaration: true,
//   clean: true,
})

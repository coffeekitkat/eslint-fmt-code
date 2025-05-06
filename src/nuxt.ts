import { defineNuxtModule } from '@nuxt/kit'
import { telemetry } from './telemetry'

export default defineNuxtModule({
  setup(options: any, nuxt: any) {
    nuxt.hook('build:done', async () => {
      // Telemetry data.
      telemetry(nuxt.options.buildDir)
    })
  },
})

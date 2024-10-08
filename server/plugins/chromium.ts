import { closeBrowser } from '../utils/chromium'

export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('close', async () => {
    await closeBrowser()
  })
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  compatibilityDate: '2024-11-01',
  modules: ['@pinia/nuxt','pinia-plugin-persistedstate','@nuxt/ui'],
  css: [
    '~/app/assets/css/style.css',
    '~/app/assets/css/fonts.css',
  ],
  devtools: { enabled: true },
  tailwindcss: {
    configPath: '~/tailwind.config.js',
  }
})

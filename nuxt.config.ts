// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@nuxt/content'],
    routeRules: {
        '/': { prerender: true }
    },
    css: ['assets/css/main.css'],
    build: {
        transpile: ['marked']
    },
    content: {
        documentDriven: false,
        contentHead: true
    }
})
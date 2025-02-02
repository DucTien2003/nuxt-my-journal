// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,

  css: ['@/assets/styles/styles.scss'],

  modules: ['@nuxtjs/tailwindcss', '@ant-design-vue/nuxt', '@pinia/nuxt'],
});

// https://nuxt.com/docs/api/configuration/nuxt-config
const MovieSearchTheme = {
  dark: true,
  colors: {
    background : "#020617"
  }
}

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    'vuetify-nuxt-module',
    '@unocss/nuxt', 
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        defaultTheme: 'MovieSearchTheme',
        themes: {
          MovieSearchTheme,
        },
      },
      icons: {
        defaultSet: 'mdi',
        sets: ['mdi', 'fa']
      }
    }
  },
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.NUXT_PUBLIC_TMDB_API_KEY
    }
  }
})
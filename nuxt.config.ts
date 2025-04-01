// https://nuxt.com/docs/api/configuration/nuxt-config
const MovieSearchTheme = {
  dark: true,
  colors: {
    background: "#020617",
    surface: "#1e293b",
    primary: "#3b82f6",
    secondary: "#64748b",
    error: "#ef4444",
    info: "#0ea5e9",
    success: "#10b981",
    warning: "#facc15"
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
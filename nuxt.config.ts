// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-02-08',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/image', '@unocss/nuxt', '@nuxtjs/google-fonts'],

  googleFonts: {
    display: 'swap',
    download: false,
    families: {
      'Noto Sans TC': true,
    },
  },

  image: {
    provider: 'ipx',
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 75, // 設定品質
        },
      },
    },
  },

  i18n: {
    vueI18n: './i18n.config.ts',
  },

  unocss: {
    nuxtLayers: true,
  },

  postcss: {
    plugins: {
      '@unocss/postcss': {},
      'postcss-preset-env': {
        stage: 1,
        features: {
          'nesting-rules': true,
        },
      },
      'postcss-nested': {},
      'postcss-pxtorem': {
        // 更正插件名稱
        rootValue: 16,
        propList: ['*'],
        exclude: /node_modules/i,
      },
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', '> 1%'],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },

  css: ['~/assets/css/style.scss'],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_API_BASE_URL,
    }
  },
})
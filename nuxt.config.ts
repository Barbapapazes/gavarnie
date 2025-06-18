const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    'nuxt-security',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system',
  },
  runtimeConfig: {
    public: {
      name: '',
      url: '',
    },
    mail: {
      key: '',
      from: '',
    },
  },
  routeRules: {
    '/api/me': {
      security: {
        rateLimiter: {
          headers: false,
          interval: 60 * 1000,
          tokensPerInterval: 6,
        },
      },
    },
    '/api/_hub/**': {
      csurf: false,
    },
    '/**': {
      security: {
        rateLimiter: false,
      },
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  hub: {
    database: true,
    blob: true,
    kv: true,
  },
  csurf: {
    methodsToProtect: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  security: {
    csrf: true,
    rateLimiter: {
      driver: {
        name: 'cloudflare-kv-binding',
        options: {
          binding: 'KV',
        },
      },
    },
    headers: {
      contentSecurityPolicy: {
        'img-src': ['\'self\'', 'data:', 'https://avatars.githubusercontent.com', 'https://static-cdn.jtvnw.net/'],
        'script-src': ['\'self\'', 'https:', '\'nonce-{{nonce}}\'', '\'strict-dynamic\'', 'https://static.cloudflareinsights.com'],
      },
      crossOriginEmbedderPolicy: isProd ? 'credentialless' : false,
    },
  },
})

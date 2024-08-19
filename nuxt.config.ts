const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxt/ui',
    'nuxt-security',
  ],
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
  runtimeConfig: {
    app: {
      name: '',
      url: '',
    },
    mail: {
      key: '',
      from: '',
    },
  },
  hub: {
    database: true,
    blob: true,
    kv: true,
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
        'script-src': ['\'self\'', 'https', '\'nonce-{{nonce}}\'', 'https://static.cloudflareinsights.com'],
      },
      crossOriginEmbedderPolicy: isProd ? 'credentialless' : false,
    },
  },
  csurf: {
    methodsToProtect: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
  colorMode: {
    preference: 'system',
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
})

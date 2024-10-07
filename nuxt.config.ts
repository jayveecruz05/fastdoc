import /* vuetify, */ { transformAssetUrls } from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';
import preRenderRoutes from './assets/json/prerender-routes-soon.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ['vuetify']
  },
  nitro: {
    preset: 'node-server', // or 'vercel', 'node-server', etc., depending on deployment target
    compressPublicAssets: true, // Enable gzip compression for static assets
    minify: true,
    prerender: {
      // crawlLinks: true,
      routes: preRenderRoutes
    }
  },
  modules: [
    // (_options, nuxt) => {
    //   nuxt.hooks.hook('vite:extendConfig', (config) => {
    //     // @ts-expect-error
    //     config.plugins.push(vuetify({ autoImport: true }))
    //   })
    // },
    'nuxt-security',
    '@vite-pwa/nuxt',
    'nuxt-viewport',
    'nuxt-booster',
    '@nuxt/image',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    'nuxt-schema-org',
    // '@zadigetvoltaire/nuxt-gtm'
  ],
  booster: {
    detection: {
      performance: true,
      browserSupport: true,
      battery: true
    },
    performanceMetrics: {
      timing: {
        fcp: 800, // First Contentful Paint target
        dcl: 1200 // DOM Content Loaded target
      }
    },
    optimizeSSR: {
      cleanPrefetches: true,
      cleanPreloads: true,
      inlineStyles: true
    },
    /**
     * IntersectionObserver rootMargin for Components and Assets
     */
    lazyOffset: {
      component: '15%', // Trigger component loading earlier
      asset: '30%' // Earlier asset loading
    }
  },
  image: {
    lazy: true,
    formats: ['webp', 'avif'],
    quality: 75,
    lazyPlaceholder: true,
    domains: ['img.youtube.com', 'i.vimeocdn.com'],
    alias: { youtube: 'https://img.youtube.com', vimeo: 'https://i.vimeocdn.com' }
  },
  fontMetrics: {
    fonts: ['Poppins']
  },
  googleFonts: {
    families: {
      Poppins: {
        wght: [400, 500, 600, 700]
      }
    },
    display: 'swap',
    preload: true
  },
  site: {
    url: 'https://fastdoc.com',
    name: 'FastDoc'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  // gtm:{
  //   id: 'GTM-52V8GRGW'
  // },
  // runtimeConfig: {
  //   public: {
  //     gtm: {
  //       id: 'GTM-52V8GRGW',
  //       defer: false,
  //       enabled: true
  //     }
  //   }
  // },
  security: {
    headers: {
      crossOriginEmbedderPolicy: (process.env.NODE_ENV === 'development') ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: (process.env.NODE_ENV === 'development') ? false : {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'img-src': ["'self'", 'data:', 'https://*.google-analytics.com'],
        'connect-src': ["'self'", 'https://*.google-analytics.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'object-src': ["'none'"],
        'frame-ancestors': ["'none'"]
      }
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'FastDoc',
      short_name: 'FastDoc',
      description: 'FastDoc',
      theme_color: '#FFFFFF',
      background_color: '#FFFFFF',
      display: 'standalone', // More consistent with PWA behavior
      orientation: 'portrait', // Lock to portrait mode if applicable
      icons: [
        { src: 'icons/icon-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: 'icons/icon-120x120.png', sizes: '120x120', type: 'image/png' },
        { src: 'icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
        { src: 'icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
        { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
          },
        },
        {
          urlPattern: /\.(png|jpg|jpeg|webp|avif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            },
          },
        }
      ]
    },
    // devOptions: { enabled: true }
  },
  // css: [
  //   '~/assets/style/main.scss'
  // ],
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    vue: {
      template: {
        transformAssetUrls
      }
    },
    plugins: [
      svgLoader({ defaultImport: 'component', svgo: false }),
      // vuetify({ autoImport: true })
    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@use "~/assets/style/main.scss" as *;'
    //     }
    //   }
    // },
    build: {
      rollupOptions: {
        cache: true, // Use caching for faster rebuilds
        output: {
          // Optimize manual chunking for better code splitting
          manualChunks(id) {
            // Group large dependencies into separate chunks
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('nuxt')) { return 'vue-nuxt-vendors'; }
              if (id.includes('vuetify')) { return 'vuetify-vendors'; }
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      },
      minify: 'terser', // Use terser for minification
      terserOptions: {
        compress: {
          // ecma: 2020, // Optimize for newer JS versions
          drop_console: true, // Remove console logs
          drop_debugger: true, // Remove debugger statements
          pure_funcs: ['console.log'], // Remove specific console functions
          passes: 3, // Increase optimization passes for better minification
          toplevel: true, // Mangling at top-level scope
          reduce_funcs: true, // Collapse repeated function calls
          reduce_vars: true, // Optimize variable references
          unused: true // Remove unused variables/functions (recommended for performance)
        },
        format: {
          comments: false,  // Remove comments for smaller bundle size
          shorthand: true,
          inline_script: true
        },
        mangle: {
          safari10: true, // Ensure compatibility with Safari 10
          toplevel: true // Mangle top-level variable and function names
        }
      },
      cssCodeSplit: true,
      sourcemap: false
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    optimizeDeps: {
      include: ['vue', 'nuxt', 'vuetify'], // Pre-bundle dependencies for faster dev startup
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      preload: true,
      isAsync: true // Enable lazy loading for components
    }
  ],
  ignore: [
    'components/Template.vue',
    'components/pages/Home/**',
    'components/pages/Featured/**',
    'components/pages/Careers/**',
    'components/pages/Consultation/**',
    'components/pages/MyProfile/**',
    'components/pages/Doctor.vue',
    'components/pages/FindADoctor.vue',
    'components/pages/Login.vue',
    'components/pages/ForgotPassword.vue',
    'components/pages/ForgotPassword.vue',
    'components/pages/SignUp.vue',
    'components/pages/Specializations.vue',
    'layouts/main.vue',
    'pages/careers/**',
    'pages/doctor/**',
    'pages/my-profile/**',
    'pages/find-a-doctor.vue',
    'pages/forgot-password.vue',
    'pages/login.vue',
    'pages/sign-up.vue',
    'pages/specializations.vue'
  ],
  devServer: { port: 8000 },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
});
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from "node:url"
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src/views', import.meta.url)),
      '&': fileURLToPath(new URL('./src/components', import.meta.url)),
      '$': fileURLToPath(new URL('./src/store', import.meta.url)),
      '#': fileURLToPath(new URL('./src/router', import.meta.url)),
    }
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 5173
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    ViteImageOptimizer({
      logStats: true,
      ansiColors: true,
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      exclude: undefined,
      include: undefined,
      includePublic: true,
      png: {
        quality: 90
      },
      jpeg: {
        quality: 90
      },
      jpg: {
        quality: 90
      },
      tiff: {
        quality: 90
      },
      gif: {},
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false
              },
              cleanupIDs: {
                minify: false,
                remove: false,
              },
              convertPathData: false,
            },
          },
          'removeViewBox',
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            },
          },
        ]
      },
      webp: {
        lossless: true
      },
      avif: {
        lossless: true
      },
      cache: false,
      cacheLocation: undefined
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
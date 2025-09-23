import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from "node:url"
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
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
    })
  ],
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
  }
})
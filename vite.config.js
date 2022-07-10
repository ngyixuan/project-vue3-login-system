import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"src")
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

})

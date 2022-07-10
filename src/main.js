import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from '@/router/index'
import store from './store'
// import { setupElementPlus } from '@/shared/plugins/element_plus';
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

// setupElementPlus(app)





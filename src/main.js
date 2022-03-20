import { createApp } from 'vue'
import App from './App.vue'
import './assets/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './routes/index'
import store from './store/index'
const app = createApp(App)
app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

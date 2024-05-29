import { createApp } from 'vue'
import App from './App.vue'

// 移动端适配方案flexible
import 'lib-flexible/flexible.js'

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
// 引入插件
import router from "../src/router/index";
// 安装router插件
createApp(App)
.use(router)
.use(ViewUIPlus)
.mount('#app')


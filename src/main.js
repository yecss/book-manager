import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router/index"
import permission from "./router/permission"
Vue.config.productionTip = false


Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router,
  permission
}).$mount('#app')

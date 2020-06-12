import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"; 
import navigate from "./router/navigate"; 
import ElementUi from "element-ui"
import { baseUrlStatic } from "./utils/config";
import 'element-ui/lib/theme-chalk/index.css';
import "./utils/fliter/global-filter";
// import "./utils/extends";

Vue.use(ElementUi)
Vue.prototype.$navigate = navigate
Vue.prototype.$baseUrlStatic = baseUrlStatic

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

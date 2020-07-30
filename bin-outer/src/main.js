import Vue from 'vue'
import App from './App.vue'
import { brouter,globalObj } from './bin-router/brouter'
Vue.config.productionTip = false
Vue.use(brouter,"jiebin")
new Vue({
  render: h => h(App),
  myOption: 'hello!'
}).$mount('#app')

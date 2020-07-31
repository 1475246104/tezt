// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入reset
import "./assets/reset.css"

// 处理公共组件
import commonComponents from "./components/index"
for(let i in commonComponents){
  vue.component(i,commonComponents[i])
}

// 出理过滤器
import filters from "./filters"
for(let i in filters){
  Vue.filter(i,filters[i])
}
import store from "./store"


import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

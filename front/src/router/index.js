import Vue from 'vue'
// import vueResource from 'vue-resource'
import Router from 'vue-router'
import Main from '@/components/main'
import Sub from '@/components/sub'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Main', component: Main },
    { path: '/sub', name: 'Sub', component: Sub },
    { path: '*', redirect: '/' }
  ]
})

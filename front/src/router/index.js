import Vue from 'vue'
import Router from 'vue-router'
import GalleryData from '@/components/gallery'
import LocationData from '@/components/location'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'GalleryData', component: GalleryData },
    { path: '/location', name: 'LocationData', component: LocationData },
    { path: '*', redirect: '/' }
  ]
})

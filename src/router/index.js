import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import SelectView from "@/views/SelectView.vue";
import TimerView from "@/views/TimerView.vue";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/select',
      name: 'select',
      component: SelectView
    },
    {
      path: '/timer',
      name: 'timer',
      component: TimerView
    },
    {
      path: '/',
      redirect: '/timer',
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router

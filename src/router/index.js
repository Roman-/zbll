import {createRouter, createWebHashHistory} from 'vue-router'
import SelectView from "@/views/SelectView.vue";
import TimerView from "@/views/TimerView.vue";
import AboutView from "@/views/AboutView.vue";
import TestView from "@/views/TestView.vue";

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
      redirect: '/select',
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    }
  ]
})

export default router

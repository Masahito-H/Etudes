import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from "@/components/Index.vue";
import Etudes from "@/components/Etudes/Etudes.vue";
import Prototype from "@/components/Etudes/Prototype/Prototype.vue";
import DimentionalWindows from "@/components/Etudes/DimentionalWindows/DimentionalWindows.vue";
import InterfaceInteraction from "@/components/Etudes/InterfaceInteraction/InterfaceInteraction.vue";

import store from "@/store.js";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/etudes/:work',
      name: "Etudes",
      component: Etudes,
      props: true,
      children: [
        {
          name: "Prototype",
          path: "/etudes/00-prototype",
          component: Prototype
        },
        {
          name: "DimentionalWindows",
          path: "/etudes/01-dimentionalWindows",
          component: DimentionalWindows
        },
        {
          name: "InterfaceInteraction",
          path: "/etudes/02-interfaceInteraction",
          component: InterfaceInteraction
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("setStateLoading", true);
  
  setTimeout(() => {
      next();
  }, 260);
});

router.afterEach((to, from) => {
  setTimeout(() => {
    store.dispatch("setStateLoading", false);
  }, 500);
});

export default router;



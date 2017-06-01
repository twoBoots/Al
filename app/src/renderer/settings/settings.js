import Vue from 'vue';
import Electron from 'vue-electron';
import Router from 'vue-router';

import Settings from './Settings';
import routes from '../routes';

Vue.use(Electron);
Vue.use(Router);
Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => {
    return {y: 0};
  },
  routes
});

export const bus = new Vue();

/* eslint-disable no-new */
new Vue({
  router,
  ...Settings
}).$mount('#app');

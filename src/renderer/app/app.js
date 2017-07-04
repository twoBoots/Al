import Vue from 'vue';

import router from '@/router';
import store from '@/store';

import App from './AppWindow';


if(!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app');

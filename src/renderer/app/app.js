import Vue from 'vue';

import router from '@/router';
import store from '@/store';
import Utils from '@/modules/utils';

import App from './AppWindow';


if(!process.env.IS_WEB) Vue.use(require('vue-electron'));

const {remote} = require('electron');

const dev = (remote.process.env.NODE_ENV === 'development');

Vue.config.debug = dev;
Utils.load(dev);


/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app');


// router.beforeEach((to, from, next) => {
//   // check auth here
//   next();
// });

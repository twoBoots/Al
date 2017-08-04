import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  },
  routes: [
    {
      path: '/',
      name: 'splash',
      component: require('@/components/Splash')
    },
    {
      path: '/landing',
      component: require('@/components/LandingPage'),
      children: [
        {path: '', component: require('@/components/LandingPage/Base')},
        {path: 'versions', component: require('@/components/LandingPage/Versions')},
        {path: 'readme', component: require('@/components/LandingPage/Readme')}
      ]
    },
    {
      path: '/a',
      name: 'apage',
      component: require('@/components/APage'),
      children: [
        {path: '0', name: 'a0', component: require('@/components/APage/A0')},
        {path: '1', name: 'a1', component: require('@/components/APage/A1')},
        {path: '2', name: 'a2', component: require('@/components/APage/A2')},
        {path: '3', name: 'a3', component: require('@/components/APage/A3')},
        {path: '4', name: 'a4', component: require('@/components/APage/A4')}
      ]
    },
    {
      path: '/b',
      component: require('@/components/BPage')
      // component: () => { return import('@/components/BPage'); } // lazy loading
    },
    {
      path: '/c',
      component: require('@/components/CPage'),
      children: [
        {path: '0', name: 'c0', component: require('@/components/CPage/C0')},
        {path: '1', name: 'c1', component: require('@/components/CPage/C1')},
        {path: '2', name: 'c2', component: require('@/components/CPage/C2')},
        {path: '3', name: 'c3', component: require('@/components/CPage/C3')},
        {path: '4', name: 'c4', component: require('@/components/CPage/C4')},
        {path: '5', name: 'c5', component: require('@/components/CPage/C5')},
        {path: '6', name: 'c6', component: require('@/components/CPage/C6')}
      ]
    },
    {
      path: '/git',
      component: require('@/components/Git')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

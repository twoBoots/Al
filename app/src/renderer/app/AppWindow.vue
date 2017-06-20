<template>
  <div id="app" :class="platform">
    <div id='content'>
      <router-view></router-view>
    </div>
    <window-bar title='Al'></window-bar>
  </div>
</template>

<script>
  import os from 'os';
  import store from 'renderer/vuex/store';
  import {bus} from './app.js';

  import ChanMan from '../modules/ChanMan';
  const channels = new ChanMan();

  const {remote} = require('electron');
  const platform = os.platform();


  remote.getCurrentWindow().setTitle('Al');


  export default {
    data() {
      return {
        platform
      };
    },
    channels,
    store,
    components: {
      windowBar: require('components/WindowBar')
    },
    methods: {
      registerEvents
    },
    created() {},
    mounted() {
      this.registerEvents();
    },
    updated() {},
    destroyed() {}
  };


  function registerEvents() {
    channels.on('app:state', (e, d) => {
      bus.$emit('app:state', d);
    });

    bus.$on('app:quit', () => {
      channels.send('app:quit');
    });
  }
</script>

<style lang="less">
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    // display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }

  #content {
    position: absolute;
    top: 24px;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid #eee;
    border-top: none;

    .darwin & {
      top: 0;
    }
  }
</style>

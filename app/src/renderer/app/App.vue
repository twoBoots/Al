<template>
  <div id="app" :class="platform">
    <div id='content'>
      <router-view></router-view>
    </div>
    <window-bar title='Al'></window-bar>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store';
  import WindowBar from 'components/WindowBar';

  const {remote} = require('electron');

  import os from 'os';
  const platform = os.platform();

  // const ipcChannels = ['app:*'];
  // const ipcChannels = '*';

  // const channels = require(chanMan)(icpChannels);

  remote.getCurrentWindow().setTitle('Al');

  const channels = {};

  export default {
    data: {
      platform
    },
    channels,
    store,
    components: {
      WindowBar
    }
  };
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

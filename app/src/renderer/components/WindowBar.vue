<template>
  <div id='window-bar'>
    <div id='window-title'>{{title}}</div>
    <ul id='window-controls'>
      <li v-on:click='windowMinimize'>_</li>
      <li v-on:click='windowClose'>x</li>
    </ul>
  </div>
</template>

<script>
  const {remote} = require('electron');

  export default {
    name: 'window-bar',
    props: ['title'],
    methods: {
      windowClose() {
        remote.BrowserWindow.getFocusedWindow().close();
      },
      windowMinimize() {
        remote.BrowserWindow.getFocusedWindow().minimize();
      }
    }
  };
</script>


<style lang="less">
  #window-bar {
    background: #444;
    height: 24px;
    color: #fff;
    font-size: 10pt;
    line-height: 24px;
    position: absolute;
    top: 0;
    width: 100%;

    .darwin & {
      display: none;
    }

    #window-title {
      -webkit-app-region: drag;
      width: ~"calc(100% - 48px)";
      text-align: left;
      padding-left: 8px;
    }

    #window-controls {
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0;

      li {
        display: inline-block;
        width: 24px;
        height: 24px;
        font-size: 10pt;
        cursor: pointer;
        transition: all 0.175s;

        &:hover {
          background: #888;
        }
      }
    }
  }
</style>

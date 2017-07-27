<template>
  <div id="app" :class="platform">
    <div id='content'>
      <transition name='transition-swipe-fade' appear mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <nav-bar></nav-bar>
    <window-bar title="Hg"></window-bar>
  </div>
</template>


<script>
  import os from 'os';
  import store from '@/store';
  import bus from '@/modules/Bus';

  import FSM from 'state-machine';

  import ChanMan from '@/modules/ChanMan';

  const channels = new ChanMan();

  const {remote} = require('electron');

  const platform = os.platform();


  remote.getCurrentWindow().setTitle('Hg');

  export default {
    store,
    channels,
    fsm: FSM.create({}),
    data() {
      return {
        platform
      };
    },
    components: {
      navBar: require('@/components/NavBar'),
      windowBar: require('@/components/WindowBar')
    },
    methods: {
      registerEvents
    },
    created() {
      console.log('c', this);
    },
    mounted() {
      this.registerEvents();
    },
    updated() {},
    destroyed() {}
  };


  function registerEvents() {
    channels.on('settings:state', (e, d) => {
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
    overflow-x: hidden;

    .darwin & {
      top: 0;
    }
  }

  .transition-swipe-fade {

    &-enter-active, &-leave-active {
      transition: all .175s ease;
    }

    &-enter {
      transform: translate(128px, 0);
    }

    &-enter, &-leave-to {
      opacity: 0;
    }

    &-enter-to, &-leave {
      opacity: 1;
      transform: translate(0, 0);
    }

    &-leave-to {
      transform: translate(-128px, 0);
    }
  }
</style>

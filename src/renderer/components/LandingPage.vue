<template>
  <div>
    <h1>
      Hg
      <span>Mercury</span>
    </h1>
    <transition name='transition-fade' appear mode="out-in">
      <router-view></router-view>
    </transition>
    <router-link to='/landing/versions' tag='button'>versions</router-link>
    <router-link to='/landing/readme' tag='button'>readme</router-link>
  </div>
</template>


<script>
  export default {
    name: 'landing-page',
    components: {},
    methods: {},
    created() {},
    mounted() {
    },
    updated() {},
    destroyed() {
    }
  };
</script>


<style lang="less" scoped>
  h1 {
    margin: 24px;
    // font-family: monospace;
    font-weight: 400;
    position: relative;
    display: inline-block;
    padding: 20px;
    user-select: none;
    background:
      radial-gradient(
        ellipse at center,
        rgba(213, 210, 209, 1) 0%,
        rgba(213, 210, 209, .85) 100%
        );

    &:before {
      content: '80';
      display: block;
      position: absolute;
      top: 4px;
      left: 4px;
      font-size: 11pt;
      text-align: left;
    }

    &:after {
      content: '2\A 8\A 18\A 32\A 18\A 2';
      white-space: pre;
      position: absolute;
      display: block;
      top: 4px;
      right: 4px;
      text-align: right;
      font-size: 7pt;
      line-height: 8pt;
      color: #6A6C6E;
    }

    span {
      display: block;
      font-size: 11pt;
      font-weight: 300;
    }
  }

  .transition-fade {

    &-enter-active, &-leave-active {
      transition: opacity .175s ease;
    }

    &-enter, &-leave-to {
      opacity: 0;
    }

    &-enter-to, &-leave {
      opacity: 1;
    }
  }
</style>

<template>
  <div :id='id' class='nav-bar'>
    <ul>
      <router-link to='/landing' tag='li'>Home</router-link>
      <router-link to='/a/0' tag='li'>A</router-link>
      <router-link to='/b' tag='li'>B</router-link>
      <router-link to='/c' tag='li'>C</router-link>
      <router-link to='/git' tag='li'>git</router-link>
    </ul>
    <div v-on:click='toggleNav' class='nav-control'>
      &gt;
    </div>
  </div>
</template>


<script>
  import store from '@/store';

  export default {
    name: '',
    props: ['id', 'classList'],
    store,
    data() {
      return {};
    },
    watch: {
      $route: (newRoute, oldRoute) => {
        console.log(newRoute, oldRoute);
      }
    },
    methods: {
      toggleNav
    },
    created() {},
    mounted() {
      console.log('V', this.$router);
    },
    updated() {},
    destroyed() {}
  };


  function toggleNav(e) {
    if(this.$el.classList.contains('is-open')) {
      e.target.textContent = '>';
    } else {
      e.target.textContent = '<';
    }

    this.$el.classList.toggle('is-open');
  }
</script>


<style lang="less">
  @import '../less/colors.less';
  @import '../less/material.less';

  .nav-bar {
    .background-gray-darker;
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: -16.5vw;
    width: 16.5vw;
    transition: all 0.225s;
    will-change: left, box-shadow;

    ul {

      li {
        .background-gray-darker;
        .gray-bright;
        padding: 8px;
        text-align: left;
        transition: all 0.125s;
        will-change: background;
        cursor: pointer;

        &:hover {
          .background-gray-dark;
        }

        &.router-link-active {
          .background-red;
        }
      }
    }

    &.is-open {
      .material-raised;
      left: 0;

      .nav-control {
        opacity: 1;
      }
    }

    .nav-control {
      .material-lifted;
      position: absolute;
      top: 0;
      right: -32px;
      height: 32px;
      background: #444;
      user-select: none;
      width: 32px;
      color: @gray-brighter;
      line-height: 30px;
      cursor: pointer;
      opacity: 0.2;
      transition: all 0.225s;
      will-change: opacity;
    }
  }
</style>

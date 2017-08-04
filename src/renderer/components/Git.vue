<template>
  <div class='git'>
    <h1>.git</h1>
    <button @click='getHash'>the button</button>
    <pre>
      <code v-for='line in stdout'>{{line}}</code>
    </pre>
  </div>
</template>


<script>
  import bus from '@/modules/Bus';

  export default {
    name: 'git-page',
    components: {},
    methods: {
      registerEvents,
      getHash
    },
    data() {
      return {
        stdout: []
      };
    },
    created() {},
    mounted() {
      this.registerEvents();
    },
    updated() {},
    destroyed() {}
  };

  function getHash() {
    bus.$emit('git:cmd', 'getHash');
  }

  function registerEvents() {
    bus.$on('git:stdout', (d) => {
      this.stdout.push(d);
    });
  }
</script>


<style lang="less">
  @import '../less/colors.less';
  @import '../less/material.less';

  .git {

    h1 {
      margin: 40px 0 24px 0;
    }

    pre {
      .background-gray-bright;
      .gray-dark;
      border-radius: 4px;
      text-align: left;
      width: 420px;
      margin: 24px auto;
      padding: 8px;

      code {
        display: block;
      }
    }

    button {
      .material;
      .background-gray-darker;
      .gray-bright;
      cursor: pointer;
      padding: 8px 16px;
      border: none;
      outline: none;
      transition: all 0.175s;

      &:hover {
        .material-raised;
      }
    }
  }
</style>

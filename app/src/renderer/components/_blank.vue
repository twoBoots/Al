<template>
  <div :id='id' :classList='classList'>
  </div>
</template>


<script>
  import store from 'renderer/vuex/store';
  // import {bus} from '../app/app.js';


  export default {
    name: '',
    props: ['id', 'classList'],
    data() {
      return {};
    },
    components: {},
    methods: {},
    created() {},
    mounted() {},
    updated() {},
    destroyed() {}
  };
</script>


<style lang="less">

</style>

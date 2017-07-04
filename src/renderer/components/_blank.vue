<template>
  <div :id='id' :classList='classList'>
  </div>
</template>


<script>
  import store from './store';
  // import {bus} from '../app/app.js';


  export default {
    name: '',
    props: ['id', 'classList'],
    store,
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

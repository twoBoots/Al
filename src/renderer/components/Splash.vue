<template>
  <h5>
    loading
  </h5>
</template>


<script>

  export default {
    name: 'splash',
    components: {
    },
    methods: {},
    created() {},
    mounted() {
      console.log(this.$router);
      console.log(this);
      setTimeout(() => { this.$router.push('landing'); }, 1000, this);
    },
    updated() {},
    destroyed() {}
  };
</script>


<style lang="less">

</style>

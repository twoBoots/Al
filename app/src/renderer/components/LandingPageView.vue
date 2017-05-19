<template>
  <div>
    <h1>
      Al
      <span>Aluminium</span>
    </h1>
    <current-page></current-page>
    <versions></versions>
    <!-- <links></links> -->
  </div>
</template>

<script>
  import CurrentPage from './LandingPageView/CurrentPage';
  import Links from './LandingPageView/Links';
  import Versions from './LandingPageView/Versions';
  export default {
    components: {
      CurrentPage,
      Links,
      Versions
    },
    name: 'landing-page'
  };
</script>

<style lang="less">
  h1 {
    margin: 24px;
    // font-family: monospace;
    font-weight: 400;
    position: relative;
    display: inline-block;
    padding: 8px;
    background:
    radial-gradient(
      ellipse at center,
      rgba(190, 190, 191, 1) 0%,
      rgba(190, 190, 191, .85) 100%
      );

    &:before {
      content: '13';
      display: block;
      position: absolute;
      top: 4px;
      left: 4px;
      font-size: 11pt;
      text-align: left;
    }

    &:after {
      content: '2\A 8\A 3';
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
</style>

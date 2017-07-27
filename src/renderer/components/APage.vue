<template>
  <div class='a-page'>
    <h1>A</h1>
    <ul class='progress'>
      <li :class="{active:state.is.a0}">A<sub>0</sub></li>
      <li :class="{active:state.is.a1}">A<sub>1</sub></li>
      <li :class="{active:state.is.a2}">A<sub>2</sub></li>
      <li :class="{active:state.is.a3}">A<sub>3</sub></li>
      <li :class="{active:state.is.a4}">A<sub>4</sub></li>
    </ul>
    <transition name='transition-fade-up' appear mode="out-in">
      <router-view></router-view>
    </transition>
    <button v-on:click="doAction" :disabled="!state.actions.prev" class="btn btn-sm" name="prev">Prev</button>
    <button v-on:click="doAction" :disabled="!state.actions.skip" class="btn btn-sm" name="skip">Skip</button>
    <button v-on:click="doAction" :disabled="!state.actions.next" class="btn btn-sm" name="next">Next</button>
  </div>
</template>


<script>
  import {StateMachine, StateHelper} from 'state-machine';


  export default {
    data() {
      return {
        state: null
      };
    },
    components: {},
    methods: {
      doAction
    },
    created() {
      this.fsm = new StateMachine({
        initial: 'a0',
        transitions: [
          'next :  a0 > a1 > a2 > a3 > a4',
          'prev :  a0 < a1 < a2 < a3 < a4',
          'skip :       a1 >      a3     '
        ]
      });


      // below here is vue state machine boiler plate
      const helper = StateHelper.object(this.fsm);
      this.state = helper.data;
      StateHelper.vueRouter(this.$router, helper);
    },
    mounted() {},
    updated() {},
    destroyed() {}
  };

  function doAction() {
    this.fsm.do(event.target.name);
  }
</script>


<style lang="less">
  @import '../less/colors.less';

  .a-page {
    h1 {
      margin-top: 40px;
    }

    .progress {

      li {
        .green;
        display: inline-block;
        margin: 16px 32px;
        position: relative;
        transition: all 0.3s;

        &:not(:first-child):after {
          .background-green-lighter;
          content: '';
          display: block;
          width: 40px;
          height: 2px;
          border-radius: 1px;
          position: absolute;
          top: 10px;
          left: -54px;
          transition: all 0.3s;
        }

        &.active ~ li {
          .gray-lighter;

          &:after {
            .background-gray-bright;
          }
        }
      }
    }
  }

  .transition-fade-up {

    &-enter-active, &-leave-active {
      transition: all .175s ease;
    }

    &-enter {
      transform: translate(0, 8px);
    }

    &-enter, &-leave-to {
      opacity: 0;
    }

    &-enter-to, &-leave {
      opacity: 1;
      transform: translate(0, 0);
    }

    &-leave-to {
      transform: translate(0, -8px);
    }
  }
</style>

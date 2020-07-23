<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabs-tabs',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    type: {
      type: String,
      default: '',
    }
  },

  provide() {
    return {
      rootTabs: this
    };
  },

  data() {
    return {}
  },

  components: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style lang='scss' scoped>
.tabs {
  // border: 1px solid red;
  padding: 5px;
  position: relative;
  border-bottom: 2px solid $tabs-bottom-line-color;
  // &::after {
  //   content: "";
  //   display: block;
  //   position: absolute;
  //   bottom: 0;
  //   height: 2px;
  //   width: 60px;
  //   background: $tabs-item-line;
  // }
}
</style>

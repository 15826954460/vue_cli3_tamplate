<template>
  <div :class="[
    'tabs-wrap',
  ]">
    <TabsNav :panes="panes"></TabsNav>
    <slot></slot>
  </div>
</template>

<script>
const noop = function() {};

export default {
  name: 'tabs-tabs',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: String,
    type: String, // tab-line tab-round
    customStyle: {
      type: Object,
      default: noop,
    }
  },

  provide() {
    return {
      rootTabs: this
    };
  },

  data() {
    return {
      panes: [], // tabspane 实例列表
    };
  },

  mounted() {
    this.calcNavPaneInstances();
  },

  methods: {
    calcNavPaneInstances(isForceUpdate = false) {
      // 过滤非tabs-pane组件
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
          vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'tabs-tabs-pane') || [];
        const panes = paneSlots.map(({ componentInstance }) => componentInstance);
        const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
  }
}
</script>

<style lang='scss' scoped>
</style>

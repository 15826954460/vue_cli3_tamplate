<template>
  <div
    ref="tabs-nav-ref"
    :class="[
      '__rel', 'tabs-nav'
    ]"
  >
    <span
      v-for='(item, index) in panes' :key="`${item.name}-${index}`"
      :class="[
        'tabs-nav-items', { 'tabs-nav-items-active' : $parent.value === item.name }
      ]"
      @click="(e) => handleTabsNavClick(e, item)"
    >
      {{item.label}}
    </span>

    <span v-if="type === 'line'" ref='bottom-line' class="__abs bottom-line"></span>
  </div>
</template>

<script>
export default {
  name: 'tabs-tabs-nav',

  inject: [
    'rootTabs'
  ],

  props: {
    panes: {
      type: Array,
      required: true,
    },
  },

  data() {
    const { type = 'line' } = this.rootTabs;
    return {
      type,
    }
  },

  mounted() {
    this.tabsNavRef = this.$refs['tabs-nav-ref'];
    this.type && (this.btmLineRef = this.$refs['bottom-line']);
    this.calSty();
  },

  methods: {
    handleTabsNavClick(e, item) {
      this.$parent.$emit('input', item.name)
      this.$parent.$emit('tabs-click', item.name, e);
      this.calSty();
    },

    calSty() {
      const { tabsNavRef, btmLineRef } = this;
      this.$nextTick(() => {
        const currentActiveRef = tabsNavRef.getElementsByClassName('tabs-nav-items tabs-nav-items-active')[0];
        const { offsetLeft, offsetWidth } = currentActiveRef;
        const styleObj = window.getComputedStyle(currentActiveRef, null);
        const pdL = styleObj.getPropertyValue("padding-left");
        const pdR = styleObj.getPropertyValue("padding-right");
        btmLineRef.style.width = `${offsetWidth - parseInt(pdL) - parseInt(pdR)}px`;
        btmLineRef.style.transform = `translate(${offsetLeft + parseInt(pdL)}px, 0)`;
      });
    }
  }
}
</script>

<style lang='scss' scoped>
$tabs-color: #314659;
$tabs-hover-color: #409eff;

.tabs-nav {
  display: inline-block;
  padding: 0 5px;
  border: 1px solid lightgreen;
  .bottom-line {
    display: inline-block;
    bottom: 0;
    left: 0;
    height: 2px;
    border-radius: 1px;
    background: $tabs-hover-color;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2;
    -ms-transition: all 0.2;
    transition: all 0.2;
  }
}

.tabs-nav-items {
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  color: $tabs-color;
  transition: color 0.3s ease-in-out;
  // border: 1px solid lightcoral;
  &:hover {
    color: $tabs-hover-color;
  }
  &:active {
    color: $tabs-hover-color;
  }
}

.tabs-nav-items-active {
  color: $tabs-hover-color;
}
</style>

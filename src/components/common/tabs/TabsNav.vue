<template>
  <div
    ref="tabs-nav-ref"
    :class="[
      '__rel', 'tabs-nav'
    ]"
  >
    <span
      v-for='(item) in panes' :key="`${item.name}`"
      :class="[
        '__cursor tabs-nav-items', { 'tabs-nav-items-active' : $parent.value === item.name }
      ]"
      @click="(e) => handleTabsNavClick(e, item)"
    >
      {{item.label}}
    </span>

    <span v-if="isType" ref='bottom-line' :class="['__abs bottom-line', `is-${type}`]"></span>
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

  computed: {
    isType() {
      const baackList = ['tab-line', 'tab-bg'];
      return baackList.indexOf(this.type) > -1;
    }
  },

  data() {
    const { type = 'tab-line' } = this.rootTabs;
    return {
      type,
    }
  },

  mounted() {
    if (this.isType) {
      this.tabsNavRef = this.$refs['tabs-nav-ref'];
      this.btmLineRef = this.$refs['bottom-line'];
      this.calSty();
    }
  },

  methods: {
    handleTabsNavClick(e, item) {
      this.$parent.$emit('input', item.name)
      this.$parent.$emit('tabs-click', item.name, e);
      this.isType && this.calSty();
    },

    calSty() {
      const { tabsNavRef, btmLineRef, type } = this;
      this.$nextTick(() => {
        const currentActiveRef = tabsNavRef.getElementsByClassName('tabs-nav-items tabs-nav-items-active')[0];
        const { offsetLeft, offsetWidth, offsetHeight } = currentActiveRef;
        if (type === 'tab-line') {
          const styleObj = window.getComputedStyle(currentActiveRef, null);
          const pdL = styleObj.getPropertyValue("padding-left");
          const pdR = styleObj.getPropertyValue("padding-right");
          btmLineRef.style.width = `${offsetWidth - parseInt(pdL) - parseInt(pdR)}px`;
          btmLineRef.style.transform = `translate(${offsetLeft + parseInt(pdL)}px, 0)`;
        }
        if (type === 'tab-bg') {
          btmLineRef.style.width = `${offsetWidth}px`;
          btmLineRef.style.height = `${offsetHeight * 0.8}px`;
          btmLineRef.style.borderRadius = `${offsetHeight / 2}px`;
          btmLineRef.style.transform = `translate(${offsetLeft}px, -50%`;
        }
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
  .is-tab-line {
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
  .is-tab-bg {
    display: inline-block;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(64,158,255,0.2);
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2;
    -ms-transition: all 0.2;
    transition: all 0.2;
  }
}

.tabs-nav-items {
  display: inline-block;
  padding: 5px 10px;
  color: $tabs-color;
  transition: color 0.3s ease-in-out;
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

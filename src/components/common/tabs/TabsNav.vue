<template>
  <div class="tabs-nav">
    <span class="tabs-nav-items" @click="handleTabsNavClick">{{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'tabs-tabs-nav',

  inject: [
    'rootTabs'
  ],

  props: {
    name: {
      type: [String, Number],
    },
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {}
  },

  components: {},

  created() {},

  mounted() {},

  methods: {
    handleTabsNavClick(e) {
      this.rootTabs.$emit('input', this.name)
      this.rootTabs.$emit('tabs-click', this.name, e); 
    }
  }
}
</script>

<style lang='scss' scoped>
.tabs-nav {
  display: inline-block;
  padding: 0 5px;
  // border: 1px solid blue;
}
.tabs-nav-items {
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  color: $tabs-item-text;
  &:hover {
    color: rgba(22, 171, 240, 1);
  }
  &:active {
    color: rgba(45, 183, 245, 1);
  }
}
</style>

<template>
  <div
    v-show="isActive"
    :class="[
      'tabs-pane-wrap'
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'tabs-tabs-pane',

  inject: [
    'rootTabs'
  ],

  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: [String, Number],
      required: true,
    }
  },

  data() {
    return {
      loaded: false,
    }
  },

  computed: {
    isActive() {
      const active = this.$parent.value === this.name;
      return active;
    },
  },

  created() {},

  mounted() {},

  methods: {
    handleTabClick() {
    }
  }
}
</script>

<style lang='scss' scoped>
.tabs-pane-wrap {
  // border: 1px solid red;
}
</style>

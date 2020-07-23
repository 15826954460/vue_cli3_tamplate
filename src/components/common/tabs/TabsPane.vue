<template>
  <div class="tabs-pane">
   
  </div>
</template>

<script>

export default {
  name: 'tabs-tabs-pane',
 
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: [String, Number],
    },
    
  },

  data() {
    return {}
  },

  components: {},

  created() {},

  mounted() {},

  methods: {
    handleTabClick() {
      this.$emit('')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>

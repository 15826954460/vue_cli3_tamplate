
<template>
   <div class="about">
    <h1>This is an about page</h1>
    <button @click="router.push({ path: '/' })">to home</button>
  </div>
</template>

<script>
export default {
  name: 'about-index',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
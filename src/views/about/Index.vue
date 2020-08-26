<template>
   <div class="about">
    <h1>This is an about page</h1>
    <button @click="router.push({ path: '/' })">to home</button>

    <span @click="add">点点点点！！！</span>
  </div>
</template>

<script>
export default {
  name: 'about-index',
  data () {
    return {
      inputValue: 'test666',
      isComposing: false,
      dataList: [1, 2],
    };
  },
  components: {},
  computed: {
  },
  mounted() {
    const dataObj = {}.toString.call({ a: 1 });
    console.log(dataObj);
  },
  methods: {
    add() {
      this.dataList.push(Math.random() * 10)
    },
    handleInput(e) {
      if (this.isComposing) return;
      console.log();
    },
    handleChange(e) {
      this.$refs.input.value = e.target.value;
      console.log(44444);
    },
    handleCompositionStart() {
      console.log('handleCompositionStart');
      // this.isComposing = true;
    },
    handleCompositionEnd() {
      console.log('---------------handleCompositionEnd');
      this.isComposing = false;
    },
    handleFocus() {},
    handleBlur() {},
  }
}
</script>
<style lang='scss' scoped>
</style>

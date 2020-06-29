<!--  -->
<template>
  <div>{{message}}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "toast提示信息"
    }
  },
  
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.wrap {
  position: fixed;
  z-index: 999;
  left: 50%;
  bottom: 20%;
  background: rgba(0, 0, 0, 0.35);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
}
</style>
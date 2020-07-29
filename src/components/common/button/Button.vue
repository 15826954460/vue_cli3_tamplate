<template>
  <button
    class="__flex __rcc __cursor btn-wrap"
   :class="[
      buttonSize ? `is-btn-${buttonSize}` : '',
    ]"
    :style="cusStyle"
  >
    <Loading v-if='loading' :inner="inner"></Loading>
    <span v-if="$slots.default" class="text-wrap" :class="[ loading ? 'mar-left' : '' ]"><slot></slot></span>
  </button>
</template>

<script>
const noop = function() {};

export default {
  name: 'button-button',

  inject: {
    rootBtn: { default: '' },
  },

  props: {
    size: {
      type: String,
      default: 'default',
    }, // 按钮大小  default / medium / small / mini
    cusStyle: {
      type: Object,
      default: noop,
    }, // 自定义样式
    loading: {
      type: Boolean,
      default: false,
    }, // 是否展示loading按钮
    inner: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
    }
  },

  computed: {
    buttonSize() {
      return this.size || (this.rootBtn && this.rootBtn.size);
    },
  },

  mounted() {},
}
</script>

<style scoped lang="scss">
$color: #606266;
$hov-clr: #409eff;
$hov-bgc: #fff;
$bd-clr: #dcdfe6;

.btn-wrap {
  font-size: 14px;
  color: $color;
  transition: 0.1s ease-in-out;
  border: 1px solid  $bd-clr;
  border-radius: 4px;
  .mar-left {
    margin-left: 10px;
  }
  &:hover {
    background: $hov-bgc;
    border-color: $hov-clr;
    color: $hov-clr;
  }
}
.is-btn-default {
  padding: 12px 20px;
}
.is-btn-medium {
  padding: 10px 20px;
}
.is-btn-small {
  padding: 8px 15px;
}
.is-btn-small {
  padding: 6px 12px;
}
</style>

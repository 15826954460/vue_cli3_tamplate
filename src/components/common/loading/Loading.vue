<template>
  <div class="loading-wrap"
    :style="{ width: loadSize, height: loadSize, color: color }"
  >
    <div class="loading-ring">
      <div class="outer" />
      <div v-if='inner' class="inner"
        :style="{ width: `${100 * innerSize}%`, height: `${100 * innerSize}%` }"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "loading-Loading",

  props: {
    size: { // loading 大小
      type: [String, Number],
      default: 15,
    },
    inner: { // 是否展示内圈
      type: Boolean,
      default: false,
    },
    innerSize: { // 内圈尺寸大小
      type: Number,
      default: 0.4,
    },
    color: {
      type: String,
      default: '#407af3'
    }
  },

  computed: {
    loadSize() {
      return typeof this.size === 'string' ? this.size : `${this.size}px`
    }
  },

  methods: {
    preventDefault(e) {
      // 禁止body的滚动
      console.log(e);
      e.preventDefault();
      e.stopPropagation();
    }
  },
  mounted() {
    // document.querySelector("body").addEventListener("touchmove", this.preventDefault);
  },
  destroyed() {
    // document.querySelector("body").removeEventListener("touchmove", this.preventDefault);
  }
};
</script>

<style lang="scss" scoped>
.loading-wrap {
  display: inline-block;
  .loading-ring {
    position: relative;
    width: 100%;
    height: 100%;
    .inner, .outer {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: currentColor;
      &::after {
        content: "";
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .outer {
      width: 100%;
      height: 100%;
      &::after {
        border-left: 2px solid currentColor;
        border-right: 2px solid currentColor;
        border-top: 2px solid currentColor;
        border-bottom: 2px solid transparent;
        animation: clockwise .7s infinite linear;
      }
    }

    .inner {
      &::after {
        border-top: 2px solid transparent;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        border-left: 2px solid transparent;
        animation: anticlockwise 0.7s infinite linear;
      }
    }
  }
}

@keyframes clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes anticlockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>

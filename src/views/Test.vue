<script>
export default {
  name: 'test-page',
  props:{
    title: {
      type: [Number, String],
      default:1
    }
  },
  render() {
    return (
      <div>
        <p domPropsInnerHTML={'点击修改title'}></p>
        <button OnClick={ () => this.$emit('update:title', Math.random() * Date.now()) } domPropsInnerHTML={this.title}>
        </button>
      </div>
    )
  }
}
</script>

<style lang='scss' scoped>
</style>

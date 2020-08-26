<template functional>
  <div class="red">
    {{props.data}} <span>{{children}}</span>
    <div></div>
    <slot>{{slots().default}}</slot>
    <slot name='foo'>{{slots().foo}}</slot>
  </div>
</template>
<script>

export default {
  name: "item",
}
</script>

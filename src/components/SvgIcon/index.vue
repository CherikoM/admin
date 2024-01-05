<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    prefix?: string // href属性值前缀
    name: string // svg名字
    color?: string // svg颜色
    width?: string // svg宽度
    height?: string // svg高度
  }>(),
  {
    prefix: '#icon-',
    color: '',
    width: '16px',
    height: '16px',
  },
)

console.log(props)
</script>
<style scoped></style>

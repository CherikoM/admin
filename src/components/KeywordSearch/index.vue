<template>
  <el-card>
    <el-form inline class="search-form">
      <el-form-item :label="title">
        <el-input :placeholder="`请输入${title}`" v-model="word"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="word.length <= 0 || word === modelValue"
          plain
          @click="searchByword"
        >
          搜索
        </el-button>
        <el-button :disabled="modelValue.length <= 0" plain @click="resetword">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  doSearch: Function
  modelValue: string
  title: string
}>()

const emit = defineEmits(['update:modelValue'])

// const getUserInfo = inject('getUserInfo', () => {})
// let keyword = inject('keyword', ref(''))

/**
 * 搜索框输入
 */
const word = ref('')
/**
 * 根据关键词搜索用户
 */
const searchByword = () => {
  // keyword.value = word.value
  // getUserInfo()
  emit('update:modelValue', word.value)
  props.doSearch()
}
/**
 * 清空用户关键词
 */
const resetword = () => {
  // word.value = ''
  // keyword.value = ''
  // getUserInfo()
  word.value = ''
  emit('update:modelValue', '')
  props.doSearch()
}
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  justify-content: space-between;
  // height: min-content !important;
  // align-items: center;
  :deep(.asterisk-left) {
    margin: 0;
  }
}
</style>

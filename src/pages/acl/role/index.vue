<template>
  <div>
    <KeywordSearch
      :doSearch="getRoles"
      v-model="keyword"
      title="角色名"
    ></KeywordSearch>
    <List></List>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { ElNotification } from 'element-plus'

import { reqGetRoles } from '@/api/acl/role'
import { Roles } from '@/api/acl/role/type'

import List from '@/pages/acl/role/list/index.vue'

import useAclStore from '@/store/modules/acl'
import useSettingStore from '@/store/modules/setting'

const aclStore = useAclStore()
const settingStore = useSettingStore()

onMounted(() => {
  getRoles()
})

/**
 * 数据
 */
const roles = ref<Roles>([])
/**
 * 总数据量
 */
const total = ref(0)
/**
 * 搜索关键词
 */
let keyword = ref('')
/**
 * 获取数据
 */
const getRoles = () => {
  settingStore.load(async () => {
    const result = await reqGetRoles(
      aclStore.role.pageNo,
      aclStore.role.pageSize,
      keyword.value,
    )
    console.log(result)
    if (result.code === 200) {
      roles.value = result.data.records
      total.value = result.data.total
    } else {
      ElNotification.error('获取角色数据失败')
    }
  })
}

provide('getRoles', getRoles)
provide('roles', roles)
provide('total', total)
</script>

<style lang="scss" scoped></style>

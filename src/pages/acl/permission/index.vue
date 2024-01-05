<template>
  <el-card>
    <List></List>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { ElNotification } from 'element-plus'

import { reqGetPermission } from '@/api/acl/permission'
import { Permissions } from '@/api/acl/permission/type'

import List from '@/pages/acl/permission/list/index.vue'

import useSettingStore from '@/store/modules/setting'

const settingStore = useSettingStore()

onMounted(() => {
  getPermission()
})

const permissions = ref<Permissions>([])

const getPermission = async () => {
  settingStore.load(async () => {
    const result = await reqGetPermission()
    if (result.code === 200) {
      permissions.value = result.data
    } else {
      ElNotification.error('获取菜单失败')
    }
  })
}

provide('permissions', permissions)
provide('getPermission', getPermission)
</script>

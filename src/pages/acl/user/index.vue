<template>
  <div>
    <KeywordSearch
      v-model="keyword"
      :doSearch="getUserInfo"
      title="用户名"
    ></KeywordSearch>
    <List></List>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { ElNotification } from 'element-plus'

import { reqGetUserInfo } from '@/api/acl/user'
import { UserInfos } from '@/api/acl/user/type'

import List from '@/pages/acl/user/list/index.vue'
// import Search from '@/pages/acl/user/search/index.vue'
// import Search from '@/pages/acl/user/search/index.vue'

import useAclStore from '@/store/modules/acl'
import useSettingStore from '@/store/modules/setting'

const aclStore = useAclStore()
const settingStore = useSettingStore()

onMounted(() => {
  getUserInfo()
})

/**
 * 数据
 */
const userInfo = ref<UserInfos>([])
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
const getUserInfo = () => {
  settingStore.load(async () => {
    const result = await reqGetUserInfo(
      aclStore.user.pageNo,
      aclStore.user.pageSize,
      keyword.value,
    )
    if (result.code === 200) {
      userInfo.value = result.data.records
      total.value = result.data.total
    } else {
      ElNotification.error('获取用户管理数据失败')
    }
  })
}

// provide('form', form)
// provide('addUser', addUser)
provide('getUserInfo', getUserInfo)
provide('userInfo', userInfo)
// provide('editUserVisible', editUserVisible)
provide('total', total)
provide('keyword', keyword)
</script>

<style lang="scss" scoped></style>

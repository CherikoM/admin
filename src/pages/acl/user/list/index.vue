<template>
  <div>
    <Edit v-model="editVisible"></Edit>
    <Role v-model="roleVisible" ref="roleEl"></Role>
    <el-card class="user-list">
      <el-button plain @click="() => editUser()" v-perm="'btn.User.add'">
        添加用户
      </el-button>
      <el-popconfirm
        title="确定要删除这些用户吗？"
        width="200px"
        @confirm="delMany"
        v-perm="'btn.User.remove'"
      >
        <template #reference>
          <el-button plain :disabled="selected.length <= 0">批量删除</el-button>
        </template>
      </el-popconfirm>
      <!-- 用户信息 -->
      <el-table class="table" :data="userInfo" @selection-change="selectChange">
        <el-table-column
          type="selection"
          width="60px"
          align="center"
          :selectable="canSelect"
        ></el-table-column>
        <el-table-column
          label="#"
          type="index"
          width="60px"
          align="center"
        ></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="角色"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" width="160px">
          <template #="{ row }">
            <el-button
              plain
              type="success"
              size="small"
              icon="User"
              title="分配用户角色"
              @click="assignRole(row)"
              v-perm="'btn.User.assgin'"
            ></el-button>
            <el-button
              plain
              type="warning"
              size="small"
              icon="Edit"
              title="编辑用户"
              @click="editUser(row)"
              v-perm="'btn.User.update'"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除${row.username}吗？`"
              width="200px"
              @confirm="del(row.id)"
            >
              <template #reference>
                <el-button
                  plain
                  type="danger"
                  size="small"
                  icon="Delete"
                  title="删除用户"
                  :disabled="userStore.name == row.username"
                  v-perm="'btn.User.remove'"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <ElPagination
        v-model:pageNo="aclStore.user.pageNo"
        v-model:pageSize="aclStore.user.pageSize"
        :pageSizes="[5, 7, 9]"
        :total="total"
        :pageChange="getUserInfo"
      ></ElPagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, inject } from 'vue'

import { reqDeleteUser, reqDeleteManyUser } from '@/api/acl/user'
import { UserInfo, UserInfos } from '@/api/acl/user/type'

import Edit from '@/pages/acl/user/list/edit/index.vue'
import Role from '@/pages/acl/user/list/role/index.vue'

import { ElNotification } from 'element-plus'

import useAclStore from '@/store/modules/acl'
import useUserStore from '@/store/modules/user'

const aclStore = useAclStore()
const userStore = useUserStore()

const getUserInfo = inject('getUserInfo', () => {})
const userInfo = inject('userInfo', ref([]))
const total = inject('total', ref(0))

/**
 * 编辑用户表单
 */
const form = reactive<UserInfo>({
  id: undefined,
  username: '',
  name: '',
})
/**
 * 操作类型   true:添加用户   false:更新用户
 */
const addUser = ref(false)
/**
 * 编辑用户框是否展开
 */
const editVisible = ref(false)
/**
 * 分配角色框是否展开
 */
const roleVisible = ref(false)
/**
 * 开启编辑用户
 * @param row
 */
const editUser = (row?: UserInfo) => {
  if (row) {
    addUser.value = false
    assignForm(row)
  } else {
    addUser.value = true
  }
  editVisible.value = true
}
/**
 * 开启分配用户角色
 * @param row
 */
const assignRole = (row: UserInfo) => {
  assignForm(row)
  roleVisible.value = true
}
/**
 * 填入表单
 * @param row
 */
const assignForm = (row: UserInfo) => {
  Object.assign(
    form,
    {
      id: row.id,
      username: row.username,
      name: row.name,
    },
    { password: undefined },
  )
}
/**
 * 删除一个用户
 * @param userId
 */
const del = async (userId: number) => {
  const result = await reqDeleteUser(userId)
  if (result.code === 200) {
    ElNotification.success('删除成功')
    getDataAfterDel()
  } else {
    ElNotification.error('删除失败')
  }
}
/**
 * 判断该行是否能被选择
 * @param row
 */
const canSelect = (row: UserInfo) => {
  return userStore.name != row.username
}
/**
 * 已选择项
 */
const selected = ref<UserInfos>([])
/**
 * 选择内容更换
 * @param selection
 */
const selectChange = (selection: UserInfos) => {
  selected.value = selection
}
/**
 * 删除选中项
 */
const delMany = async () => {
  if (selected.value.length === 0) {
    ElNotification.error('未知错误')
    return
  } else if (selected.value.length === 1) {
    del(selected.value[0].id as number)
    return
  }

  let success = true

  const sel: number[] = []
  for (let i = 0; i < selected.value.length; i++) {
    if (selected.value[i].username === userStore.name) {
      success = false
      break
    } else {
      sel.push(selected.value[i].id as number)
    }
  }
  if (!success) {
    ElNotification.error('未知错误')
    return
  }

  const result = await reqDeleteManyUser(sel)
  if (result.code === 200) {
    ElNotification.success('删除成功')
    getDataAfterDel()
  } else {
    ElNotification.error('删除失败')
  }
}
/**
 * 删除操作后重新获取数据
 */
const getDataAfterDel = async () => {
  userInfo.value.length <= 1 ? aclStore.user.pageNo-- : getUserInfo()
}
provide('form', form)
provide('addUser', addUser)
</script>

<style lang="scss" scoped>
.user-list {
  margin-top: var(--card-margin);

  .table {
    margin: var(--card-margin) 0;
  }
}
</style>

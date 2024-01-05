<template>
  <div>
    <Edit v-model="editVisible"></Edit>
    <Menu v-model="menuVisible" ref="roleEl"></Menu>
    <el-card class="user-list">
      <el-button plain @click="() => editRole()" v-perm="'btn.Role.add'">
        添加角色
      </el-button>
      <!-- 用户信息 -->
      <el-table class="table" :data="roles">
        <el-table-column
          label="#"
          type="index"
          width="60px"
          align="center"
          :index="getIndex(aclStore.role.pageNo, aclStore.role.pageSize)"
        ></el-table-column>
        <el-table-column label="角色名" prop="roleName"></el-table-column>
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
            <div v-show="!['超级管理员', '管理员'].includes(row.roleName)">
              <el-button
                plain
                type="success"
                size="small"
                icon="User"
                title="分配角色权限"
                @click="assignMenu(row)"
                v-perm="'btn.Role.assgin'"
              ></el-button>
              <el-button
                plain
                type="warning"
                size="small"
                icon="Edit"
                title="编辑角色"
                @click="editRole(row)"
                v-perm="'btn.Role.update'"
              ></el-button>
              <el-popconfirm
                :title="`确定要删除${row.roleName}吗？`"
                width="200px"
                @confirm="del(row.id)"
              >
                <template #reference>
                  <el-button
                    plain
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除角色"
                    v-perm="'btn.Role.remove'"
                  ></el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <ElPagination
        v-model:pageNo="aclStore.role.pageNo"
        v-model:pageSize="aclStore.role.pageSize"
        :pageSizes="[5, 7, 9]"
        :total="total"
        :pageChange="getRoles"
      ></ElPagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, inject } from 'vue'
import { ElNotification } from 'element-plus'

import { Role, Roles, EditRole } from '@/api/acl/role/type'
import { reqDeleteRole } from '@/api/acl/role'

import Edit from '@/pages/acl/role/list/edit/index.vue'
import Menu from '@/pages/acl/role/list/menu/index.vue'

import getIndex from '@/utils/getIndex.ts'

import useAclStore from '@/store/modules/acl'

const aclStore = useAclStore()

const getRoles = inject('getRoles', () => {})
const roles = inject('roles', ref<Roles>([]))
const total = inject('total', ref(0))

/**
 * 原始值
 */
const origin = ref('')
/**
 * 编辑用户表单
 */
const form = reactive<EditRole>({
  id: undefined,
  roleName: '',
})
/**
 * 操作类型   true:添加用户   false:更新用户
 */
const addRole = ref(false)
/**
 * 编辑用户框是否展开
 */
const editVisible = ref(false)
/**
 * 分配角色框是否展开
 */
const menuVisible = ref(false)
/**
 * 开启编辑角色
 * @param row
 */
const editRole = (row?: Role) => {
  if (row) {
    addRole.value = false
    assignForm(row)
    origin.value = row.roleName
  } else {
    addRole.value = true
    origin.value = ''
  }
  editVisible.value = true
}
/**
 * 开启分配角色权限菜单
 * @param row
 */
const assignMenu = (row: Role) => {
  assignForm(row)
  menuVisible.value = true
}
/**
 * 填入表单
 * @param row
 */
const assignForm = (row: Role) => {
  form.id = row.id
  form.roleName = row.roleName
}
/**
 * 删除一个角色
 * @param roleId
 */
const del = async (roleId: number) => {
  const result = await reqDeleteRole(roleId)
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
  roles.value.length <= 1 ? aclStore.role.pageNo-- : getRoles()
}

provide('form', form)
provide('addRole', addRole)
provide('origin', origin)
</script>

<style lang="scss" scoped>
.user-list {
  margin-top: var(--card-margin);

  .table {
    margin: var(--card-margin) 0;
  }
}
</style>

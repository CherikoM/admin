<template>
  <div>
    <el-table class="table" :data="permissions" row-key="id">
      <el-table-column label="菜单名" prop="name" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="操作" width="160px" align="center">
        <template #="{ row }">
          <el-button
            plain
            type="success"
            size="small"
            icon="Plus"
            v-if="row.level < 4"
            :title="`添加${row.level <= 3 ? '菜单' : '功能'}`"
            @click="startAdd(row)"
            v-perm="'btn.Permission.add'"
          ></el-button>
          <el-button
            plain
            type="warning"
            size="small"
            icon="Edit"
            title="编辑菜单"
            v-if="row.level !== 1"
            @click="startEdit(row)"
            v-perm="'btn.Permission.update'"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除${row.name}吗？`"
            width="200px"
            v-if="row.level !== 1"
            @confirm="del(row.id)"
          >
            <template #reference>
              <el-button
                plain
                type="danger"
                size="small"
                icon="Delete"
                title="删除菜单"
                v-perm="'btn.Permission.remove'"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Edit v-model="editVisible"></Edit>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject, provide } from 'vue'
import { ElNotification } from 'element-plus'

import { Permission, Permissions, MenuData } from '@/api/acl/permission/type'

import Edit from '@/pages/acl/permission/list/edit/index.vue'
import { reqDeletePermission } from '@/api/acl/permission'

const permissions = inject('permissions', ref<Permissions>([]))
const getPermission = inject('getPermission', () => {})

const editVisible = ref(false)

const form = reactive<MenuData>({
  id: undefined,
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
/**
 * 是否为添加操作  true:添加   false:更新
 */
const addMenu = ref(false)
/**
 * 被执行操作的行
 */
const active = ref<Permission>({} as Permission)
/**
 * 开始进行添加
 * @param row
 */
const startAdd = (row: Permission) => {
  Object.assign(form, {
    level: row.level + 1,
    pid: row.id,
  })
  startCore(row, true)
}
/**
 * 开始进行更新
 * @param row
 */
const startEdit = (row: Permission) => {
  Object.assign(form, {
    id: row.id,
    code: row.code,
    level: row.level,
    name: row.name,
    pid: row.pid,
  })
  startCore(row, false)
}
/**
 * 执行行操作的公共逻辑
 * @param row
 * @param add
 */
const startCore = (row: Permission, add: boolean) => {
  editVisible.value = true
  active.value = row
  addMenu.value = add
}
/**
 * 删除一个角色
 * @param roleId
 */
const del = async (roleId: number) => {
  const result = await reqDeletePermission(roleId)
  if (result.code === 200) {
    ElNotification.success('删除成功')
    getPermission()
  } else {
    ElNotification.error('删除失败')
  }
}

provide('form', form)
provide('addMenu', addMenu)
provide('active', active)
</script>

<style scoped></style>

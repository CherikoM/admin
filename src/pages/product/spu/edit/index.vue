<template>
  <div class="add">
    <el-form ref="formEl" :model="form" :rules="rule">
      <el-form-item label="名称" prop="spuName">
        <el-input placeholder="请输入名称" v-model="form.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="tmId">
        <el-autocomplete
          v-model="tmStr"
          value-key="tmName"
          label="id"
          :fetch-suggestions="querySearch"
          placeholder="请选择品牌"
          @select="trademarkSelect"
          @blur="trademarkBlur"
        />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          placeholder="请输入描述"
          v-model="form.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="spuImageList">
        <el-upload
          v-model:file-list="form.spuImageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="imgPreview"
          :on-success="imgSuccess"
          :before-upload="beforeImgUpload()"
          :on-error="onUploadImgError()"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="销售属性" prop="spuSaleAttrList">
        <el-select
          :placeholder="
            unselectAttrs.length ? `还有${unselectAttrs.length}个属性` : `无`
          "
          v-model="attrSelect"
        >
          <el-option
            :value="`${item.id}:${item.name}`"
            v-for="item in unselectAttrs"
            :key="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
        <el-button
          :disabled="!attrSelect"
          icon="Plus"
          style="margin-left: 10px"
          @click="addAttr"
        >
          添加属性值
        </el-button>
        <el-table class="table" :data="form.spuSaleAttrList">
          <el-table-column
            label="序号"
            width="60px"
            type="index"
            align="center"
            :index="getIndex"
          ></el-table-column>
          <el-table-column
            label="属性"
            width="120px"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <div>
                <el-tag
                  class="tag"
                  v-for="(item, index) in row.spuSaleAttrValueList"
                  :key="item.id"
                  closable
                  @close="row.spuSaleAttrValueList?.splice(index, 1)"
                >
                  {{ item.saleAttrValueName }}
                </el-tag>
                <el-button
                  v-show="activeAttr !== $index"
                  type="plain"
                  size="small"
                  icon="Plus"
                  @click="showAddValue($index)"
                ></el-button>
                <el-input
                  v-model.trim="addValueStr"
                  :ref="activeAttr === $index ? 'addValueEl' : ''"
                  v-show="activeAttr === $index"
                  @blur="addValue(row)"
                  @keyup.enter.native="addValue(row)"
                  size="small"
                  placeholder="请输入属性值"
                  style="width: 100px"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px" align="center">
            <template #="{ $index }">
              <el-button
                plain
                size="small"
                type="danger"
                icon="Delete"
                @click="form.spuSaleAttrList?.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form>
    <el-dialog v-model="imgDialogVisible">
      <img
        w-full
        class="img-preview"
        :src="dialogImageUrl"
        alt="Preview Image"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, inject, computed, nextTick } from 'vue'

import { reqGetSpuInfo, reqSaveOrUpdateSpu } from '@/api/product/spu'

import useProductStore from '@/store/modules/product'
import {
  ElNotification,
  FormRules,
  UploadFile,
  UploadProps,
} from 'element-plus'

import { Trademark } from '@/api/product/trademark/type'
import { SPU, SPUImages, SPUAttr, SPUAttrs } from '@/api/product/spu/type'
import { ReqFileUploadResponseData } from '@/api/type'

import { beforeImgUpload, onUploadImgError } from '@/utils/imgUpload'
import { compareObjArr } from '@/utils/compare'

const productStore = useProductStore()

onMounted(async () => {
  await productStore.getSpuAllAttrs()
})

// 依赖注入inject
// #region
const show = inject('show', ref(1))
const getSpus = inject('getSpus', () => {})
// #endregion

// 表单
// #region
/**
 * 表单元素
 */
const formEl = ref()
/**
 * 原始数据
 */
let origin: SPU
/**
 * 获取SPU详情信息
 * @param spuId
 */
const getSPUInfo = async (spuId: number) => {
  const result = await reqGetSpuInfo(spuId)
  if (result.code === 200) {
    Object.assign(form, result.data)
    form.spuImageList = (form.spuImageList as SPUImages).map((img) => {
      return {
        ...img,
        name: img.imgName,
        url: img.imgUrl,
      }
    })
    origin = JSON.parse(JSON.stringify(result.data))
  } else {
    ElNotification.error('数据获取失败')
  }
}
/**
 * 表单内容
 */
const form = reactive<SPU>({
  id: undefined,
  category3Id: productStore.spu.select[2],
  description: '',
  tmId: 0,
  spuName: '',
  spuImageList: [],
  spuPosterList: [],
  spuSaleAttrList: [],
})
/**
 * 属性校验
 */
const attrValidator = (_: any, value: SPUAttrs, callback: Function) => {
  value?.forEach((attr, index) => {
    if (!attr.spuSaleAttrValueList || attr.spuSaleAttrValueList.length <= 0) {
      activeAttr.value = index
      callback(new Error('请添加属性值'))
    }
  })
  callback()
}
/**
 * 表单校验
 */
const rule = reactive<FormRules<SPU>>({
  spuName: [{ required: true, message: '请输入SPU名称', trigger: 'blur' }],
  spuSaleAttrList: [
    { required: false, validator: attrValidator, trigger: 'blur' },
  ],
})
/**
 * 保存更改
 */
const save = async () => {
  if (!isChange()) {
    ElNotification.error('请修改内容后再提交')
  }
  await formEl.value.validate()
  const text = form.id ? '修改' : '添加'
  const result = await reqSaveOrUpdateSpu(form)
  if (result.code === 200) {
    ElNotification.success(text + '成功')
    show.value = 1
    clearForm()
    getSpus()
  } else {
    ElNotification.error(text + '失败')
  }
}

/**
 * 取消操作
 */
const cancel = () => {
  show.value = 1
  clearForm()
}
// #endregion

// 品牌
// #region
/**
 * 品牌选择框内文字
 */
const tmStr = ref('')
/**
 * 已选择的品牌选择框
 */
const tmStrSelect = ref('')
/**
 * 获取自动补全
 * @param queryString 、
 * @param cb
 */
const querySearch = async (queryString: string, cb: any) => {
  const trademarks = await productStore.getAllTrademark()

  const createFilter = (queryString: string) => {
    return (trademark: Trademark) => {
      return (
        trademark.tmName.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
      )
    }
  }

  const results = queryString
    ? trademarks.filter(createFilter(queryString))
    : trademarks
  cb(results)
}
/**
 * 选择品牌
 * @param item
 */
const trademarkSelect = (item: Trademark) => {
  tmStrSelect.value = item.tmName
  form.tmId = item.id as number
}
/**
 * 焦点移开品牌选择框
 */
const trademarkBlur = () => {
  tmStr.value = tmStrSelect.value
}
// #endregion

// 图片
// #region
/**
 * 图片预览框
 */
const imgDialogVisible = ref(false)
/**
 * 图片预览框内图片
 */
const dialogImageUrl = ref('')
/**
 * 预览图片
 * @param uploadFile
 */
const imgPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  imgDialogVisible.value = true
}
/**
 * 图片上传成功
 * @param response
 * @param uploadFile
 */
const imgSuccess = (
  response: ReqFileUploadResponseData,
  uploadFile: UploadFile,
) => {
  if (response.code === 200) {
    if (form.spuImageList) {
      form.spuImageList[form.spuImageList.length - 1].imgName = uploadFile.name
      form.spuImageList[form.spuImageList.length - 1].imgUrl = response.data
    } else {
      ElNotification.error(response.data)
    }
  }
}
// #endregion

// 属性
// #region
/**
 * 属性选择框内容
 */
const attrSelect = ref('')
/**
 * 未选择的属性
 */
const unselectAttrs = computed(() => {
  const allAttrs = productStore.spu.allSPUAttr
  return allAttrs.filter((attr) => {
    return form.spuSaleAttrList?.every((a) => {
      return a.saleAttrName !== attr.name
    })
  })
})
/**
 * 属性值添加框元素
 */
const addValueEl = ref()
/**
 * 属性值添加框内容
 */
const addValueStr = ref('')
/**
 * 显示的属性值添加框
 */
const activeAttr = ref(-1)
/**
 * 添加属性
 */
const addAttr = () => {
  const [id, saleAttrName] = attrSelect.value.split(':')
  const baseSaleAttrId = Number(id)
  form.spuSaleAttrList?.push({
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  })
  attrSelect.value = ''
}
/**
 * 显示属性值添加框
 * @param index
 */
const showAddValue = async (index: number) => {
  activeAttr.value = index
  await nextTick()
  addValueEl.value?.focus()
}
/**
 * 添加属性值
 * @param index
 */
const addValue = (row: SPUAttr) => {
  if (addValueStr.value && form.spuSaleAttrList) {
    // const attrs = form.spuSaleAttrList[index]
    const test = row.spuSaleAttrValueList.every((value) => {
      return value.saleAttrValueName !== addValueStr.value
    })
    if (test) {
      row.spuSaleAttrValueList.push({
        saleAttrValueName: addValueStr.value,
        baseSaleAttrId: row.baseSaleAttrId,
      })
    } else {
      ElNotification.error('请勿重复属性值')
      addValueEl.value.focus()
    }
  }
  addValueStr.value = ''
  activeAttr.value = -1
}
// #endregion

// 工具
// #region
/**
 * 获取列表项确切序号
 * @param index 该项在数据列表内的坐标
 */
const getIndex = (index: number) => {
  return (
    (productStore.trademark.pageNo - 1) * productStore.trademark.pageSize +
    index +
    1
  )
}
/**
 * 清空表单
 */
const clearForm = () => {
  Object.assign(form, {
    id: undefined,
    category3Id: 0,
    description: '',
    tmId: 0,
    spuName: '',
    spuImageList: [],
    spuPosterList: [],
    spuSaleAttrList: [],
  })
  tmStrSelect.value = ''
  attrSelect.value = ''
  formEl.value.clearValidate()
}

/**
 * 判断表单是否有变化
 */
const isChange = () => {
  if (!form.id) {
    return (
      form.description !== '' ||
      form.tmId !== 0 ||
      form.spuName !== '' ||
      !form.spuImageList ||
      form.spuImageList.length > 0 ||
      !form.spuSaleAttrList ||
      form.spuSaleAttrList.length > 0
    )
  } else {
    const attrValueChange = () => {
      const length = (form.spuSaleAttrList as SPUAttrs).length
      for (let i = 0; i < length; i++) {
        const formValue = (form.spuSaleAttrList as SPUAttrs)[i]
          ?.spuSaleAttrValueList
        const originValue = (origin.spuSaleAttrList as SPUAttrs)[i]
          ?.spuSaleAttrValueList
        if (Array.isArray(formValue) && Array.isArray(originValue)) {
          if (!compareObjArr(formValue, originValue, 'saleAttrValueName'))
            return true
        } else if (!formValue && !originValue) return false
        else return true
      }
      return false
    }

    return (
      form.description !== origin.description ||
      form.tmId !== origin.tmId ||
      form.spuName !== origin.spuName ||
      !compareObjArr(
        form.spuImageList as SPUImages,
        origin.spuImageList as SPUImages,
        ['imgName', 'imgUrl'],
      ) ||
      !compareObjArr(
        form.spuSaleAttrList as SPUAttrs,
        origin.spuSaleAttrList as SPUAttrs,
        'id',
      ) ||
      attrValueChange()
    )
  }
}
// #endregion

/**
 * 导出
 */
defineExpose({
  getSPUInfo,
})
</script>

<style lang="scss" scoped>
.img-preview {
  width: 100%;
  height: 100%;
}

:deep(.tag) {
  margin: 0 5px;
}

:deep(.el-form-item__label) {
  width: var(--form-label-width);
}
</style>

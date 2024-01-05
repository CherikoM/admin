<template>
  <div>
    <el-card class="card">
      <el-pagination
        v-model:current-page="productStore.sku.pageNo"
        v-model:page-size="productStore.sku.pageSize"
        :page-sizes="[10, 20, 30]"
        :small="true"
        layout="total, sizes, ->, prev, pager, next, jumper"
        :total="total"
      />
      <el-table class="table" :data="skus">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="60px"
        ></el-table-column>
        <el-table-column
          label="名称"
          show-overflow-tooltip
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          show-overflow-tooltip
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="图片" width="130px" align="center">
          <template #="{ row, $index }">
            <ElImg
              :src="row.skuDefaultImg || ''"
              width="100px"
              height="100px"
              :preview-src-list="imgList"
              :initial-index="$index"
              :hide-on-click-modal="true"
              :preview-teleported="true"
            ></ElImg>
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="80px"
          align="center"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="80px"
          align="center"
          prop="price"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="160px"
          align="center"
          fixed="right"
        >
          <template #="{ row }">
            <div>
              <el-button
                plain
                size="small"
                :type="row.isSale ? 'info' : 'primary'"
                :icon="row.isSale ? 'Bottom' : 'Top'"
                :title="`${row.isSale ? '下架' : '上架'}'SKU`"
                @click="changeSale(row)"
                v-perm="'btn.Sku.updown'"
              ></el-button>
              <el-button
                plain
                size="small"
                type="success"
                icon="View"
                title="SKU信息"
                @click="showSKUInfo(row)"
                v-perm="'btn.Sku.detail'"
              ></el-button>
              <el-popconfirm
                :title="`确定要删除${row.skuName}吗？`"
                width="200px"
                @confirm="deleteSKU(row)"
              >
                <template #reference>
                  <el-button
                    plain
                    size="small"
                    type="danger"
                    icon="Delete"
                    title="删除SKU"
                    v-perm="'btn.Sku.remove'"
                  ></el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="productStore.sku.pageNo"
        v-model:page-size="productStore.sku.pageSize"
        :page-sizes="[10, 20, 30]"
        :small="true"
        layout="total, sizes, ->, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="SKU详情"
      width="70%"
      :gutter="10"
      @close="dialogClose"
    >
      <div v-loading="dialogLoading">
        <el-row :gutter="15">
          <el-col :span="4">名称</el-col>
          <el-col :span="20">{{ dialogSKU.skuName }}</el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="4">描述</el-col>
          <el-col :span="20">{{ dialogSKU.skuDesc }}</el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="4">价格</el-col>
          <el-col :span="20">{{ dialogSKU.price }}</el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="4">平台属性</el-col>
          <el-col :span="20">
            <el-tag
              class="tag"
              v-for="attr in dialogSKU.skuAttrValueList"
              :key="attr.id"
            >
              {{ attr.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="4">销售属性</el-col>
          <el-col :span="20">
            <el-tag
              class="tag"
              v-for="attr in dialogSKU.skuSaleAttrValueList"
              :key="attr.id"
              type="success"
            >
              {{ attr.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="4">商品图片</el-col>
          <el-col :span="20">
            <div>
              <el-carousel
                :interval="4000"
                type="card"
                indicator-position="outside"
              >
                <el-carousel-item
                  v-for="img in dialogSKU.skuImageList"
                  :key="img.id"
                >
                  <div class="carousel-content">
                    <img :src="img.imgUrl" />
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

import useProductStore from '@/store/modules/product'
import useSettingStore from '@/store/modules/setting'

import {
  reqGetSku,
  reqSaleOrUnsale,
  reqGetSkuInfo,
  reqDeleteSku,
} from '@/api/product/sku'
import type { SKU, SKUs } from '@/api/product/sku/type'

const productStore = useProductStore()
const settingStore = useSettingStore()

const skus = ref<SKUs>([])
const total = ref(0)

const dialogVisible = ref(false)
const dialogLoading = ref(false)
const dialogSKU = ref<SKU>({} as SKU)

const imgList = computed(() => {
  return skus.value.map((sku) => sku.skuDefaultImg)
})

onMounted(() => {
  getSKU()
})

/**
 * 获取SKU数据
 */
const getSKU = async () => {
  settingStore.load(async () => {
    const result = await reqGetSku(
      productStore.sku.pageNo,
      productStore.sku.pageSize,
    )
    if (result.code === 200) {
      skus.value = result.data.records
      total.value = result.data.total
    } else {
      ElNotification.error('获取SKU失败，请稍后重试')
    }
  })
}

/**
 * 监听分页变化
 */
watch(() => [productStore.sku.pageNo, productStore.sku.pageSize], getSKU)

/**
 * 上/下架SKU
 * @param row
 */
const changeSale = async (row: SKU) => {
  const result = await reqSaleOrUnsale(row)
  if (result.code === 200) {
    ElNotification.success(`${row.isSale ? '下' : '上'}架SKU成功`)
    row.isSale = row.isSale ? 0 : 1
  } else {
    ElNotification.error(`${row.isSale ? '下' : '上'}架SKU失败`)
  }
}
/**
 * 展示SKU详情
 * @param row
 */
const showSKUInfo = async (row: SKU) => {
  dialogVisible.value = true
  const result = await reqGetSkuInfo(row.id as number)
  if (result.code === 200) {
    dialogSKU.value = result.data
  } else {
    ElNotification.error('获取SKU详情失败')
  }
}
/**
 * 关闭SKU详情对话框
 */
const dialogClose = () => {
  dialogSKU.value = {} as SKU
}
/**
 * 删除SKU
 * @param row
 */
const deleteSKU = async (row: SKU) => {
  const result = await reqDeleteSku(row.id as number)
  if (result.code === 200) {
    ElNotification.success('删除成功')
    skus.value.length <= 1 ? productStore.sku.pageNo-- : await getSKU()
  } else {
    ElNotification.error('删除失败')
  }
}
</script>

<style lang="scss" scoped>
.table {
  @include table-margin();
}

.el-row {
  margin-bottom: 15px;
  line-height: 1.2em;
}
.el-row:last-child {
  margin-bottom: 0;
}

.tag {
  margin-left: 5px;
  margin-bottom: 5px;
}

:deep(.el-carousel__container) {
  height: 20vw;

  .el-carousel__item {
    .carousel-content {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 70%;
        height: 70%;
      }
    }
  }
}
</style>

<template>
  <div class="block">
    <div class="header">
      <div class="title">
        <div class="title-words">
          {{ title }}
        </div>
        <img src="@/pages/screen/images/dataScreen-title.png" />
      </div>
      <div class="decoration">
        <div class="subtitle">
          <slot name="subtitle"></slot>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.block {
  height: calc(100% - 20px);
  padding: 10px 20px;
  display: flex;
  flex-direction: column;

  .header {
    height: 60px;
    display: flex;

    .title {
      width: 40%;
      .title-words {
        margin-top: 4px;
        font-size: 24px;
        color: white;
      }

      img {
        width: 80px;
        height: 10px;
        margin-top: 15px;
        // transform: scaleX(2);
      }
    }

    .decoration {
      width: 60%;
      height: 0;
      border-bottom: 80px solid rgb(15, 23, 81);
      border-left: 80px solid transparent;

      .subtitle {
        width: 100%;
        height: 80px;
      }
    }
  }

  .content {
    background-color: rgb(15, 23, 81);
    border-top: 1px solid rgb(43, 63, 111);
    flex: 1;
    display: flex;
    .content-inner {
      flex: 1;
      // height: 100%;
      display: flex;
      flex-direction: column;
      margin: 10px;
    }
  }
}
</style>

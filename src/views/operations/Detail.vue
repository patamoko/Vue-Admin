<template>
  <div>
    <div class="detail-title">订单详情：{{ orderNo }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const orderNo = route.params.orderNo as string;
</script>

<style scoped lang="less">
.detail-title {
  font-size: 18px;
  font-weight: bold;
  padding: 20px;
}
</style>

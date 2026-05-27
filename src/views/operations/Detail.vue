<template>
    <div class="detail-page">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>订单详情</span>
                    <el-button @click="goBack" size="small">返回</el-button>
                </div>
            </template>

            <div class="empty-state">
                <el-empty description="暂无订单数据" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
</script>

<style scoped>
.detail-page {
    padding: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.empty-state {
    padding: 40px 0;
}
</style>
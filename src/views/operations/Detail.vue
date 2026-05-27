<template>
    <div class="detail-page">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>订单详情</span>
                    <el-button @click="goBack" size="small">返回</el-button>
                </div>
            </template>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form label-width="120px">
                        <el-form-item label="订单编号">
                            <span>{{ orderData.orderNo }}</span>
                        </el-form-item>
                        <el-form-item label="设备编号">
                            <span>{{ orderData.equipmentNo }}</span>
                        </el-form-item>
                        <el-form-item label="订单日期">
                            <span>{{ orderData.date }}</span>
                        </el-form-item>
                        <el-form-item label="开始时间">
                            <span>{{ orderData.startTime }}</span>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <span>{{ orderData.endTime }}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-form label-width="120px">
                        <el-form-item label="订单金额">
                            <span>{{ orderData.money }} 元</span>
                        </el-form-item>
                        <el-form-item label="支付方式">
                            <span>{{ getPayMethod(orderData.pay) }}</span>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <el-tag :type="getStatusType(orderData.status)">
                                {{ getStatusText(orderData.status) }}
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="充电站名称">
                            <span>{{ orderData.stationName }}</span>
                        </el-form-item>
                        <el-form-item label="用户ID">
                            <span>{{ orderData.userId }}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

            <div class="mt-20">
                <h3>订单明细</h3>
                <el-table :data="orderData.details" border style="width: 100%">
                    <el-table-column prop="name" label="项目名称" />
                    <el-table-column prop="quantity" label="数量" />
                    <el-table-column prop="price" label="单价" />
                    <el-table-column prop="amount" label="金额" />
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface OrderDetail {
    name: string;
    quantity: number;
    price: number;
    amount: number;
}

interface OrderData {
    orderNo: string;
    equipmentNo: string;
    date: string;
    startTime: string;
    endTime: string;
    money: number;
    pay: number;
    status: number;
    stationName: string;
    userId: string;
    details: OrderDetail[];
}

const route = useRoute();
const router = useRouter();
const orderData = ref<OrderData>({} as OrderData);

const goBack = () => {
    router.back();
};

const getPayMethod = (payType: number): string => {
    const payMethods = ['微信支付', '支付宝', '银行卡', '会员卡'];
    return payMethods[payType - 1] || '未知';
};

const getStatusText = (status: number): string => {
    const statusTexts = ['已完成', '进行中', '已取消', '待支付'];
    return statusTexts[status - 1] || '未知';
};

const getStatusType = (status: number): string => {
    const statusTypes = ['success', 'warning', 'danger', 'info'];
    return statusTypes[status - 1] || 'info';
};

const fetchOrderDetail = async () => {
    // 这里可以替换为真实的API请求
    const orderNo = route.params.orderNo as string;
    console.log('获取订单详情:', orderNo);

    // 模拟数据
    orderData.value = {
        orderNo: orderNo,
        equipmentNo: 'CD1001',
        date: '2024-05-27',
        startTime: '10:30:00',
        endTime: '11:45:00',
        money: 125.50,
        pay: 1,
        status: 1,
        stationName: '北京朝阳充电站',
        userId: 'U20240527001',
        details: [
            { name: '电费', quantity: 1, price: 100.00, amount: 100.00 },
            { name: '服务费', quantity: 1, price: 20.00, amount: 20.00 },
            { name: '停车费', quantity: 1, price: 5.50, amount: 5.50 }
        ]
    };
};

onMounted(() => {
    fetchOrderDetail();
});
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

.mt-20 {
    margin-top: 20px;
}

h3 {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bold;
}
</style>
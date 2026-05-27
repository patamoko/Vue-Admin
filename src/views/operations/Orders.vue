<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input v-model="search.orderNo" placeholder="请输入订单号" />
                </el-col>
                <el-col :span="6">
                    <el-select placeholder="订单状态" v-model="search.status">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option label="已完成" :value="1"></el-option>
                        <el-option label="进行中" :value="2"></el-option>
                        <el-option label="已取消" :value="3"></el-option>
                        <el-option label="待支付" :value="4"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="search.no" placeholder="设备编号" />
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mt">
                <el-col :span="6">
                    <el-input v-model="search.name" placeholder="请输入站点名称" />
                </el-col>
                <el-col :span="6">
                    <el-date-picker v-model="search.startDate" type="daterange" value-format="yyyy-MM-dd"
                        range-separator="/" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChange" />
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-button type="danger" :disabled="!selectedList.length" @click="handleDelete">批量删除</el-button>
            <el-button type="primary" icon="Download" :disabled="!selectedList.length">导出订单到Excel</el-button>
        </el-card>
        <el-card class="mt">
            <el-table :data="dataList" style="width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" />
                <el-table-column label="订单编号" prop="orderNo"></el-table-column>
                <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
                <el-table-column label="订单日期" prop="date"></el-table-column>
                <el-table-column label="开始时间" prop="startTime"></el-table-column>
                <el-table-column label="结束时间" prop="endTime"></el-table-column>
                <el-table-column label="订单金额" prop="money"></el-table-column>
                <el-table-column label="支付方式" prop="pay"></el-table-column>
                <el-table-column label="订单状态" prop="status">
                    <template #default="scope">
                        <el-tag type="primary" v-if="scope.row.status == 1">已完成</el-tag>
                        <el-tag type="success" v-else-if="scope.row.status == 2">进行中</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.status == 3">已取消</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.status == 4">待支付</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleDetail(scope.row)">详情</el-button>
                        <el-button type="danger" size="small" @click="handle(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pageInfo.page" :page-size="pageInfo.pageSize" :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper" :total="totals" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" class="fr mt" type="primary" background />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router"
import { useHttp } from '@/hooks/useHttp';
import { useTabsStore } from '@/store/tabs';
import { currentListApi } from "@/api/chargingstation"
import { batchDeleteApi } from "@/api/operation"
import { ElMessage } from 'element-plus';
interface SearchType {
    orderNo: string;
    status: number;
    no: string;
    name: string;
    startDate: string;
    endDate: string;
}
interface SearchListType {
    orderNo: string;
    equipmentNo: string;
    date: string;
    startTime: string;
    endTime: string;
    money: string;
    pay: string;
    status: number;
}
const date = ref([]);
const search = ref<SearchType>({
    orderNo: '',
    status: 0,
    no: '',
    name: '',
    startDate: '',
    endDate: '',
});
const handleChange = (val: string[]) => {
    search.value.startDate = val[0];
    search.value.endDate = val[1];
}
const handleReset = () => {
    date.value = []
    search.value = {
        orderNo: '',
        status: 0,
        no: '',
        name: '',
        startDate: '',
        endDate: '',
    }
    resetPagination()
}
const selectedList = ref<SearchListType[]>([])
const handleSelectionChange = (val: SearchListType[]) => {
    selectedList.value = val
}
const handleDelete = async () => {
    try {
        const res = await batchDeleteApi(selectedList.value.map(item => item.orderNo));
        if (res.code) {
            ElMessage({
                message: res.data,
                type: "success",
            });
            loadData();
        }
    } catch (error) {
        ElMessage({
            message: "删除失败",
            type: "error",
        });
    }
}
const router = useRouter();
const tabsStore = useTabsStore();

const handleDetail = (row: SearchListType) => {
    console.log(row);
    const url = `/operations/detail/${row.orderNo}`;
    const tabName = `订单详情-${row.orderNo}`;

    // 添加到标签页
    tabsStore.addTab(tabName, url, 'Document');

    // 跳转到详情页面
    router.push(url);
}
const handle = async (row: SearchListType) => {
    try {
        const res = await batchDeleteApi([row.orderNo]);
        if (res.code) {
            ElMessage({
                message: res.data,
                type: "success",
            });
            loadData();
        }
    } catch (error) {
        ElMessage({
            message: "删除失败",
            type: "error",
        });
    }
}
const { dataList,
    loading,
    totals,
    pageInfo,
    loadData,
    handleSizeChange,
    handleCurrentChange,
    resetPagination } = useHttp<SearchListType>("/orderList", search.value)
</script>

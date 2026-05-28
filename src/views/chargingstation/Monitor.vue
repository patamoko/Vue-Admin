<template>
    <div class="monitor-page">
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入站点名称或ID" v-model="fromParams.input">
                        <template #append>
                            <el-select v-model="select" style="width: 115px">
                                <el-option label="按名称查询" value="name" />
                                <el-option label="按ID查询" value="id" />
                            </el-select>
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="fromParams.value" placeholder="充电站状态">
                        <el-option label="全部" :value="1" />
                        <el-option label="使用中" :value="2" />
                        <el-option label="空闲中" :value="3" />
                        <el-option label="维护中" :value="4" />
                        <el-option label="待维修" :value="5" />
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-statistic title="累计充电量" value="26900" />
                </el-col>
                <el-col :span="6">
                    <el-statistic title="累计充电次数" value="1369" />
                </el-col>
                <el-col :span="6">
                    <el-statistic title="服务区域" value="342" />
                </el-col>
                <el-col :span="6">
                    <el-statistic title="累计收益" value="526372" />
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-button type="primary" icon="plus" @click="handleAdd">新增充电站</el-button>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column prop="name" label="站点名称" width="180" />
                <el-table-column prop="city" label="所属城市" />
                <el-table-column prop="fast" label="快充数" />
                <el-table-column prop="slow" label="慢充数" />
                <el-table-column prop="status" label="充电站状态">
                    <template #default="scope">
                        <el-tag type="primary" v-if="scope.row.status == 2">使用中</el-tag>
                        <el-tag type="success" v-else-if="scope.row.status == 3">空闲中</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.status == 4">维护中</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.status == 5">待维修</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="now" label="正在充电" />
                <el-table-column prop="fault" label="故障数" />
                <el-table-column prop="person" label="站点负责人" />
                <el-table-column prop="tel" label="负责人电话" />
                <el-table-column prop="operation" label="操作" width="180">
                    <template #default="scope">
                        <div style="display: flex; gap: 8px">
                            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-popconfirm title="确定要删除这个站点吗？" @confirm="handleDelete(scope.row)"
                                confirm-button-text="确定" cancel-button-text="取消">
                                <template #reference>
                                    <el-button type="danger" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pageinfo.page" :page-size="pageinfo.pageSize" :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper" :total="totals" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" class="fr mt" type="primary" background />
        </el-card>
        <station-form :dialog-visible="dialogVisible" @close="dialogVisible = false" @confirm="loadData"></station-form>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { listApi, deleteApi } from "@/api/chargingstation";
import { ElMessage } from "element-plus";
import StationForm from "@/components/StationForm/stationForm.vue";
import type { RowType } from "@/types/station";

// 移除store依赖，改为本地状态管理
const select = ref("name");
const fromParams = reactive({
    input: "",
    value: 1,
});
const pageinfo = reactive({
    page: 1,
    pageSize: 10,
});
const totals = ref(0);
const tableData = ref([]);
const loading = ref<boolean>(false);
const dialogVisible = ref<boolean>(false);
const currentRow = ref<Partial<RowType>>({
    name: "",
    id: "",
    city: "",
    fast: "",
    slow: "",
    status: 1,
    now: "",
    fault: "",
    person: "",
    tel: "",
});
const loadData = async () => {
    loading.value = true;
    const {
        data: { total, list },
    } = await listApi({
        ...pageinfo,
        status: fromParams.value,
        [select.value]: fromParams.input,
    });
    loading.value = false;
    tableData.value = list;
    totals.value = total;
};
const handleSizeChange = (val: number) => {
    pageinfo.pageSize = val;
    loadData();
};
const handleCurrentChange = (val: number) => {
    pageinfo.page = val;
    loadData();
};
const handleReset = () => {
    fromParams.input = "";
    fromParams.value = 1;
    pageinfo.pageSize = 10;
    loadData();
};
const handleEdit = (row: RowType) => {//点击编辑按钮
    Object.assign(currentRow.value, row);
    dialogVisible.value = true;
};
const handleDelete = async (row: RowType) => {
    try {
        const res = await deleteApi(row);
        if (res.code === 200) {
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
};
const handleAdd = () => {
    Object.assign(currentRow.value, {
        name: "",
        id: "",
        city: "",
        fast: 0,
        slow: 0,
        status: 1,
        now: 0,
        fault: 0,
        person: "",
        tel: "",
    });
    dialogVisible.value = true;
};
onMounted(() => {
    loadData();
});
</script>

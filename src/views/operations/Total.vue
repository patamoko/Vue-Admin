<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <el-input v-model="searchText" placeholder="请输入关键词" style="width: 80%;">
                        <template #append>
                            <el-button icon="Search"></el-button>
                        </template>
                    </el-input>
                    <el-tree 
                    ref="treeRef"
                    :data="treeData"
                    :props="defaultProps" 
                    style="height: 600px; "
                    show-checkbox
                    :filter-node-method="filterNode"
                    />
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <template #header>
                        <div class="text">
                            <h3>{{title}}计费模版</h3>
                        </div>
                    </template>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="auto">
                        <el-form-item label="模版名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入计费模版名称" style="max-width: 200px;"/>
                        </el-form-item>
                        <el-form-item label="时间区间">
                            <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
                                <el-time-picker placeholder="选择开始时间" style="flex: 1;"/>
                                <span>--</span>
                                <el-time-picker placeholder="选择结束时间" style="flex: 1;"/>
                                <span style="white-space: nowrap; padding-left: 12px;">电费</span>
                                <el-input placeholder="请输入电费" style="flex: 1;"/>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="mb">添加时间区间</el-button>
                        </el-form-item>
                        <el-form-item label="服务费" prop="service">
                            <el-input v-model="ruleForm.service" placeholder="请输入服务费" style="max-width: 200px;"/>
                        </el-form-item>
                        <el-form-item label="停车费" prop="perking">
                            <el-input v-model="ruleForm.perking" placeholder="请输入停车费" style="max-width: 200px;"/>
                        </el-form-item>
                        <el-form-item label="备注" prop="remarks">
                            <el-input v-model="ruleForm.remarks" placeholder="请输入备注" type="textarea"/>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { cityListApi } from "@/api/operation";
import { watch } from "vue";
import { ElTree } from "element-plus";
import { FormInstance, FormRules } from "element-plus";

const searchText = ref<string>("");
interface TreeNodeType {
    label: string;
    children?: TreeNodeType[];
}
interface RuleFormType {
    name: string;
    service: string;
    perking: string;
    remarks: string;
    data: {
        data1: string;
        data2: string;
        electricity: string;
    }[];
}
const treeData = ref<TreeNodeType[]>([]);
const defaultProps = {
    children: 'children',
    label: 'label',
};
const filterNode:any = (value: string, data: TreeNodeType) => {
    console.log(value, data)
    if(!value){
        return true
    }
    return data.label.includes(value);
};
const treeRef = ref<InstanceType<typeof ElTree>>();
watch(searchText, (val) => {
    treeRef.value!.filter(val)
})
onMounted(async () => {
    try {
        const { data } = await cityListApi()
        // 直接使用后端返回的data数据
        treeData.value = data
    } catch (error) {
        console.error("获取数据失败:", error);
        treeData.value = [];
    }
});
const title = ref<string>("");
const ruleFormRef= ref<FormInstance>();
const rules = reactive<FormRules<RuleFormType>>({
    name: [
        { required: true, message: '请输入计费模版', trigger: 'blur' },
    ],
});
const ruleForm = ref<RuleFormType>({
    name: "",
    service: "",
    perking: "",
    remarks: "",
    data: [
        {
            data1: "",
            data2: "",
            electricity: "",
        }
    ],
});
</script>
<style scoped>
.el-card :deep(.el-card__body) {
    padding-left: 16px;
}
.el-form {
    text-align: left;
}
</style>

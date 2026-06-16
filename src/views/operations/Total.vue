<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-card>
                    <el-input v-model="searchText" placeholder="请输入关键词" style="width: 80%;">
                        <template #append>
                            <el-button icon="Search"></el-button>
                        </template>
                    </el-input>
                    <el-tree :data="treeData" :props="defaultProps" style="height: 600px;" />
                </el-card>
            </el-col>
            <el-col :span="18">

            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { cityListApi } from "@/api/operation";
const searchText = ref("");
interface CityType {
    label: string;
    children?: CityType[];
}
const treeData = ref<CityType[]>([]);
const defaultProps = {
    children: 'children',
    label: 'label',
};
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

</script>

<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <map-contain></map-contain>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="mb">
                <div>1.累计充电站数量：<el-text type="primary">34个</el-text></div><div>2.单省份最多充电桩：<el-text type="primary">北京（4个）</el-text></div><div>3.充电站遍及省份：<el-text type="primary">14个</el-text></div><div>4.暂无充电站省份：<el-text type="primary">22个</el-text></div><div>5.累计充电站：<el-text type="primary">北京（4个）</el-text></div><div>6.单日营收最高：<el-text type="primary">北京西单充电站</el-text></div><div>7.单日营收最低：<el-text type="primary">南宁青秀山充电站</el-text></div><div>8.故障率最高：<el-text type="primary">兰州黄河桥充电站</el-text></div>
            </el-card>
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h3>新增站点地图</h3>
                    </div>
                </template>
                <el-form v-model="form" style="max-width: 600px; label-width: 85px; ">
                    <el-form-item label="站点名称" prop="name">
                        <el-input  v-model="form.name" placeholder="请输入充电站名称"/>
                    </el-form-item>
                    <el-form-item label="站点地址" prop="address">
                        <el-input v-model="form.address" placeholder="请输入充电站地址" />
                    </el-form-item>
                    <el-form-item label="经度" prop="longitude">
                        <el-input v-model="form.longitude" placeholder="请输入经度" />
                    </el-form-item>
                    <el-form-item label="纬度" prop="latitude">
                        <el-input v-model="form.latitude" placeholder="请输入纬度" />   
                    </el-form-item>
                    <el-form-item label="立即使用" prop="use">
                        <el-switch v-model="form.use" placeholder="立即使用" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark" placeholder="请输入备注" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">创建</el-button>
                        <el-button>清空</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import MapContain from "@/components/map/MapContain.vue";
import { reactive } from "vue";
const form = reactive({
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    use: false,
    remark: "",
});
</script>

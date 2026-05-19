<template>
    <el-dialog
    :model-value="dialogVisible"
    :title="title"
    >
    <el-form label-width="120px" :rules="rules" :model="ruleForm">
            <el-row>
            <el-col :span="12">
                <el-form-item label="站点名称:" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="站点ID:" prop="id">
                    <el-input v-model="ruleForm.id" :disabled="disabled"/>
                </el-form-item>
                <el-form-item label="所属城市：" prop="city">
                    <el-input v-model="ruleForm.city"/>
                </el-form-item>
                <el-form-item label="站点负责人：" prop="person">
                    <el-input v-model="ruleForm.person"/>
                </el-form-item>
                <el-form-item label="负责人电话：" prop="tel">
                    <el-input v-model="ruleForm.tel"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="快充数：" prop="fast">
                    <el-input v-model="ruleForm.fast"/>
                </el-form-item>
                <el-form-item label="慢充数：" prop="slow">
                    <el-input v-model="ruleForm.slow"/>
                </el-form-item>
                <el-form-item label="充电站状态：" prop="status" >
                    <el-select placeholder="充电站状态" v-model="ruleForm.status" :disabled="disabled">
                        <el-option label="全部" :value="1"></el-option>
                        <el-option label="使用中" :value="2"></el-option>
                        <el-option label="空闲中" :value="3"></el-option>
                        <el-option label="维护中" :value="4"></el-option>
                        <el-option label="待维修" :value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="正在充电：" prop="now" >
                    <el-input v-model="ruleForm.now" :disabled="disabled"/>
                </el-form-item>
                <el-form-item label="故障数：" prop="fault">
                    <el-input v-model="ruleForm.fault" :disabled="disabled"/>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive,watch } from "vue"
import { FormRules } from "element-plus"
import type{RowType} from "@/types/station"
import type { FormInstance } from "element-plus"
import {useStationStore}  from "@/store/station"
import {storeToRefs} from "pinia"
const stationStore=useStationStore()
const {rowData}=storeToRefs(stationStore)
const props=defineProps({
    dialogVisible:{
        type:Boolean,
        required:true
    }
})
const disabled=ref<boolean>(false)
const title=ref<string>("")
const emit=defineEmits(["close","confirm"])
const handleCancel=()=>{
    emit("close")
}
const handleConfirm=()=>{
}
const ruleForm = ref<RowType>({
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
})
const rules = reactive<FormRules<RowType>>({
    name: [{ required: true, message: '请输入站点名称', trigger: 'blur' }],
    id: [{ required: true, message: '请输入站点ID', trigger: 'blur' }],
    city: [{ required: true, message: '请输入所属城市', trigger: 'blur' }],
    person: [{ required: true, message: '请输入站点负责人', trigger: 'blur' }],
    tel: [{ required: true, message: '请输入负责人电话', trigger: 'blur' }],
    fast: [{ required: true, message: '请输入快充数', trigger: 'blur' }],
    slow: [{ required: true, message: '请输入慢充数', trigger: 'blur' }],
    status: [{ required: true, message: '请选择充电站状态', trigger: 'change' }],
    now: [{ required: true, message: '请输入正在充电', trigger: 'blur' }],
    fault: [{ required: true, message: '请输入故障数', trigger: 'blur' }],
})
watch(()=>props.dialogVisible , () => {
    if(props.dialogVisible){
        ruleForm.value = rowData.value
        disabled.value=true;
    }
})
</script>

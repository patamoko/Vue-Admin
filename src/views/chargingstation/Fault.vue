<template>
    <div>
        <el-card>
            <el-select placeholder="请选择站点名称" style="width: 300px" v-model="value" filterable>
                <el-option v-for="item in options" :key="item.id" :value="item.name" />
            </el-select>
        </el-card>
        <el-card class="mt">
            <el-radio-group size="large" v-model="radio" @change="handleChange">
                <el-radio-button :label="`全部 (${allCount})`" :value="0" />
                <el-radio-button :label="`空闲中 (${checkCount(1)})`" :value="1" />
                <el-radio-button :label="`充电中 (${checkCount(2)})`" :value="2" />
                <el-radio-button :label="`连接中 (${checkCount(3)})`" :value="3" />
                <el-radio-button :label="`排队中 (${checkCount(4)})`" :value="4" />
                <el-radio-button :label="`已预约 (${checkCount(5)})`" :value="5" />
                <el-radio-button :label="`故障/离线 (${checkCount(6)})`" :value="6" />
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in filterList" :key="item.id">
                    <div class="item">
                        <div class="pic">
                            <p>{{ item.status === 1 ? '空闲中' : item.status === 2 ? '充电中' : item.status === 3 ? '连接中' : item.status === 4 ? '排队中' : item.status === 5 ? '已预约' : item.status === 6 ? '故障/离线' : '未知' }}</p>
                            <img :src="item.status === 1 ? flash : (item.status === 6) ? outline : ing" alt="">
                            <p v-if="item.status === 2">{{ item.percent }}%</p>
                            <p v-else>0%</p>
                        </div>
                        <div class="info">
                            <h3>
                                {{ item.id }}
                            </h3>
                            <hr class="mb">
                            <p>电压：{{ item.voltage }}v</p>
                            <p>电流：{{ item.current }}A</p>
                            <p>功率：{{ item.power }}KW</p>
                            <p>温度：{{ item.tem }}°c</p>
                        </div>
                    </div>
                    <div class="btn">
                        <div class="divder"></div>
                        <div>
                            <p class="fl ml" style="font-size: 12px;color: #999;">{{ item.warning }}</p>
                            <div style="text-align: right;" class="fr">
                                <el-button size="small">维保记录</el-button>
                                <el-button type="primary" size="small" class="mr">使用记录</el-button>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { currentListApi } from "@/api/chargingstation"
import {watch} from "vue"
import flash from "@/assets/flash.png"
import outline from "@/assets/outline.png"
import ing from "@/assets/ing.png"
const options = ref([])
const value = ref<string>("")
const dataList = ref<any>([])
const radio = ref<number>(0)
const filterList = ref<any>([])
const allCount = computed(() => {
    return checkCount(1) + checkCount(2) + checkCount(3) + checkCount(4) + checkCount(5) + checkCount(6)
})
function checkCount(num: number) {
    return dataList.value.filter((item: any) => item.status === num).length
}
const loadData = async () => {
    const { data } = await currentListApi()
    options.value = data
    dataList.value = data[0].list
    filterList.value = data[0].list
}
const handleChange = () => {
    filterList.value = dataList.value
    if(radio.value!=0){
        filterList.value = dataList.value.filter((item: any) => item.status === radio.value)
    }
}
watch(value, () => {
    const res =  options.value.filter((item: any) => item.name===value.value)
    filterList.value = res[0].list
    dataList.value = res[0].list
})
onMounted(() => {
    loadData()
})
</script>
<style lang="less" scoped>
.item {
    justify-content: center;
    background-color: rgb(247, 251, 254);
    height: 200px;
    border-radius: 10px 10px 0 0;
    padding: 20px;
    display: flex;
    align-items: center;
    margin-top: 20px;

    .pic {
        p {
            width: 76px;
            text-align: center;
            margin-bottom: 10px;
            color: rgb(61, 187, 146);
        }
    }

    .info {
        color: #999;
        margin-left: 30px;
        line-height: 26px;
        margin-top: -10px;
    }
}

.btn {
    background-color: #f7fbfe;
    width: 100%;
    height: 50px;
    line-height: 50px;

}

.divder {
    background-color: #f4f4f4;
    height: 2px;
    width: 95%;
    margin: auto;
}

.record {

    height: 60px;
    line-height: 60px;
    text-align: center;

    box-sizing: border-box;
}
</style>

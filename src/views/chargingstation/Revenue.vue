<template>
      <div class="revenue-page">   
         <el-row :gutter="20" class="mb-   20">
               <el-col       :span="4  ">
                <div        class="sta   t-card">
                    <div class     ="stat-tit     le">今日总收入(元)</div>
                    <div    v class="s      tat-number">12,239,824</div>
                                <div clas       s="stat-change        positive">
                                    <el-icon        icon>
                                             <TrendCh     arts />   
                                 </el-icon>
                                21%
                              </div>
                </div>
                    </el-co  l>
            <el-col :span="4">
                          <div class="stat-card">
                                <div class          ="stat-title">    本月总收入(万元)</div>
                                <div  class="stat           -numb      er">2,924<    /div>
                                 <div v class="st    at-cha  nge positive">
                                <el-icon>
                                      <TrendCharts />
                                  </el-icon>
                                21%
                      </div>
                       </div>
                             </el-col>
              <el-col        :span="4">     
                   <div cl         ass="        stat-card"  >
                            <div   div cl   ass="stat-t itle">     会员卡储值金额(元)</div>
                            <div class="sta    t-number">      239,824</div>
                    <div c   lass="stat       -change positive">
                         <el-i         con>
                            <T        rendCharts /    >
                                      </el-icon>
                                    21%     
                                     </div>
                        </di v>
                 <   /el-co   l>
            <el-      col :spa  n="4">
                <div      div class=    "stat-card">
                    <div cl     ass="stat-     title">服务费总金额(元)</div>
                       <div        class="stat-number">16,824</div>
                                <div        class="stat-c       hange negative"> 
                                          <el-icon>
                                             <T      rendChar   ts />   
                              </el-icon>
                                4%
                              </div>
                </div>
                   <   /el-col>
            <el-col :span="4">     
                     <div class="stat-card">
                                <div class="stat-tit              le">停车费总金额(元)</div   v>
                                     <div class="    stat-     number">9,     687</div    >
                              <div class   ="st at-change neg   ativ e">
                              <el-icon  >
                                            <TrendCharts />
                                    </el-icon>
                                      4%
                    </div            iv>
                          </div>
                      </el-col>
            <el-col   :span="4">
                          <div class="stat-card">
                    <div        class="sta   t-title"      >电度总金额(元  )</div>
                           <div    class="sta  t-nu  mber">223,674</div>
                          <div class="stat-change positive">
                                <el-icon>
                            <TrendCharts />
                                </el-icon>
                             21%   
                    </div>
                      </div>  
            </el-col>
        </el-row>

              <  el-row>
            <el-col :span="24">
                        <el-card>
                     <template #he      ader>
                          <div class="card-header       ">
                               <span>营     收趋势分析</span>       
                        </div>
              emplate>
  <el-tag                 <div class="chart-container">
         <div id= style="width: 10height: 220px"{{>/div>
                         </el-card>
           /<el-row>
        <elcar }}d ass="mt">
        <el-table :data=          "list" style="width: 10        0%" v-loading="loading">
                        <el-table-column type="index" label="序号" width=        "80" />
                <el-table-column label="充电站名称" prop=        "name" />
                <el-table-column label="充电站ID" pro        p="id" />
                <el-table-column label="所属城市" pr      op="city" />
                    <el-t  able-column label="充电桩总量" prop="count" />
                <el-table-column label="单日总收入"  prop="day" />
                <el-table-column label="月度总收入" prop="month">
                    <template #default="scope">
                        <span>{{ scope.row.month }}</span>
                        <el-tag :type="scope.row.mpercent > 0 ? 'success' : 'danger'" class="ml">
                            {{ scope.row.mpercent > 0 ? "+" + scope.row.mpercent + "%" :scope.row.mpercent +"%" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="电费营收" prop="electricity" />
                <el-table-column label="停车费营收" prop="parkingFee" />
                <el-table-column label="服务费营收" prop="serviceFee" />
                <el-table-column label="会员卡储值金额" prop="member" />
            </el-table>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { TrendCharts } from "@element-plus/icons-vue";
import { revenueChartApi, revenueListApi } from "@/api/chargingstation";
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
    initChart();
    window.addEventListener("resize", handleResize);
    loadData(); // 页面加载时获取数据
});
const list = ref([]);
const loading = ref<boolean>(false);
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    if (chartInstance) {
        chartInstance.dispose();
    }
});
const initChart = () => {
    const chartDom = document.getElementById("revenueChart");
    if (!chartDom) return;

    chartInstance = echarts.init(chartDom);

    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
            formatter: (params: any) => {
                let result = params[0].axisValue + "<br/>";
                params.forEach((item: any) => {
                    result += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
                });
                return result;
            },
        },
        legend: {
            data: ["金额", "订单量"],
            top: 0,
            right: 0,
            textStyle: {
                fontSize: 11,
            },
        },
        grid: {
            left: "1%",
            right: "1%",
            bottom: "5%",
            top: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
                axisLine: {
                    lineStyle: {
                        color: "#ccc",
                    },
                },
                axisLabel: {
                    fontSize: 10,
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "金额(万元)",
                nameTextStyle: {
                    fontSize: 11,
                },
                position: "left",
                axisLine: {
                    lineStyle: {
                        color: "#5470c6",
                    },
                },
                axisLabel: {
                    formatter: "{value}",
                    fontSize: 10,
                },
                splitLine: {
                    lineStyle: {
                        color: "#f0f0f0",
                    },
                },
            },
            {
                type: "value",
                name: "订单量",
                nameTextStyle: {
                    fontSize: 11,
                },
                position: "right",
                axisLine: {
                    lineStyle: {
                        color: "#91cc75",
                    },
                },
                axisLabel: {
                    formatter: "{value}",
                    fontSize: 10,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        series: [
            {
                name: "订单量",
                type: "line",
                yAxisIndex: 1,
                data: [120, 90, 150, 180, 200, 130, 170],
                smooth: true,
                symbol: "circle",
                symbolSize: 6,
                itemStyle: {
                    color: "#5470c6",
                },
                lineStyle: {
                    width: 2,
                    color: "#5470c6",
                },
            },
            {
                name: "金额",
                type: "bar",
                yAxisIndex: 0,
                data: [80, 60, 120, 150, 180, 100, 160],
                itemStyle: {
                    color: "#5470c6",
                      borderRadius: [4, 4, 0, 0],
                  },
            },
        ]  ,
    };

    chartIn  stance.setOption (o ption);
};
const ha  ndleResize = () =>   {
    if (chartInstance) {
        chartI ns tance.resize();
    }
};
  const loadData = async () => {
    load  ing.value =     true;
        // 获取营收列表数据
          const {
            d at a: { total, list:   fetchedList },
          } = await revenueListApi({
              page: 1,
              pageSize: 10,
              name:  "" ,
        });
        console.log("营收列表数据:", total, fetchedList);
        list.value = fetchedList;
        loading.value = false;
</script>
<style lang="les  s" s  coped>
.revenue-pa    ge {
    padding: 20px;
}  

. mb -20 {
    mar  gin-  bottom: 20px;
}    

.stat-card {
    background: white;
    padding:     20px;
    border-  radi  us: 8px;
    color:  #3 33;
    box-shadow: 0 2  px 8px rgba(0, 0, 0, 0  .08);
    border:  1p x solid #e8e8e8;
    transition: transfor  m 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
}

.stat-title {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
}

.stat-number {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.stat-change {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;

    &.positive {
        color: #67c23a;
        background-color: rgba(103, 194, 58, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
    }

    &.negative {
        color: #f56c6c;
        background-color: rgba(245, 108, 108, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
    }
}

.card-header {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.chart-container {
    padding: 5px 0;
}
</style>

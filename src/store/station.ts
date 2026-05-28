import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type { RowType } from "@/types/station";

export const useStationStore = defineStore("station", () => {
    // 充电站列表数据
    const stationList = ref<RowType[]>([]);
    
    // 分页信息
    const pageInfo = reactive({
        page: 1,
        pageSize: 10,
        total: 0
    });
    
    // 筛选条件
    const filters = reactive({
        input: "",
        value: 1,
        select: "name"
    });
    
    // 更新充电站列表
    const updateStationList = (data: RowType[], total: number) => {
        stationList.value = data;
        pageInfo.total = total;
    };
    
    // 更新分页信息
    const updatePageInfo = (page: number, pageSize: number) => {
        pageInfo.page = page;
        pageInfo.pageSize = pageSize;
    };
    
    // 更新筛选条件
    const updateFilters = (newFilters: Partial<typeof filters>) => {
        Object.assign(filters, newFilters);
    };
    
    // 重置筛选条件
    const resetFilters = () => {
        filters.input = "";
        filters.value = 1;
        filters.select = "name";
        pageInfo.page = 1;
    };
    
    return {
        stationList,
        pageInfo,
        filters,
        updateStationList,
        updatePageInfo,
        updateFilters,
        resetFilters
    };
});
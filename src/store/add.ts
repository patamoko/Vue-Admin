import { defineStore } from 'pinia'
import { ref } from "vue"

// 通用行数据类型（支持充电站和订单数据）
interface RowType {
    // 充电站字段
    name?: string
    id?: string
    city?: string
    fast?: string | number
    slow?: string | number
    status?: number
    now?: string | number
    fault?: string | number
    person?: string
    tel?: string

    // 订单字段
    orderNo?: string
    equipmentNo?: string
    date?: string
    startTime?: string
    endTime?: string
    money?: string
    pay?: string
}

export const useAddStore = defineStore("add", () => {
    const rowData = ref<RowType>({
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
        orderNo: "",
        equipmentNo: "",
        date: "",
        startTime: "",
        endTime: "",
        money: "",
        pay: ""
    });

    const setRowData = (row: Partial<RowType>) => {
        Object.assign(rowData.value, row);
    }

    return {
        rowData, setRowData
    }
})

import {post} from "@/utils/http";
import {get} from "@/utils/http";
import {RowType}from"@/types/station";
interface ListType{
    page:number,
    pageSize:number,
    name?:string,
    id?:string,
    status?:number
}
enum Api{
    List="/stationList",
    Edit="/station/edit",
    Delete="/station/delete",
    revenueChart="/revenueChart"
}

function listApi(data:ListType){
    return post(Api.List,data)
}
function editApi(data:RowType){
    return post(Api.Edit,data)
}
function deleteApi(data:RowType){
    return post(Api.Delete,data)
}
function revenueChartApi(data:RowType){
    return get(Api.revenueChart,data)
}
export {listApi,editApi,deleteApi,revenueChartApi}

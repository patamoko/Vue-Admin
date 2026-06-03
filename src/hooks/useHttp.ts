import {onMounted, reactive, ref,unref} from "vue"
import {post} from "@/utils/http"
//自定义hooks
export function useHttp<T>(url:string,initialParams:any){
    const dataList=ref<T[]>([]); //用来存表格的
    const loading=ref<boolean>(false);//用来控制loading的显示
    const totals=ref<number>(0);//用来存总条数
    const pageInfo=reactive({//用来存分页信息
        page:1,
        pageSize:10
    })
    const loadData=async ()=>{
        loading.value=true;
        try{
            const {data:{list,total}}=await post(url,{...unref(initialParams),...pageInfo})
            dataList.value=list;
            totals.value=total;
        }catch(error){
            console.log(error)
        } finally{
            loading.value=false
        }
    }
    onMounted(()=>{
        loadData()
    })

    const handleSizeChange=(size:number)=>{
        pageInfo.pageSize=size;
        loadData()
    }
    const handleCurrentChange=(page:number)=>{
        pageInfo.page=page;
        loadData()
    }
    const resetPagination=()=>{
        pageInfo.page=1;
        pageInfo.pageSize=10;
        loadData()
    }
    return {
        dataList,
        loading,
        totals,
        pageInfo,
        loadData,
        handleSizeChange,
        handleCurrentChange,
        resetPagination
    }

}
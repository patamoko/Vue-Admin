import { reactive} from "vue";
export function usePagination( loadData:()=>Promise<any>,initalPageSize=10){
    const total=ref(0)
    const pageInfo=reactive({
        page:1,
        pageSize:initalPageSize
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
        pageInfo.pageSize=initalPageSize;
        loadData()
    }
    
    return {
        pageInfo,
        handleSizeChange,
        handleCurrentChange,
        resetPagination
    }
}

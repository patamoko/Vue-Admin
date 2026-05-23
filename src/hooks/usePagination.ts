import { ref, reactive, onMounted } from 'vue';

interface PageInfo {
    page: number;
    pageSize: number;
}

type FetchDataFunction<T> = (page: number, pageSize: number) => Promise<{
    total: number;
    list: T[];
}>;

export function usePagination<T = any>(fetchData: FetchDataFunction<T>) {
    const pageInfo = reactive<PageInfo>({
        page: 1,
        pageSize: 10
    });
    
    const total = ref(0);
    const list = ref<T[]>([]);
    const loading = ref(false);
    
    const loadData = async () => {
        loading.value = true;
        try {
            const result = await fetchData(pageInfo.page, pageInfo.pageSize);
            list.value = result.list;
            total.value = result.total;
        } catch (error) {
            console.error('加载数据失败:', error);
        } finally {
            loading.value = false;
        }
    };
    
    const handleSizeChange = (val: number) => {
        pageInfo.pageSize = val;
        pageInfo.page = 1;
        loadData();
    };
    
    const handleCurrentChange = (val: number) => {
        pageInfo.page = val;
        loadData();
    };
    
    const resetPagination = () => {
        pageInfo.page = 1;
        pageInfo.pageSize = 10;
        loadData();
    };
    
    return {
        pageInfo,
        total,
        list,
        loading,
        loadData,
        handleSizeChange,
        handleCurrentChange,
        resetPagination
    };
}

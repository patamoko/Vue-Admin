import router from "./index";
import { useUserStore } from "@/store/auth";
router.beforeEach((to)=>{
    const userStore=useUserStore();
    const isLogin=userStore.token;
    
    // 公共页面，不需要登录
    if (to.path === '/login' || to.path === '/test') {
        return true;
    }
    
    if(!isLogin){
        //未登录，跳转到登录页面
        return {path:"/login"};
    }else{
        //已登录
        if(to.path==="/login"){
            //如果已登录访问登录页面，跳转到首页
            return {path:"/"};
        }
        if(to.meta?.needAuth&& !userStore.roles.some((role:string)=>(to.meta.needAuth as string[]).includes(role)) ){
            //没有权限，跳转到首页
            return {path:"/"};
        }
    }
    
    // 所有条件都满足，允许访问
    return true;
})

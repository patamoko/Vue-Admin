<template>
    <div class="test-page">
        <h1>测试页面</h1>
        <p>这是一个测试页面，用于排查页面不显示的问题</p>
        <el-button type="primary" @click="goToLogin">跳转到登录页面</el-button>
        <el-button type="success" @click="goToHome">跳转到首页</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goToLogin = () => {
    router.push('/login')
}

const goToHome = () => {
    router.push('/')
}
</script>

<style scoped>
.test-page {
    padding: 50px;
    text-align: center;
}
h1 {
    color: #409eff;
}
p {
    color: #666;
    margin: 20px 0;
}
.el-button {
    margin: 0 10px;
}
</style>
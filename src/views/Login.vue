<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src="logo" alt="" width="70px" height="70px" />
                <h1 class="ml">动力港能源管理平台</h1>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="Lock" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="footer-badge">
                <img :src="fable5Badge" alt="Fable5 Badge" class="badge-img" />
                <p class="badge-text">Claude Code Fable5</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import logo from "../assets/logo.png";
import fable5Badge from "../assets/fable5-badge.png";
import { reactive, ref } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { useUserStore } from "@/store/auth";
import { useRouter } from "vue-router";
interface RuleForm {
    username: string;
    password: string;
}
const ruleForm: RuleForm = reactive({
    username: "",
    password: "",
});
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        { min: 4, max: 8, message: "用户名要求4-8位数字字母组合", trigger: "blur" },
    ],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});
const formRef = ref<FormInstance>();
const userStore = useUserStore();
const router = useRouter();
const handleLogin = () => {
    formRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            await userStore.login(ruleForm);
            router.push("/");
        }
    });
};
</script>

<style lang="less" scoped>
.bg {
    background-image: url("../assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .login {
        width: 500px;
        padding: 50px;
        background-color: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        border-radius: 8px;

        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 40px;

            h1 {
                color: rgb(14, 53, 148);
            }
        }
    }
}

.footer-badge {
    margin-top: 30px;
    text-align: center;

    .badge-img {
        max-width: 200px;
        height: auto;
    }

    .badge-text {
        margin-top: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        text-decoration: underline;
    }
}
</style>
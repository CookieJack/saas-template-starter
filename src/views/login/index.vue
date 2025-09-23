<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h1 class="login-title">{{ $t('common.login') }}</h1>
                <p class="login-subtitle">{{ $t('common.welcome') }}</p>
            </div>
            <n-form ref="formRef" :model="form" :rules="rules" size="large">
                <n-form-item path="username">
                    <n-input v-model:value="form.username" :placeholder="$t('common.username')" clearable>
                        <template #prefix>
                            <n-icon :component="UserOutlined" />
                        </template>
                    </n-input>
                </n-form-item>
                <n-form-item path="password">
                    <n-input v-model:value="form.password" type="password" :placeholder="$t('common.password')"
                        show-password-on="click" clearable>
                        <template #prefix>
                            <n-icon :component="LockOutlined" />
                        </template>
                    </n-input>
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" size="large" :loading="loading" :disabled="loading" @click="handleLogin"
                        block>
                        {{ $t('common.login') }}
                    </n-button>
                </n-form-item>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from "vue-router"
import Cookies from "js-cookie"
import { PersonOutline as UserOutlined, KeyOutline as LockOutlined } from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()
const formRef = ref()
const loading = ref(false)

const form = reactive({
    username: 'admin',
    password: '123456'
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

const handleLogin = () => {
    formRef.value?.validate((errors: any) => {
        if (!errors) {
            loading.value = true
            // 模拟登录请求
            setTimeout(() => {
                Cookies.set("token", "123456", { expires: 7 })
                router.push({ path: route.query.redirect as string || "/", replace: true })
                loading.value = false
            }, 1000)
        }
    })
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/src/assets/images/login-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.login-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
}

.login-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
}

.login-header {
    text-align: center;
    margin-bottom: 32px;
}

.login-title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
}

.login-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
}

:deep(.n-input) {
    border-radius: 8px;
}

:deep(.n-button) {
    border-radius: 8px;
    font-weight: 500;
}
</style>
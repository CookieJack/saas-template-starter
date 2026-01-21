<template>
    <n-card title="测试">
        <n-space vertical>
            <n-button type="primary" size="small" @click="handleClick">测试按钮</n-button>
        </n-space>
    </n-card>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui"

const message = useMessage()

const handleClick = () => {
    message.success('测试按钮点击成功')
}
</script>
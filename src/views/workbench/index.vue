<template>
    <n-card :title="$t('home.workbench')" hoverable :segmented="{ content: true, footer: 'soft' }">
    </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const testParagraphList = ref<string[]>([])

onMounted(() => {
    //在testParagraphList批量生成10个段落
    for (let i = 0; i < 50; i++) {
        testParagraphList.value.push('时间是一条无声流淌的河，它从不为谁停下脚步，也不曾因谁的哀求而倒流。我们每个人都是这条河中的一叶扁舟，顺流而下，无法回头。小时候，总觉得时间是用不完的，夏天漫长得像永远不会结束，寒假仿佛可以装下整个童年。可当我们终于长大，才发现时间原来是最吝啬的东西，它不会给你预告，也不会给你重来的机会。你以为只是错过了一个黄昏，其实可能错过了一生。')
    }
})
</script>

<style scoped>
.mb-4 {
    margin-bottom: 16px;
}

.mt-8 {
    margin-top: 32px;
}

.custom-item {
    display: flex;
    align-items: center;
    gap: 16px;
}

.custom-content {
    flex: 1;
}

.custom-title {
    font-weight: bold;
    margin-bottom: 4px;
}

.custom-subtitle {
    font-size: 14px;
    color: #666;
}

/* Direction Up Item */
.direction-up-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.item-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #409eff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.item-content {
    flex: 1;
}

/* Direction Down Item */
.direction-down-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.item-title {
    font-weight: bold;
    font-size: 16px;
}

.item-description {
    font-size: 14px;
    color: #666;
}

/* Direction Left Item */
.direction-left-item {
    display: flex;
    align-items: center;
}

/* Direction Right Item */
.direction-right-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.item-icon {
    font-size: 20px;
}

.item-text {
    flex: 1;
}
</style>
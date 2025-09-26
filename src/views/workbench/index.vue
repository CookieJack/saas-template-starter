<template>
    <n-card :title="$t('home.workbench')">
        <p v-for="(paragraph, index) in testParagraphList" :key="index">
            {{ paragraph }}
        </p>
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

<style scoped></style>
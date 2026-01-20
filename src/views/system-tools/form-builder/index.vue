<template>
    <n-card :title="t('fb.builder')">
        <VueForm v-model="formData" :schema="schema" :ui-schema="uiSchema" />
    </n-card>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import VueForm from "@lljj/vue3-form-naive"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const formData = reactive({
    name: "",
    age: 0
})

const schema = {
    type: "object",
    title: "用户信息表单",
    required: ["name", "age"],
    description: "请填写用户的姓名和年龄",
    properties: {
        name: {
            type: "string",
            title: "姓名"
        },
        age: {
            type: "number",
            title: "年龄"
        }
    }
}

const uiSchema = {
    name: {
        "ui:widget": "InputWidget"
    },
    age: {
        "ui:widget": "InputWidget"
    }
}
</script>

<style scoped></style>
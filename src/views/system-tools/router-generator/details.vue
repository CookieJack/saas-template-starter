<template>
    <n-card :title="t('routerGen.details')" hoverable :segmented="{ content: true, footer: 'soft' }">
        <template #header-extra>
            <n-button type="primary" size="small" @click="router.back()">{{ t('common.close') }}</n-button>
        </template>
        <n-form :model="form" ref="formRef" :rules="rules" label-placement="left" :label-width="110" size="large">
            <n-form-item label="上级菜单" path="parentName">
                <n-input-group>
                    <n-tag type="primary" size="large">{{ pName }}</n-tag>
                    <n-cascader v-model:value="form.parentName" :options="vaildRoutes" placeholder="请选择上级菜单"
                        label-field="name" value-field="name" :render-label="handleRenderLabel" cascade size="medium"
                        @update:value="handleUpdateParentName" clearable />
                </n-input-group>
            </n-form-item>
            <n-form-item label="菜单名称" path="meta.title">
                <n-input v-model:value="form.meta.title" placeholder="请输入菜单名称(国际化)" clearable>
                    <template #prefix>
                        <n-tag type="primary">{{ t(form.meta.title) || '请输入菜单名称' }}</n-tag>
                    </template>
                </n-input>
            </n-form-item>
            <n-form-item label="路由名称" path="name">
                <n-input v-model:value="form.name" placeholder="请输入路由名称" clearable></n-input>
            </n-form-item>
            <n-form-item label="组件路径" path="path">
                <n-input v-model:value="form.path" placeholder="请输入路由路径" clearable>
                    <template #prefix>@/views{{ prefixRoutePath }}</template>
                    <template #suffix>.vue</template>
                </n-input>
            </n-form-item>
            <n-form-item label="隐藏" path="hidden">
                <n-checkbox v-model:checked="form.meta.hidden"></n-checkbox>
            </n-form-item>
            <n-form-item label="固定" path="isAffix">
                <n-checkbox v-model:checked="form.meta.isAffix"></n-checkbox>
            </n-form-item>
        </n-form>
        <template #footer>
            <n-space justify="end">
                <n-button type="primary" size="small" @click="handleConfirm">{{ t('common.confirm') }}</n-button>
            </n-space>
        </template>
    </n-card>
</template>

<script setup lang="ts">
import { ref, computed, reactive, h } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import type { RouteRaw } from "@/router"
import { NEl, useMessage, type CascaderOption, type FormInst } from "naive-ui"

interface FormRouteRaw extends RouteRaw {
    parentName: string | null
}

const { t } = useI18n()
const router = useRouter()
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const pName = ref('请选择上级菜单')
const prefixRoutePath = ref('')
const form = reactive<FormRouteRaw>({
    parentName: null,
    path: '',
    name: '',
    component: null,
    meta: {
        title: '',
        icon: null,
        isAffix: false,
        hidden: false
    }
})

const vaildRoutes = computed(() => router.getRoutes().filter((item) => !!item.children && item.children.length > 0))

const rules = {
    parentName: [{ required: true, message: '请选择上级菜单', trigger: ['blur', 'change'] }],
    'meta.title': [{ required: true, message: '请输入菜单名称(国际化)', trigger: ['blur'] }],
    name: [{ required: true, message: '请输入路由名称', trigger: ['blur'] }],
    path: [{ required: true, message: '请输入路由路径', trigger: ['blur'] }]
}

const handleRenderLabel = (option: CascaderOption, checked: boolean) => {
    //@ts-ignore
    return h(NEl, { tag: 'span', style: { fontSize: '16px' } }, () => t(option.meta.title) || '未知菜单')
}

const handleUpdateParentName = (value: string | number | Array<string | number> | null, option: CascaderOption | Array<CascaderOption | null> | null, pathValues: Array<CascaderOption | null> | Array<CascaderOption[] | null> | null) => {
    form.parentName = value as string
    //@ts-ignore
    const cmpPath = pathValues?.map(option => option?.path).filter(Boolean).join('/')
    if (cmpPath) {
        prefixRoutePath.value = cmpPath
        form.component = () => import(`@/views${cmpPath}${form.path}.vue`)
    }
    const parentRoute = router.getRoutes().find(route => route.name === value)
    if (parentRoute) {
        pName.value = typeof parentRoute.meta.title === 'string' ? t(parentRoute.meta.title) : '未知菜单'
    } else {
        pName.value = '请选择上级菜单'
    }
}

const handleConfirm = () => {
    formRef.value?.validate(errors => {
        if (!errors) {
            //读取本地工程目录下的views目录下的所有vue文件
            const views = import.meta.glob('@/views/**/*.vue')
            console.log(views[`/src/views${prefixRoutePath.value}${form.path}.vue`])
            //判断form.path是否存在views目录下的vue文件
            if (views[`/src/views${prefixRoutePath.value}${form.path}.vue`]) {
                router.addRoute(form.parentName as string, {
                    path: `${prefixRoutePath.value}${form.path}`,
                    name: form.name,
                    component: form.component,
                    meta: form.meta
                })
                message.success('路由生成成功')
                router.back()
            } else {
                message.error('路由路径不存在')
            }
        } else {
            message.error('请填写完整信息')
        }
    })
}
</script>
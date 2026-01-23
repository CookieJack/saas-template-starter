<template>
    <n-card title="交错动画列表" hoverable :segmented="{ content: true, footer: 'soft' }">
        <n-tabs type="line">
            <n-tab-pane name="up" tab="从下方进入 (默认)">
                <BlindsList :items="listItems" :content-style="{ width: '100%', margin: '0 auto', padding: '20px' }"
                    :item-style="{ background: '#f5f5f5', borderRadius: '8px', padding: '16px', marginBottom: '12px' }">
                    <template #default="{ item }">
                        <div class="direction-up-item">
                            <div class="item-number">{{ item.sort }}</div>
                            <div class="item-content">{{ item.content }}</div>
                        </div>
                    </template>
                </BlindsList>
            </n-tab-pane>
            <n-tab-pane name="down" tab="从上方进入">
                <BlindsList :items="listItems" direction="down"
                    :content-style="{ width: '100%', margin: '0 auto', padding: '20px' }"
                    :item-style="{ background: '#e8f4f8', borderRadius: '8px', padding: '16px', marginBottom: '12px' }">
                    <template #default="{ item }">
                        <div class="direction-down-item">
                            <div class="item-title">{{ item.content }}</div>
                            <div class="item-description">Direction: Down</div>
                        </div>
                    </template>
                </BlindsList>
            </n-tab-pane>
            <n-tab-pane name="left" tab="从右侧进入">
                <BlindsList :items="listItems" direction="left"
                    :content-style="{ width: '100%', margin: '0 auto', padding: '20px' }"
                    :item-style="{ background: '#f8e8f4', borderRadius: '8px', padding: '16px', marginBottom: '12px' }">
                    <template #default="{ item }">
                        <div class="direction-left-item">
                            <n-tag type="success">{{ item.sort }}</n-tag>
                            <span style="margin-left: 12px;">{{ item.content }}</span>
                        </div>
                    </template>
                </BlindsList>
            </n-tab-pane>
            <n-tab-pane name="right" tab="从左侧进入">
                <BlindsList :items="listItems" direction="right"
                    :content-style="{ width: '100%', margin: '0 auto', padding: '20px' }"
                    :item-style="{ background: '#f8f4e8', borderRadius: '8px', padding: '16px', marginBottom: '12px' }">
                    <template #default="{ item }">
                        <div class="direction-right-item">
                            <div class="item-icon">📌</div>
                            <div class="item-text">{{ item.content }}</div>
                        </div>
                    </template>
                </BlindsList>
            </n-tab-pane>
            <n-tab-pane name="custom" tab="自定义内容 (插槽)">
                <BlindsList :items="listItems" :content-style="{ width: '100%', margin: '0 auto', padding: '20px' }"
                    :item-style="{ background: '#f5f5f5', borderRadius: '8px', padding: '16px', marginBottom: '12px' }">
                    <template #default="{ item }">
                        <div class="custom-item">
                            <n-avatar :size="40" :round="true"
                                :src="`https://neeko-copilot.bytedance.net/api/text2image?prompt=avatar%20for%20user%20${item.sort}&size=128x128`" />
                            <div class="custom-content">
                                <div class="custom-title">{{ item.content }}</div>
                                <div class="custom-subtitle">Custom content for {{ item.content }}</div>
                            </div>
                        </div>
                    </template>
                </BlindsList>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface ListItem {
    sort: number;
    content: string;
}

const listItems = ref<ListItem[]>([
    { sort: 1, content: 'Item 1' },
    { sort: 2, content: 'Item 2' },
    { sort: 3, content: 'Item 3' },
    { sort: 4, content: 'Item 4' },
    { sort: 5, content: 'Item 5' }
])
</script>

<style scoped></style>
<template>
  <div :style="{
    backgroundImage: `url(${props.modelValue.content?.backImage || ''})`
  }" class="advantage-gallery-container">
    <p v-if="props.modelValue.title" class="advantage-gallery-title">{{ props.modelValue.title }}</p>
    <p v-if="props.modelValue.subtitle" class="advantage-gallery-subtitle">{{ props.modelValue.subtitle }}</p>
    <div class="advantage-gallery-content">
      <div class="advantage-gallery-content-item" v-for="card in props.modelValue.elements" :key="card.sort"
        @click="() => router.push(card.content?.link || '#')">
        <img :src="card.content?.image || DefaultFallBack" alt="" srcset="">
        <span v-if="card.title" class="advantage-gallery-content-item-title">{{ card.title }}</span>
      </div>
    </div>
    <div class="advantage-gallery-footer" v-if="props.modelValue.content?.isFooterBtnsShow">
      <button :style="{
        backgroundColor: btn.style?.backgroundColor || 'transparent',
        color: btn.style?.color || '#333333'
      }" v-for="btn in props.modelValue.content?.footerBtns || []" :key="btn.text"
        @click="() => router.push(btn.link || '#')">{{ btn.text }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { vbindPx } from "@/utils"
import DefaultFallBack from "@/assets/images/login-bg.jpg"
import type { GENERALComponentConfig } from "@/types/components"

const props = defineProps({
  modelValue: {
    type: Object as () => GENERALComponentConfig,
    required: true,
    default: () => ({})
  }
})

const router = useRouter()
</script>

<style scoped>
.advantage-gallery-container {
  padding: 70px 260px;
  background-color: v-bind('props.modelValue.style.color?.backgroundColor || "#74AA15"');

  display: flex;
  flex-flow: column nowrap;


  .advantage-gallery-title {
    color: v-bind('props.modelValue.style.color?.mainTitleColor || "#FFFFFF"');
    font-size: v-bind('vbindPx(props.modelValue.style.size?.mainTitleSize || 35)');
    font-weight: v-bind('props.modelValue.style.weight?.mainTitleWeight || 700');
    text-align: v-bind('props.modelValue.style.position?.mainTitlePosition || "left"');
    line-height: 1.6;
  }

  .advantage-gallery-subtitle {
    color: v-bind('props.modelValue.style.color?.subTitleColor || "#FFFFFF"');
    font-size: v-bind('vbindPx(props.modelValue.style.size?.subTitleSize || 20)');
    font-weight: v-bind('props.modelValue.style.weight?.subTitleWeight || 500');
    text-align: v-bind('props.modelValue.style.position?.subTitlePosition || "left"');
    line-height: 1.6;

    margin-bottom: 30px;
  }

  .advantage-gallery-content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .advantage-gallery-content-item {
      position: relative;
      cursor: pointer;

      img {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        object-fit: fill;
      }

      .advantage-gallery-content-item-title {
        position: absolute;
        bottom: 15px;
        left: 15px;
        right: 15px;
        color: v-bind('props.modelValue.style.color?.contentItemTitleColor || "#FFFFFF"');
        font-size: v-bind('vbindPx(props.modelValue.style.size?.contentItemTitleSize || 16)');
        font-weight: v-bind('props.modelValue.style.weight?.contentItemTitleWeight || 600');
        text-align: v-bind('props.modelValue.style.position?.contentItemTitlePosition || "center"');
        background-color: rgba(54, 54, 54, 0.7);
        padding: 15px 20px;
        border-radius: 8px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
      }
    }
  }

  .advantage-gallery-footer {
    margin-top: 30px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: v-bind('props.modelValue.style.position?.footerBtnsPosition || "flex-end"');
    align-items: center;
    gap: 20px;

    button {
      padding: 10px 20px;
      border-radius: 50px;
      color: #FFFFFF;

      &::after {
        content: '>';
        margin-left: 10px;
      }
    }
  }
}
</style>
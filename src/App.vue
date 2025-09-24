<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="settingsStore.getNaiveUILocale"
    :date-locale="settingsStore.getNaiveUIDateLocale">
    <n-message-provider>
      <n-dialog-provider>
        <transition enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut" mode="out-in" :duration="300">
          <router-view />
        </transition>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import useSettingsStore from "$/modules/settings"

const settingsStore = useSettingsStore()
const themeOverrides = {
  common: {
    primaryColor: '#14b8a6',
    primaryColorHover: '#0d9488',
    primaryColorPressed: '#0f766e'
  }
}
</script>

<style scoped></style>
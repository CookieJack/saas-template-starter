<template>
  <n-config-provider :locale="settingsStore.getNaiveUILocale" :date-locale="settingsStore.getNaiveUIDateLocale">
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import useSettingsStore from "$/modules/settings"

const settingsStore = useSettingsStore()
</script>

<style scoped></style>
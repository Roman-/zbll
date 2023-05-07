<script setup>
import LangDropdown from "@/components/nav/LangDropdown.vue";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useRouter, useRoute} from "vue-router";
import {computed} from "vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import "animate.css"

const selectedStore = useSelectedStore();
const settingsStore = useSettingsStore()
const router = useRouter();
const route = useRoute()

const isTimerView = () => route.fullPath.endsWith("timer")
const settingsBtnClass = computed(() => settingsStore.showSettings
    ? 'animate__animated animate__pulse animate__infinite text-primary'
    : 'text-info')

</script>

<template>
  <nav class="navbar bg-secondary bg-opacity-25">
    <div class="row w-100 align-items-center">
      <div class="col-auto me-auto">
        <button
            v-if="isTimerView()"
            tabindex="-1"
            @keydown.space.prevent=""
            @click="router.push('select')"
            class="mx-2 btn btn-primary">
          select
        </button>
        <span v-else class="px-1 logoText">
          ZBLL Trainer
        </span>
        <span class="mx-2">
          {{ $t("nav.cases selected", selectedStore.totalZbllsSelected()) }} {{ $t("nav.selected") }}
        </span>
      </div>
      <div class="col-auto">
        <LangDropdown v-if="settingsStore.showLangIcon"/>
        <button
            class="btn btn-link"
            tabindex="-1" @keydown.space.prevent=""
            :class="settingsBtnClass"
            @click="settingsStore.showSettings = !settingsStore.showSettings"
            :title="$t('nav.settings')">
          <i class="bi-wrench font_bigger"/>
        </button>
        <ThemeSwitcher/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logoText {
  font-weight: 900;
}
</style>
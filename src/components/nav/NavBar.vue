<script setup>
import LangDropdown from "@/components/nav/LangDropdown.vue";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useRouter, useRoute} from "vue-router";
import {computed} from "vue";
import {useSessionStore} from "@/stores/SessionStore";
import {useSettingsStore} from "@/stores/SettingsStore";
import "animate.css"

const selectedStore = useSelectedStore();
const settingsStore = useSettingsStore()
const router = useRouter();
const route = useRoute()

const isSelectView = () => route.fullPath.endsWith("select")
const btnText = computed(() => isSelectView() ? "practise" : "select")
const btnDisabled = computed(() => isSelectView() && selectedStore.totalZbllsSelected() === 0)
const settingsBtnClass = computed(() => settingsStore.showSettings
    ? 'animate__animated animate__pulse animate__infinite text-primary'
    : 'text-info')

const onSwitchViewClicked = () => {
  router.push(isSelectView() ? "timer" : "select");
}

</script>

<template>
  <nav class="navbar bg-secondary bg-opacity-25">
    <div class="row w-100 align-items-center">
      <div class="col-auto me-auto">
        <button
            tabindex="-1"
            :disabled="btnDisabled"
            @click="onSwitchViewClicked"
            class="mx-2 btn btn-primary">
          {{ btnText }}
        </button>
        <span class="mx-2">
          {{ $t("nav.cases selected", selectedStore.totalZbllsSelected()) }} {{ $t("nav.selected") }}
        </span>
      </div>
      <div class="col-auto">
        <LangDropdown v-if="settingsStore.showLangIcon"/>
        <button
            class="btn btn-link"
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
</style>
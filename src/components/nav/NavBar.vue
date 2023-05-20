<script setup>
import LangDropdown from "@/components/nav/LangDropdown.vue";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useRouter, useRoute} from "vue-router";
import {computed} from "vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import "animate.css"
import {useSessionStore} from "@/stores/SessionStore";

const selectedStore = useSelectedStore();
const sessionStore = useSessionStore()
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
          {{$t("nav.select_btn")}}
        </button>
        <span v-else class="mx-3 logoText">
          {{ $t("nav.zbll_trainer") }}
        </span>
        <span class="mx-2">
          {{ $t("nav.n_cases", selectedStore.totalZbllsSelected()) }}
        </span>
        <span class="mx-2" v-if="sessionStore.recapMode">
          {{ $t("nav.n_to_recap", sessionStore.casesWithZeroCount.length) }}
        </span>
      </div>
      <div class="col-auto">
        <LangDropdown/>
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
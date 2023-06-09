<script setup>
import LangDropdown from "@/components/nav/LangDropdown.vue";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useDisplayStore} from "@/stores/DisplayStore";
import {useRouter, useRoute} from "vue-router";
import {computed} from "vue";
import {useSessionStore} from "@/stores/SessionStore";

const selected = useSelectedStore();
const session = useSessionStore()
const router = useRouter();
const route = useRoute()
const displayStore = useDisplayStore()

const isTimerView = computed(() => route.fullPath.endsWith("timer"))
const settingsBtnClass = computed(() => displayStore.showSettings ? 'bg-info text-white' : 'text-info')
const tinySelectBtnText = computed(() => {
  return isTimerView && session.store.recapMode
      ? (session.casesWithZeroCount.length + '/' + selected.totalZbllsSelected())
      : selected.totalZbllsSelected()
})
</script>

<template>
  <nav class="navbar bg-secondary bg-opacity-25 py-lg-3 py-sm-1 py-0">
    <div class="row w-100 align-items-center">
      <div class="col-auto me-auto">
        <button
            v-if="isTimerView"
            tabindex="-1"
            @keydown.space.prevent=""
            @click="router.push('select')"
            class="mx-2 btn btn-primary">
          <span class="d-none d-sm-inline-block">{{ $t("nav.select_btn") }}</span>
          <i class="bi bi-card-checklist d-inline-block d-sm-none">
            {{ ` ${tinySelectBtnText}` }}
          </i>
        </button>
        <button
            v-if="isTimerView"
            @click="displayStore.showStatistics = !displayStore.showStatistics"
            :class="displayStore.showStatistics ? 'btn-primary' : 'btn-outline-primary'"
            class="mx-2 btn d-inline-block d-sm-none m-0">
          <i class="bi bi-list-columns"></i>
        </button>
        <span v-else class="mx-3 logoText">
          {{ $t("nav.zbll_trainer") }}
        </span>
        <span class="mx-2 d-none d-sm-inline-block">
          {{ $t("nav.n_cases", selected.totalZbllsSelected()) }}
        </span>
        <span class="mx-2 d-none d-sm-inline-block" v-if="isTimerView && session.store.recapMode">
          {{ $t("nav.n_to_recap", session.casesWithZeroCount.length) }}
        </span>
      </div>
      <div class="col d-flex justify-content-end p-0">
        <LangDropdown/>
        <button
            class="btn btn-link px-1 px-md-3"
            tabindex="-1" @keydown.space.prevent=""
            :class="settingsBtnClass"
            @click="displayStore.showSettings = !displayStore.showSettings"
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
<script setup>
import {TimerState, useSessionStore} from "@/stores/SessionStore";
import {computed, onMounted, ref, watch} from "vue";
import {msToHumanReadable} from "@/helpers/time_formatter";
import {useSettingsStore} from "@/stores/SettingsStore";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useI18n} from 'vue-i18n'
const {t} = useI18n()

const sessionStore = useSessionStore()
const settings = useSettingsStore()
const selectStore = useSelectedStore()
const numResults = computed(() => sessionStore.stats().length)
const onClearBtnClick = () => {
  if (confirm(t("stats_card.are_you_sure_to_clean"))) {
    sessionStore.reset(selectStore.allSelectedCases)
  }
}

const statsContainer = ref(null);
const scrollStats = () => statsContainer.value && (statsContainer.value.scrollTop = statsContainer.value.scrollHeight)
const scrollStatsLater = () => setTimeout(() => scrollStats(), 10)
onMounted(() => {
  watch(numResults, scrollStatsLater);
  scrollStatsLater()
})

const statClicked = i => sessionStore.observingResult = i

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-0">
        <div class="row align-items-center">
          <div class="col">
            {{t("stats_card.stats_title")}} {{ t("stats_card.n_solves", numResults) }}
          </div>
          <div class="col-auto">
            <button
                class="btn btn-sm btn-outline-danger mx-1"
                tabindex="-1" @keydown.space.prevent=""
                @click="onClearBtnClick"
                :title="t('stats_card.clear_btn_hint') + ' (Shift+Delete)'"
                v-if="sessionStore.stats().length > 0">
              {{t("stats_card.clear_btn")}}
            </button>
          </div>
        </div>
      </h5>
      <hr>
      <div class="stats-container" ref="statsContainer">
        <span v-for="(stat, index) in sessionStore.stats()" :key="index">
          <span
              @click="statClicked(stat['i'])" class="clickable stat"
              :class="sessionStore.observingResult === stat['i'] ? 'text-info' : ''">
            {{ msToHumanReadable(stat["ms"], settings.timerPrecision) }}
          </span>{{ stat["i"] === sessionStore.stats().length - 1 ? "" : ", " }}
        </span>
        <div v-if="sessionStore.stats().length === 0 && sessionStore.timerState !== TimerState.RUNNING">
          {{t("stats_card.hold_spacebar_hint")}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat {
  transition: color 0.1s;
}

.stat:hover {
  color: var(--bs-info)
}
.stats-container {
  max-height: 200px;
  overflow-y: auto;
}
</style>
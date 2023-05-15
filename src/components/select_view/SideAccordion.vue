<script setup>
import Presets from "@/components/presets/Presets.vue";
import BasicInfo from "@/components/select_view/BasicInfo.vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import Hotkeys from "@/components/select_view/Hotkeys.vue";
const settings = useSettingsStore()
</script>

<template>
  <div class="accordion mt-2" id="sideMenu">
    <div v-if="settings.showHowTo" class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
          {{$t("howto.how_to_use")}}
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#sideMenu">
        <div class="accordion-body">
          <BasicInfo/>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button :class="settings.showHowTo ? 'collapsed' : ''" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true">
          {{ $t("presets.presets") }}
        </button>
      </h2>
      <div id="collapseTwo" :class="settings.showHowTo ? '' : 'show'" class="accordion-collapse collapse" data-bs-parent="#sideMenu">
        <div class="accordion-body">
          <Presets/>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
          {{ $t("hotkeys.hotkeys") }}
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#sideMenu">
        <div class="accordion-body">
          <Hotkeys/>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
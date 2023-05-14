<script setup>

import {useSettingsStore} from "@/stores/SettingsStore";

const settings = useSettingsStore()

</script>

<template>
  <div class="stats-container" ref="statsContainer">
    <h5>{{$t("howto.how_to_use")}}
      <button class="btn btn-link py-0 px-2"
              @click="settings.showHowTo = false">
        {{$t("howto.dismiss_label")}}
      </button>
    </h5>
    <ul class="no_bullet">
      <li>{{$t("howto.howto_1")}}</li>
      <li>{{$t("howto.howto_2")}}</li>
      <li>{{$t("howto.howto_3")}}</li>
      <li>{{$t("howto.howto_4")}}</li>
    </ul>
  </div>
</template>

<style scoped>
ul.no_bullet {
  list-style-type: none;
  padding: 0;
}
</style>
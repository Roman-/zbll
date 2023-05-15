<script setup>

import {useSettingsStore} from "@/stores/SettingsStore";

const settings = useSettingsStore()

</script>

<template>
    <ul class="no_bullet">
      <li>{{$t("howto.howto_1")}}</li>
      <li>{{$t("howto.howto_2")}}</li>
      <li>{{$t("howto.howto_3")}}</li>
      <li>{{$t("howto.howto_4")}}</li>
    </ul>
    <button class="btn btn-link p-0" @click="settings.showHowTo = false">
      {{$t("howto.dismiss_label")}}
    </button>
</template>

<style scoped>
ul.no_bullet {
  list-style-type: none;
  padding: 0;
}
</style>
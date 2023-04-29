<script setup>
import LangDropdown from "@/components/nav/LangDropdown.vue";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useRouter, useRoute} from "vue-router";
import {computed} from "vue";
import {useSessionStore} from "@/stores/SessionStore";

const selectedStore = useSelectedStore();
const router = useRouter();
const route =  useRoute()

const isSelectView = () => route.fullPath.endsWith("select")
const btnText = computed(() => isSelectView() ? "practise" : "select")
const btnDisabled = computed(() => isSelectView() && selectedStore.totalZbllsSelected() === 0)

const onSwitchViewClicked = () => {
  router.push(isSelectView() ? "timer" : "select");
}


</script>

<template>
  <nav class="navbar bg-secondary bg-opacity-25">
    <div class="row w-100 align-items-center">
      <div class="col-auto me-auto">
        <button :disabled="btnDisabled" @click="onSwitchViewClicked" class="mx-2 btn btn-primary">
          {{btnText}}
        </button>
        <span class="mx-2">
          {{$t("nav.cases selected", selectedStore.totalZbllsSelected())}} {{$t("nav.selected")}}
        </span>
      </div>
      <div class="col-auto">
        <LangDropdown/>
        <ThemeSwitcher/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useSessionStore} from "@/stores/SessionStore";
import SideAccordion from "@/components/select_view/SideAccordion.vue";

const router = useRouter();

const selectedStore = useSelectedStore();
const sessionStore = useSessionStore()
const btnDisabled = computed(() => selectedStore.totalZbllsSelected() === 0)

const startPractice = () => {
  sessionStore.recapMode = false
  router.push('timer')
}

const startRecap = () => {
  sessionStore.setSelectedCases(selectedStore.allSelectedCases)
  sessionStore.recapMode = true
  router.push('timer')
}

</script>

<template>
  <div class="card mt-1">
    <div class="card-body">
        <button
            class="form-control my-1 btn btn-primary"
            tabindex="-1"
            :title="$t('select.practice_btn_title') + ' (Alt+T)'"
            :disabled="btnDisabled"
            @click="startPractice"
            @keydown.space.prevent=""
        >
          {{$t("select.practice")}}
        </button>
        <button
            class="form-control my-1 btn btn-outline-primary"
            tabindex="-1"
            :title="$t('select.recap_btn_title') + ' (Alt+R)'"
            :disabled="btnDisabled"
            @click="startRecap"
            @keydown.space.prevent=""
        >
          {{$t("select.recap")}}
        </button>

      <SideAccordion/>

    </div>
  </div>
</template>

<style scoped>
</style>
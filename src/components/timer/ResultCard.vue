<script setup>
import {computed} from "vue";
import {useSessionStore} from "@/stores/SessionStore";
import {msToHumanReadable} from "@/helpers/time_formatter";

const sessionStore = useSessionStore()
const result = computed(() => sessionStore.stats()[sessionStore.observingResult])

const onDeleteBtnClicked = () => {
  if (confirm("You sure you wanna delete this result?")) {
    sessionStore.deleteResult(sessionStore.observingResult)
  }
}

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-0">
        <div class="row align-items-center">
          <div class="col">
            Result #{{ result["i"] + 1 }}
            <span class="badge bg-primary">{{ msToHumanReadable(result["ms"]) }}</span>
          </div>
          <div class="col-auto">
            <button
                class="btn btn-sm btn-outline-danger mx-1"
                tabindex="-1"
                @click="onDeleteBtnClicked">
              delete
            </button>
          </div>
        </div>
      </h5>
      <hr>
      <p class="card-text">Case: {{ result["oll"] }}-{{ result["coll"] }} {{ result["zbll"] }}</p>
      <p class="card-text">Scramble: {{ result["scramble"] }}</p>
      <img
          src="https://bestsiteever.ru/visualcube/visualcube.php?fmt=svg&bg=t&stage=ll&view=plan&alg=F%20U2%20F2%20L%20F%20L2%20B%27%20R%27%20U2%20R%20B%20L"
          alt="">
    </div>
  </div>
</template>

<style scoped>
</style>
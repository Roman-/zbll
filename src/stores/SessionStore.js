import zbll_map from "@/assets/zbll_map.json"
import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {random_element} from "@/helpers/helpers";
import {mask_scramble} from "@/helpers/scramble_utils";

// store for current case/scramble and stats
export const useSessionStore = defineStore('session', () => {
    const recapMode = ref(false)

    const store = ref({
        // contains result from SelectedStore.getAllSelectedCases().
        "allCases": [],

        // contains object: {oll, coll, zbll, scrambles: [array of strings], maskedScramble: "…", recapped: false}
        "current": {},

        // array of objects: (TODO)
        "stats": []
    })

    const getRandomCase = () => {
        if (store.value.allCases.length === 0) {
            return {};
        }
        let c = random_element(store.value.allCases)
        c["maskedScramble"] = mask_scramble(random_element(c.scrambles));
        return c;
    }

    const reset = (allCasesSelected) => {
        store.value.allCases = allCasesSelected;
        store.value.stats = [];
        store.value.current = getRandomCase();
    }

    const currentScramble = computed(() => store.value.current.maskedScramble ?? "select some cases above");

    return {reset, recapMode, currentScramble}
});
<script setup>
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import { SVG } from "sr-puzzlegen"

const props = defineProps(['scramble'])
const cubeImgDiv = ref(null)
const settings = useSettingsStore()

const windowWidth = ref(window.innerWidth || document.documentElement.clientWidth)
const windowHeight = ref(window.innerHeight || document.documentElement.clientHeight)

function updateDimensions() {
  windowWidth.value = window.innerWidth || document.documentElement.clientWidth;
  windowHeight.value = window.innerHeight || document.documentElement.clientHeight
}

const cubePictureSize = computed(() => {
  const breakpoints = [
    { breakpoint: 416, pictureSize: 80 },
    { breakpoint: 576, pictureSize: 100 },
    { breakpoint: 768, pictureSize: 150 },
    { breakpoint: 960, pictureSize: 200 },
  ];

  for (let { breakpoint, pictureSize } of breakpoints) {
    if (windowWidth.value < breakpoint || windowHeight.value < breakpoint) {
      return pictureSize;
    }
  }

  return 250; // default (big) size
})

const insertSvg = () => {
  const isTopView = settings.store.pictureView === "top"
  cubeImgDiv.value.innerHTML = ''

  const opts = {
    "puzzle": {
      "alg": props.scramble,
    },
    "width": cubePictureSize.value,
    "height": cubePictureSize.value,
  }
  if (!isTopView) {
    opts.puzzle.rotations = [{"x":38,"y":45,"z":29}]
    opts.puzzle.mask = {
      "F": [3,4,5,6,7,8],
      "B": [3,4,5,6,7,8],
      "R": [3,4,5,6,7,8],
      "L": [3,4,5,6,7,8],
      "D": [0,1,2,3,4,5,6,7,8]
    }
  }
  const visualizerType = isTopView ? "cube-top" : "cube"
  SVG(cubeImgDiv.value, visualizerType, opts)
}

watch(() => props.scramble, insertSvg)
watch(() => settings.store.pictureView, insertSvg)
watch(() => cubePictureSize.value, insertSvg)
onMounted(() => {
  window.addEventListener('resize', updateDimensions);
  insertSvg()
})
onBeforeUnmount(() =>  window.removeEventListener('resize', updateDimensions) )

</script>

<template>
  <div ref="cubeImgDiv"></div>
</template>

<style scoped>
</style>
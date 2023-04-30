<script setup>

import {setLocaleAndReload, supportedLocales, addTranslationUrl} from "@/locale"

</script>

<template>
  <div class="dropdown d-inline">
    <button class="btn btn-link dropdown-toggle text-info"
            :title="$t('nav.language')"
            tabindex="-1"
            @keydown.space.prevent=""
            type="button"
            id="dropdownLang"
            data-bs-toggle="dropdown"
            aria-expanded="false">
      <i class="bi-translate font_bigger"/>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownLang">
      <li v-for="locale in supportedLocales" :key="locale.code">
        <a class="dropdown-item clickable" @click="setLocaleAndReload(locale.code)">
          {{locale.emoji}} {{locale.name}}
        </a>
      </li>
      <li>
        <a class="dropdown-item" :href="addTranslationUrl" target="_blank">
          ➕ Add translation
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
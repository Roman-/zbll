<script setup>

import {useSettingsStore} from "@/stores/SettingsStore";

const settings = useSettingsStore()

</script>

<template>
  <div class="stats-container" ref="statsContainer">
    <h5>How to use
      <button class="btn btn-link py-0 px-2"
              @click="settings.showHowTo = false">
        dismiss
      </button>
    </h5>
    <ul class="no_bullet">
      <li>🖱️ Click on the picture to select / deselect all cases in the group</li>
      <li>🔽 Click on the item header to expand / collapse the group</li>
      <li>🟢 Green color means all cases in the group are selected; 🟡 yellow - some cases are selected; ⚪ white - no
        cases selected
      </li>
      <li>✅ When you're ready, click "Practice"</li>
    </ul>
  </div>
</template>

<style scoped>
ul.no_bullet {
  list-style-type: none;
  padding: 0;
}
</style>
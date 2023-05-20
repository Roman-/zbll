<script setup>
</script>

<template>
  <ul class="no_bullet">
    <li>
      <kbd>Alt</kbd>+<kbd>T</kbd>
      <span class="expl">{{ $t("hotkeys.toggle_timer_select") }}</span>
    </li>
    <li>
      <kbd>Delete</kbd> {{ $t("hotkeys.or") }} <kbd>Alt</kbd>+<kbd>Z</kbd>
      <span class="expl">{{ $t("hotkeys.delete_current_result") }}</span>
    </li>
    <li>
      <kbd>Shift</kbd>+<kbd>Delete</kbd> {{ $t("hotkeys.or") }} <kbd>Alt</kbd>+<kbd>D</kbd>
      <span class="expl">{{ $t("hotkeys.clear_session") }}</span>
    </li>
    <li>
      <kbd>Alt</kbd>+<kbd>S</kbd>
      <span class="expl">{{ $t("hotkeys.select_deselect") }}</span>
    </li>
    <li>
      <kbd>Alt</kbd>+<kbd>R</kbd>
      <span class="expl">{{ $t("hotkeys.recap") }}</span>
    </li>
    <li>
      <kbd>Alt</kbd>+<kbd>A</kbd>
      <span class="expl">{{ $t("hotkeys.add_to_starred") }}</span>
    </li>
    <li>
      <kbd>←</kbd> / <kbd>→</kbd> / <kbd>Home</kbd> / <kbd>End</kbd>
      <span class="expl">{{ $t("hotkeys.navigate") }}</span>
    </li>
  </ul>
</template>

<style scoped>
ul.no_bullet {
  list-style-type: none;
  padding-left: 0;
}

.expl {
  margin-left: 0.5em;
}
</style>
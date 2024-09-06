<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  useEntryStore().fetchEntriesOfYears();
});
</script>

<template>
  <div class="py-4 flex h-detail">
    <!-- List entries -->
    <entry-list></entry-list>

    <!-- Detail entry -->
    <entry-detail></entry-detail>
  </div>
</template>

<style scoped lang="scss">
.h-detail {
  height: calc(100vh - 72px);
}
</style>

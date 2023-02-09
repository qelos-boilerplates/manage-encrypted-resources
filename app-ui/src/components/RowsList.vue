<script lang="ts" setup>
import RowItem from "@/components/RowItem.vue";
import type { IResource } from "../../../shared/config";

defineProps({
  items: {type: Array as () => Partial<IResource>[], default: () => []}
});

defineEmits(['removed'])
</script>
<template>
  <div class="rows-list">
    <RowItem v-for="item in items" :key="item._id" :item="item" @removed="$emit('removed', item)" />
  </div>
</template>

<style scoped>
.rows-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
}
</style>
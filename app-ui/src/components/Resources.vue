<script lang="ts" setup>
import RowsList from "@/components/RowsList.vue";
import { changeRoute } from "@qelos/web-sdk/dist/router";
import { useItems } from "@/store/items";
import type { IResource } from "../../../shared/config";
import { resourceName, resourceNamePluralCapitalized } from "../../../shared/config";

const store = useItems();

function clearItem(item: IResource) {
  store.items = store.items.filter(row => row !== item);
}
</script>
<template>
  <h2>
    {{resourceNamePluralCapitalized}}
    <button @click="changeRoute('plugin.create-' + resourceName, {})">+</button>
  </h2>
  <RowsList :items="store.items" @removed="clearItem($event)" />
</template>
<style scoped>
h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  cursor: pointer;
  background-color: var(--negative-color);
  width: 64px;
  height: 64px;
  padding: var(--spacing);
  border-radius: var(--spacing);
  border: none;
  font-size: 200%;
}
</style>

<script lang="ts" setup>
import { changeRoute } from "@qelos/web-sdk/dist/router";
import { code } from "@qelos/web-sdk";
import type { IResource } from "../../../shared/config";
import { displayData, resourceName, resourceNamePlural, routeParamKey, storedData } from "../../../shared/config";

const props = defineProps({
  item: {
    type: Object as () => Partial<IResource>,
    required: true
  }
});

const [titlePropName, ...displayedProps] = displayData;

const emit = defineEmits(["removed"]);

function remove() {
  fetch(`/api/${resourceNamePlural}/${props.item._id}`, {
    method: "delete",
    headers: { code }
  });
  emit("removed");
}
</script>
<template>
  <div class="row-item" @click="changeRoute('plugin.edit-' + resourceName, {[routeParamKey]: item._id})">
    <h3>{{ item[titlePropName] }}</h3>
    <p>
      <span class="label" v-for="prop in displayedProps" :key="prop">
        {{ storedData[prop].title }}: {{ item[prop] }}
      </span>
    </p>
    <div><a @click.stop="remove">Remove</a></div>
  </div>
</template>
<style scoped>
.row-item {
  cursor: pointer;
  padding: calc(var(--spacing) * 2);
  border-radius: var(--spacing);
  background-color: var(--main-color);
  color: var(--negative-color);
}

.row-item:hover {
  background-color: var(--main-color-light);
}

h3,
p {
  padding: var(--spacing);
  margin: 0;
}

.label {
  display: inline-block;
  padding: var(--spacing);
  margin: var(--spacing);
  border-radius: var(--spacing);
  background-color: var(--third-color);
}
</style>

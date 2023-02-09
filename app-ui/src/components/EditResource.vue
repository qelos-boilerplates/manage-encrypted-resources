<script lang="ts" setup>
import { useAuth } from "@/store/auth";
import { computed, ref, shallowReactive, watch } from "vue";
import { changeRoute } from "@qelos/web-sdk/dist/router";
import { useItems } from "@/store/items";
import type { IResource } from "../../../shared/config";
import { resourceNamePlural, storedData, resourceNameCapitalized } from "../../../shared/config";

const { code } = useAuth();

function getEmptyResource() {
  return Object.keys(storedData).reduce((resource, key) => {
    resource[key] = "";
    return resource;
  }, {} as any);
}

const itemsStore = useItems();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const editedResource = computed(() =>
  itemsStore.items.find((resource) => resource._id === props.id)
);
const isSubmitting = ref(false);
const isSaved = ref(false);
const resource = shallowReactive<Partial<IResource>>(getEmptyResource());

watch(editedResource, (data) => {
  Object.assign(resource, data);
});

async function save() {
  isSubmitting.value = true;
  await fetch(`/api/${resourceNamePlural}/${props.id}`, {
    method: "put",
    headers: { code, "Content-Type": "application/json" },
    body: JSON.stringify(resource),
  });
  isSaved.value = true;
  Object.assign(resource, getEmptyResource());
  changeRoute("plugin." + resourceNamePlural, {});
}
</script>
<template>
  <form @submit.prevent="save" v-if="!itemsStore.loading">
    <h2>
      Edit {{resourceNameCapitalized}}
      <button :disabled="isSubmitting">Submit</button>
    </h2>
    <div class="form-inputs">
      <label v-for="(item, key) of storedData" :key="key">
        <span>{{ item.title }}<template v-if="item.required"> *</template></span>
        <input
          v-if="item.type === 'text'"
          v-model="resource[key]"
          :required="item.required"
        />
        <input
          v-else-if="item.type === 'password'"
          v-model="resource[key]"
          :required="item.required"
          type="password"
        />
        <input
          v-else-if="item.type === 'number'"
          v-model="resource[key]"
          :required="item.required"
          type="number"
        />
        <input
          v-else-if="item.type === 'range'"
          v-model="resource[key]"
          :required="item.required"
          type="radio"
        />
        <textarea
          v-else-if="item.type === 'textarea'"
          v-model="resource[key]"
          :required="item.required"
        />
        <select
          v-else-if="item.type === 'select'"
          v-model="resource[key]"
          :required="item.required"
        >
          <option
            v-for="(display, value) in item.options"
            :key="value"
            :value="value"
          >
            {{ display }}
          </option>
        </select>
      </label>
    </div>
  </form>
</template>
<style scoped>
h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  cursor: pointer;
  background-color: var(--negative-color);
  padding: calc(var(--spacing) * 2);
  border-radius: var(--spacing);
  border: none;
}

label {
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--spacing);
  padding: calc(var(--spacing) * 2);
  border-bottom: 1px solid var(--third-color);
}

label:last-child {
  border: none;
}

input,
select,
textarea {
  border: 1px solid var(--third-color);
  padding: var(--spacing);
  min-width: 400px;
  font-family: sans-serif;
  outline: none;
}

:is(input,select,textarea):focus {
  border: 1px solid var(--main-color);
}

textarea {
  height: 300px;
}
</style>

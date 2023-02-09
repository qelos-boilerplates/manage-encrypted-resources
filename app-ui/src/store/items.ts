import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuth } from "@/store/auth";
import type { IResource } from "../../../shared/config";

export const useItems = defineStore("items", () => {
  const loading = ref(true);
  const error = ref(null);
  const items = ref<IResource[]>([]);
  const { code } = useAuth();

  function loadList() {
    loading.value = true;
    fetch("/api/vms", {
      headers: { code },
    })
      .then((res) => res.json())
      .then((list) => (items.value = list))
      .catch((err) => error.value = err)
      .finally(() => loading.value = false);
  }

  loadList();

  return { refresh: loadList, loading, error, items };
});

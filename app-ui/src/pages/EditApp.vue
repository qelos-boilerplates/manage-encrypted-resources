<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/store/auth";
import EditResource from "@/components/EditResource.vue";
import { onRouteChanged } from "@qelos/web-sdk/dist/route";
import { routeParamKey } from "../../../shared/config";

const auth = useAuth();
const resourceId = ref((new URL(location.href)).searchParams.get(routeParamKey));

onRouteChanged((route: any) => {
  resourceId.value = route.params[routeParamKey];
});
</script>

<template>
  <main v-if="auth.user && resourceId">
    <EditResource :id="resourceId" />
  </main>
</template>

<style scoped></style>

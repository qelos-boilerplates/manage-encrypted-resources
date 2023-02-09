<script setup lang="ts">
import { useAuth } from "@/store/auth";
import CreateResource from "@/components/CreateResource.vue";

const auth = useAuth();
</script>

<template>
  <main v-if="auth.user">
    <CreateResource />
  </main>
</template>

<style scoped></style>

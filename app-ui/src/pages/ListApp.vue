<script setup lang="ts">
import { useAuth } from "@/store/auth";
import Resources from "@/components/Resources.vue";

const auth = useAuth();
</script>

<template>
  <main v-if="auth.user">
    <Resources />
  </main>
</template>

<style scoped></style>

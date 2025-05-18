<template>
  <component :is="authModule?.getStepComponent" />
</template>

<script lang="ts" setup>
const authModule = useAuth();
</script>
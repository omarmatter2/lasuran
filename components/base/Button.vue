<template>
  <UButton :label="label" :loading="loading" :disabled="disabled"
           class="bg-transparent text-[#A0576F] border border-[#A0576F] rounded-[100px] w-full py-[16px] justify-center text-[18px] font-normal hover:bg-[#F4EAEA] transition cursor-pointer leading-[100%] tracking-[0]">
    <slot></slot>
  </UButton>
</template>

<script lang="ts" setup>

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

</script>


<style scoped>

</style>
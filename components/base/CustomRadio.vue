<script setup lang="ts">
import type { RadioGroupItem, RadioGroupValue } from '@nuxt/ui'


</script>

<template>
  <URadioGroup
    v-model="modelValue"
    :items="items"
    legend=""
    class="text-[14px] gap-2"
    :ui="{
      wrapper: 'flex flex-col mb-[0]',
      container: 'flex items-center',
      label: 'text-[15px] font-[350] leading-normal text-[#5B605C] mb-0',
      base: 'w-[15px] h-[15px] rounded-[12px] bg-transparent border border-[#A0576F] text-[#5F2C3E] data-[state=checked]:bg-[#A0576F] data-[state=checked]:text-white',
    }"
  />
</template>

<style>

  span[data-state="checked"] {
    background-color: #A0576F;
}


  span[data-state="checked"]::after{
    background-color: #A0576F;
  }

</style>
<template>
  <div class="bg-white p-4 rounded-[20px] shadow-sm text-[#A0576F]">
    <!-- Top Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img :src="item.image" alt="service" class="w-14 h-14 rounded-full object-cover" />
        <div>
          <p class="text-sm font-bold">{{ item.name }}</p>
          <button class="text-xs text-gray-400 underline" @click="item.expanded = !item.expanded">
            {{ item.expanded ? 'View Less' : 'View More' }}
          </button>
        </div>
      </div>

      <div class="flex items-center gap-6">
        <p class="text-sm font-medium">{{ item.price }} SAR</p>
        <div class="flex items-center gap-2 text-[#A0576F]">
          <UIcon name="i-heroicons-pencil" class="cursor-pointer" />
          <UIcon name="i-heroicons-x-mark" class="cursor-pointer text-red-500" />
        </div>
      </div>
    </div>

    <!-- Expanded Content -->
    <div v-if="item.expanded" class="mt-4 border-t pt-4 text-sm space-y-2">
      <div v-if="item.professional">
        <span class="font-semibold">Professional:</span> {{ item.professional }}
      </div>
      <div v-if="item.services">
        <span class="font-semibold">Services:</span> {{ item.services }} — <span class="text-gray-500">00.00 SAR</span>
      </div>
      <div v-if="item.visitors && item.phones">
        <span class="font-semibold">Visitors:</span>
        <ul class="ml-4 text-xs list-disc">
          <li v-for="(name, index) in item.visitors" :key="index">
            {{ name }} — {{ item.phones[index] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    image: string
    name: string
    duration: string
    price: number
    expanded?: boolean
    professional?: string
    services?: string
    visitors?: string[]
    phones?: string[]
  }
}>()
</script>

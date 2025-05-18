<template>
  <Container>
    {{  filters  }}
    <ServiceFilters v-model="filters" class="mb-6" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard
        v-for="service in filteredServices"
        :key="service.id"
        class="p-0 overflow-hidden rounded-[16px] cursor-pointer hover:shadow-xl transition"
        @click="openModal(service)"
      >
        <img :src="service.image" class="w-full h-[180px] object-cover" />
        <div class="p-4">
          <h3 class="text-lg text-dark font-semibold">{{ service.name }}</h3>
          <p class="text-sm text-primary font-medium">
            {{ service.price ? `${service.price} SAR` : 'Price Upon Selection' }}
          </p>
        </div>
      </UCard>
    </div>

    <Dialog v-model:open="modalOpen">
      <div class="text-left p-4 max-w-md mx-auto">
        <img :src="selectedService?.image" class="rounded-xl w-full h-[200px] object-cover mb-4" />
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-xl font-semibold text-primary">{{ selectedService?.name }}</h2>
          <p class="text-primary font-bold text-lg">
            {{ selectedService?.price ? `${selectedService.price} SAR` : '—' }}
          </p>
        </div>
        <p class="text-sm text-dark mb-4">{{ selectedService?.description }}</p>

        <URadioGroup
          v-if="selectedService?.name === 'Hair Extensions'"
          v-model="selectedAmount"
          :options="amountOptions"
        />

        <div class="mt-6">
          <UButton label="Add Guest" variant="outline" icon="i-heroicons-user-plus" />
        </div>

        <UButton
          class="mt-6 w-full bg-primary text-white rounded-[30px]"
          :label="`${selectedService?.price || 0} - Continue`"
        />
      </div>
    </Dialog>
  </Container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Container from '@/components/base/Container.vue'
import Dialog from '@/components/base/Dialog.vue'
import ServiceFilters from '@/components/base/ServiceFilters.vue'

const filters = ref({
  gender: 'female',
  branch: { label: 'Lasuran, Riyadh Branch 1', value: 'Lasuran, Riyadh Branch 1' },
  category: 'Hair Styling'
})

const services = ref([
  {
    id: 1,
    name: 'Hair Extensions',
    image: '/assets/img/service-1.png',
    price: null,
    description: 'Hair extensions for women.',
    gender: 'female',
    category: 'Hair Styling',
    branch: 'Lasuran, Riyadh Branch 1'
  },
  {
    id: 2,
    name: 'Beard Trim',
    image: '/assets/img/service-2.png',
    price: 300,
    description: 'Beard trim for men.',
    gender: 'male',
    category: 'Hair Styling',
    branch: 'Lasuran, Riyadh Branch 1'
  },
  {
    id: 3,
    name: 'Massage (Female)',
    image: '/assets/img/service-3.png',
    price: 500,
    description: 'Relaxing massage for women.',
    gender: 'female',
    category: 'Massage',
    branch: 'Lasuran, Jeddah Branch'
  },
  {
    id: 4,
    name: 'Massage (Male)',
    image: '/assets/img/service-1.png',
    price: 500,
    description: 'Relaxing massage for men.',
    gender: 'male',
    category: 'Massage',
    branch: 'Lasuran, Dammam Branch'
  }
])

const filteredServices = computed(() =>
  services.value.filter(
    s =>
      s.gender === filters.value.gender &&
      s.category === filters.value.category &&
      s.branch === filters.value.branch.value
  )
)

const modalOpen = ref(false)
const selectedService = ref<any>(null)
const selectedAmount = ref('20 Extensions')
const amountOptions = ['10 Extensions', '20 Extensions', '30 Extensions', '40 Extensions', '50 Extensions']

function openModal(service: any) {
  selectedService.value = service
  modalOpen.value = true
}
</script>

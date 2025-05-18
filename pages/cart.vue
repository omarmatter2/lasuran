<template>
  <Container>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-10 bg-[#A0576F1A]">
      <!-- Cart List -->
      <div class="lg:col-span-2 space-y-6">
        <CartItem
          v-for="(item, index) in cartItems"
          :key="index"
          :item="item"
        />
      </div>

      <!-- Payment Summary -->
      <PaymentSummary
        :services-count="cartItems.length"
        :subtotal="cartItems.reduce((acc, item) => acc + item.price, 0)"
      />
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/base/Container.vue'
import CartItem from '@/components/base/CartItem.vue'
import PaymentSummary from '@/components/base/PaymentSummary.vue'

const cartItems = [
  {
    image: '/img/hair-1.jpg',
    name: 'Hair Extensions',
    duration: '4 Hours',
    price: 2500,
    professional: '[Professional Name]',
    services: '20 Extensions',
    visitors: ['Zahra Ahmed', 'Yassmin Ahmed'],
    phones: ['+966 56 583 2222', '+966 56 323 1987'],
    expanded: true
  },
  {
    image: '/img/facial.jpg',
    name: 'Deep Facial Cleanse',
    duration: '4 Hours',
    price: 2500,
    expanded: false
  },
  {
    image: '/img/hair-2.jpg',
    name: 'Hair Extensions',
    duration: '4 Hours',
    price: 2500,
    expanded: false
  }
]
</script>

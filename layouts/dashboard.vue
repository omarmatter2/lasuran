<template>
  <div class="flex h-scree">

    <div class="w-[320px]">
      <DashboardSideMenu @menu-click="handleMenuClick" />
    </div>
    
    <div class="flex-1 ps-6">
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw, defineAsyncComponent } from 'vue';
import DashboardSideMenu from '~/components/dashboard/SideMenu.vue';


const DashboardMyProfile = defineAsyncComponent(() => import('~/components/dashboard/MyProfile.vue'));
const DashboardMyBookings = defineAsyncComponent(() => import('~/components/dashboard/MyBookings.vue'));
const DashboardMyWallet = defineAsyncComponent(() => import('~/components/dashboard/MyWallet.vue'));


const components = {
  'profile': markRaw(DashboardMyProfile),
  'bookings': markRaw(DashboardMyBookings),
  'wallet': markRaw(DashboardMyWallet),
};


const activeComponent = ref(components['profile']); 

function handleMenuClick(menuId) {
  console.log('Menu clicked:', menuId); 
  if (components[menuId]) {
    activeComponent.value = components[menuId];
  } else {
    console.warn(`Component "${menuId}" not found`);
  }
}
</script>
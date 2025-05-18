// components/dashboard/MyBookings.vue
<template>
  <div>
    <div class="flex justify-between items-center pb-7 mb-7 border-b border-[#AD7084]">
      <h1 class="text-lg font-medium text-[#EBE4DF]">My Bookings</h1>
      
      <div class="flex space-x-2">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-4 py-1.5 pt-2 rounded-full text-sm font-medium transition-colors',
            activeFilter === filter.id 
              ? filter.id === 'all' ? 'bg-gray-200 text-gray-700' : 
                filter.id === 'served' ? 'bg-[#6B8B9B] text-white' :
                filter.id === 'cancelled' ? 'bg-[#C44E4E] text-white' :
                'bg-[#6B8B9B] text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
            isFilterDisabled(filter.id) ? 'opacity-70 cursor-not-allowed' : ''
          ]"
          :disabled="isFilterDisabled(filter.id)"
        >
          {{ filter.label }}
        </button>
        
        <button 
          class="px-6 py-1.5 bg-[#6B8B9B] text-white rounded-full text-sm font-medium transition-colors"
        >
          Book A Table
        </button>
      </div>
    </div>
    
    <div v-if="filteredBookings.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="booking in filteredBookings" 
        :key="booking.id"
        class="py-[14px] px-[20px] h-full flex flex-col border border-[#AD7084] border-solid rounded-[20px] text-white relative cursor-pointer"
        @click="openBookingDetails(booking)"
      >
        <!-- Close Button -->
        
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-[#EBE4DF] text-[18px] font-bold">Booking No. {{ booking.bookingNumber }}</h3>
          
          <span 
            :class="[
              'px-3 py-0.5 rounded-full text-xs font-medium',
              booking.status === 'active' ? 'bg-[#6B8B9B] text-white' : 
              booking.status === 'served' ? 'bg-[#D29F8C] text-white' :
              'bg-[#C44E4E] text-white'
            ]"
          >
            {{ capitalizeFirstLetter(booking.status) }}
          </span>
        </div>
        
        <div class="space-y-2">
          <div class="flex items-center text-sm text-[#EBE4DF]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-[#C6C6C7] text-[14px]">No. of Guests: {{ booking.guests }} Guests</span>
          </div>
          
          <div class="flex items-center text-sm text-[#EBE4DF]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-[#C6C6C7] text-[14px]">Branch: {{ booking.branch }}</span>
          </div>
          
          <div class="flex items-center text-sm text-[#EBE4DF]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-[#C6C6C7] text-[14px]">{{ booking.date }}</span>
          </div>
          
          <div class="flex items-center text-sm text-[#EBE4DF]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-[#C6C6C7] text-[14px]">{{ booking.time }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- No Appointments Screen - Show when no bookings are available -->
    <div v-else class="flex flex-col items-center justify-center py-16 w-[50%] mx-auto">
      <!-- Empty Calendar/Appointment Illustration -->
      <div class="relative w-28 h-28 mb-6">
        <img
          src="/assets/img/noBooking.png"
          alt="No Bookings"
        />
      </div>
      
      <!-- Text Messages -->
      <h2 class="text-xl font-bold text-[#EBE4DF] mb-1">No Appointments</h2>
      <p class="text-[#C6C6C7] text-center mb-6 font-light">
        Your upcoming and past appointment<br>
        will appear here when you book
      </p>
      
      <!-- Book a Service Button -->
      <button 
        class="px-8 py-3 bg-[#EBE4DF] rounded-full w-full text-[#A0576F] text-sm font-medium shadow-sm hover:bg-[#EBE4DF]"
      >
        Book a Service
      </button>
    </div>
    
    <!-- Dialog component for booking details -->
    <Dialog v-model:open="modalOpen">
      <template #body>
        <div 
          v-if="selectedBooking"
          class="bg-[#913E5D] mx-auto rounded-[30px] overflow-hidden shadow-lg text-[#913E5D] relative"
        >
          <!-- Header -->
          <div class="pt-[24px] px-[30px] sm:px-[60px] pb-[30px]">
            <h2 class="text-center text-[23px] font-bold leading-normal text-[#EBE4DF] mb-[20px] mt-[20px]">Booking Details</h2>
            
            <!-- Booking Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-[30px]">
              <div>
                <h3 class="text-[#C6C6C7] text-[14px] mb-1">Username</h3>
                <p class="text-[#EBE4DF] text-[16px] font-medium">Zahra Ahmed</p>
              </div>
              <div>
                <h3 class="text-[#C6C6C7] text-[14px] mb-1">Zahra Arrived</h3>
                <p class="text-[#EBE4DF] text-[16px] font-medium">Yes</p>
              </div>
              <div>
                <h3 class="text-[#C6C6C7] text-[14px] mb-1">Visitors</h3>
                <p class="text-[#EBE4DF] text-[16px] font-medium">{{ selectedBooking.guests }} Visitors</p>
              </div>
              <div>
                <h3 class="text-[#C6C6C7] text-[14px] mb-1">Branch</h3>
                <p class="text-[#EBE4DF] text-[16px] font-medium">{{ selectedBooking.branch }}</p>
              </div>
              <div>
                <h3 class="text-[#C6C6C7] text-[14px] mb-1">Booking Time</h3>
                <p class="text-[#EBE4DF] text-[16px] font-medium">{{ selectedBooking.time }}</p>
              </div>
              <div>
                <h3 class="text-[#C6C6C7] text-[14px] mb-1">Booking Date</h3>
                <p class="text-[#EBE4DF] text-[16px] font-medium">{{ selectedBooking.date }}</p>
              </div>
            </div>
            
            <!-- Payment Summary -->
            <div class="mb-[30px]">
              <h3 class="text-[#EBE4DF] text-[18px] font-bold mb-[15px]">Payment Summary</h3>
              
              <div class="space-y-[10px]">
                <div class="flex justify-between">
                  <p class="text-[#C6C6C7] text-[14px]">Subtotal ({{ selectedBooking.guests }} Persons)</p>
                  <p class="text-[#EBE4DF] text-[14px]">00.00 SAR</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-[#C6C6C7] text-[14px]">VAT Amount (15%)</p>
                  <p class="text-[#EBE4DF] text-[14px]">00.00 SAR</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-[#C6C6C7] text-[14px]">Service Cost</p>
                  <p class="text-[#EBE4DF] text-[14px]">00.00 SAR</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-[#C6C6C7] text-[14px]">Discount</p>
                  <p class="text-[#EBE4DF] text-[14px]">00.00 SAR</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-[#C6C6C7] text-[14px]">Bookmarked points (-100 Pts.)</p>
                  <p class="text-[#EBE4DF] text-[14px]">00.00 SAR</p>
                </div>
              </div>
              
              <div class="border-t border-[#AD7084] mt-[15px] pt-[15px]">
                <div class="flex justify-between">
                  <p class="text-[#EBE4DF] text-[16px] font-bold">Total</p>
                  <p class="text-[#EBE4DF] text-[16px] font-bold">00.00 SAR</p>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-col space-y-3">
              <button 
                v-if="selectedBooking.status === 'served'"
                class="w-full py-3 bg-[#D29F8C] text-white rounded-full text-[16px] font-semibold"
                @click="handleRateService"
              >
                Rate Service
              </button>
              
              <button 
                v-if="selectedBooking.status === 'active' || selectedBooking.status === 'served'"
                class="w-full py-3 bg-[#EBE4DF] text-[#913E5D] rounded-full text-[16px] font-semibold"
                @click="handleMakeService"
              >
                Make Service
              </button>
              
              <button 
                v-if="selectedBooking.status === 'active'"
                class="w-full py-3 bg-[#C44E4E] text-white rounded-full text-[16px] font-semibold"
                @click="handleCancelBooking"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
    
    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="deleteModalOpen">
      <template #body>
        <div class="bg-[#913E5D] mx-auto rounded-[30px] overflow-hidden shadow-lg text-[#EBE4DF] p-[30px]">
          <h3 class="text-[#EBE4DF] text-[20px] font-bold mb-[20px] text-center">Confirm Delete</h3>
          <p class="text-[#C6C6C7] text-[16px] mb-[30px] text-center">Are you sure you want to delete this booking?</p>
          
          <div class="flex space-x-4">
            <button 
              class="flex-1 py-3 bg-gray-400 text-white rounded-full text-[16px] font-semibold"
              @click="deleteModalOpen = false"
            >
              Cancel
            </button>
            <button 
              class="flex-1 py-3 bg-[#C44E4E] text-white rounded-full text-[16px] font-semibold"
              @click="confirmDeleteBooking"
            >
              Delete
            </button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dialog from '@/components/base/Dialog.vue';

// Filter options
const filters = [
  { id: 'all', label: 'ALL' },
  { id: 'served', label: 'Served' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'active', label: 'Active' }
];

// Currently active filter
const activeFilter = ref('all');

// Bookings data
const bookings = ref([
  {
    id: 1,
    bookingNumber: '05585',
    status: 'active',
    guests: 3,
    branch: 'Riyadh',
    date: 'Sep 18th, 2024',
    time: 'Sep 18th, 2024'
  },
  {
    id: 2,
    bookingNumber: '05586',
    status: 'served',
    guests: 2,
    branch: 'Jeddah',
    date: 'Sep 15th, 2024',
    time: 'Sep 15th, 2024'
  },
  {
    id: 3,
    bookingNumber: '05587',
    status: 'cancelled',
    guests: 4,
    branch: 'Riyadh',
    date: 'Sep 10th, 2024',
    time: 'Sep 10th, 2024'
  }
]);

// Selected booking for details popup
const selectedBooking = ref(null);
const modalOpen = ref(false);

// Booking to delete (for confirmation dialog)
const bookingToDelete = ref(null);
const deleteModalOpen = ref(false);

// Check if there are any bookings
const hasAnyBookings = computed(() => bookings.value.length > 0);

// Check if there are bookings with a specific status
const hasBookingsWithStatus = (status) => {
  return bookings.value.some(booking => booking.status === status);
};

// Check if a filter should be disabled
const isFilterDisabled = (filterId) => {
  if (filterId === 'all') return false;
  return !hasBookingsWithStatus(filterId);
};

// Get filtered bookings based on active filter
const filteredBookings = computed(() => {
  if (activeFilter.value === 'all') {
    return bookings.value;
  }
  return bookings.value.filter(booking => booking.status === activeFilter.value);
});

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Open booking details popup
function openBookingDetails(booking) {
  selectedBooking.value = booking;
  modalOpen.value = true;
}

// Handle rate service button
function handleRateService() {
  // Logic for rating service
  console.log('Rating service for booking:', selectedBooking.value.id);
  // Close the popup after action
  modalOpen.value = false;
}

// Handle make service button
function handleMakeService() {
  // Logic for making service
  console.log('Making service for booking:', selectedBooking.value.id);
  // Close the popup after action
  modalOpen.value = false;
}

// Handle cancel booking button
function handleCancelBooking() {
  // Logic for cancelling booking
  console.log('Cancelling booking:', selectedBooking.value.id);
  
  // Update booking status
  const bookingIndex = bookings.value.findIndex(b => b.id === selectedBooking.value.id);
  if (bookingIndex !== -1) {
    bookings.value[bookingIndex].status = 'cancelled';
  }
  
  // Close the popup after action
  modalOpen.value = false;
}

// Open delete confirmation dialog
watch(bookingToDelete, (newValue) => {
  if (newValue) {
    deleteModalOpen.value = true;
  }
});

// Confirm delete booking
function confirmDeleteBooking() {
  if (!bookingToDelete.value) return;
  
  // Remove booking from the list
  bookings.value = bookings.value.filter(booking => booking.id !== bookingToDelete.value.id);
  
  // Close the confirmation dialog
  deleteModalOpen.value = false;
  bookingToDelete.value = null;
}
</script>

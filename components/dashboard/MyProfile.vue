<template>
  <div
    class="py-[34px] px-[30px] h-full flex flex-col border border-[#AD7084] border-solid rounded-[20px]"
  >
    <div class="">
      <div class="flex flex-col items-center mb-8">
        <div class="relative mb-4">
          <img
            src="/assets/img/imgg3.png"
            alt="Lasuban Logo"
            class="w-[139px] h-[139px] rounded-full bg-rose-100 object-cover"
          />
          <button
            class="absolute bottom-2 right-1 rounded-full p-1 text-white bg-[#6B8B9B] w-[30px] h-[30px] flex items-center justify-center"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <h2 class="text-xl font-medium text-[#EBE4DF]">{{ user.name }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-start text-[14px] font-medium text-white mb-3">
            Phone Number
          </p>
          <div
            class="flex rounded-[14px] border-[1.2px] border-[#EBE4DF] px-[18px] py-[10px] text-[16.76px] font-normal leading-[31px] h-[50px] tracking-[2.61px] text-[#BBCACF]"
          >
            <div class="flex items-center gap-2">
              <img
                src="/assets/img/sa-flag.svg"
                alt="saudi-flag"
                class="w-[35px] h-[23px]"
              />
              <span class="text-[#BBCACF] font-medium text-[14px]">+966</span>
            </div>
            <div class="mx-[18px] border-l border-[#BBCACF]"></div>
            <input
              type="text"
              placeholder="50 XXXX XXXX"
              v-model="user.phone"
              class="flex-1 outline-none bg-transparent text-[#BBCACF] placeholder:text-[#D3C9C5] text-[14px]"
            />
          </div>
        </div>
        <div>
          <div>
            <p class="text-start text-[14px] font-medium text-white mb-3">
              Date Of Birth
            </p>
            <div
              class="flex items-center gap-[10px] border border-[#EBE4DF] rounded-[13px] px-[23px] bg-transparent"
            >
              <label for="last-name"></label>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#EBE4DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                placeholder="April - 18th - 2000"
                id="last-name"
                v-model="user.birthDate"
                class="flex-1 outline-none bg-transparent text-[#BBCACF] placeholder:text-[#D3C9C5] text-[14px] h-[50px]"
                type="text"
              />
            </div>
          </div>
        </div>
   
        <div>
          <p class="text-start text-[14px] font-medium text-white mb-3">
            City
          </p>
          <div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#EBE4DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <select
                v-model="user.city"
                class="w-full h-[50px] pl-10 pr-4 py-2 rounded-[14px] bg-[#A0576F] ring-1 ring-[#EBE4DF] focus:ring-0 focus:border-[#A0576F] text-[#BBCACF] placeholder:text-[#D3C9C5] text-[14px] appearance-none"
              >
                <option v-for="city in cities" :key="city.value" :value="city.value">
                  {{ city.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#EBE4DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p class="text-start text-[14px] font-medium text-white mb-3">
            Gender
          </p>
          <div>
            <div class="flex gap-4">
              <div class="flex-1 basis-1/2">
                <input type="radio" id="gender-male" value="male" v-model="user.gender" name="gender" class="sr-only peer" />
                <label for="gender-male"
                  class="block text-center w-full cursor-pointer py-[10px] rounded-full border border-[#EBE4DF] text-[#EBE4DF] text-[18px] bg-transparent transition-all
                          peer-checked:bg-[#6B8B9B] peer-checked:text-[#EBE4DF] peer-checked:border-[#6B8B9B]">
                  Male
                </label>
              </div>

              <div class="flex-1 basis-1/2">
                <input type="radio" id="gender-female" value="female" v-model="user.gender" name="gender" class="sr-only peer" />
                <label for="gender-female"
                  class="block text-center w-full cursor-pointer py-[10px] rounded-full border border-[#EBE4DF] text-[#EBE4DF] text-[18px] bg-transparent transition-all
                  peer-checked:bg-[#6B8B9B] peer-checked:text-[#EBE4DF] peer-checked:border-[#6B8B9B]">
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <button 
            class="bg-[#C44E4E] py-[10px] px-8 text-[14px] rounded-[100px] hover:bg-[#C44E4E] text-[#EBE4DF]"
            @click="deleteProfile"
          >
            Delete Profile
          </button>
        </div>
      </div>

      <div class="flex justify-end gap-6 justify-items-end mt-[30px]">
        <button
          class="w-[calc(50%-12px)] bg-white py-[10px] px-8 rounded-[100px] hover:bg-white text-[#913E5D] text-center flex items-center justify-center h-[50px] border border-[#913E5D] hover:text-[#913E5D] hover:opacity-100"
          @click="saveProfile"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  name: "Zahra Ahmed",
  phone: "+966 854 759 9745",
  birthDate: "April 18th, 2000",
  city: "Riyadh",
  gender: "female"
});

const cities = [
  { label: "Riyadh", value: "Riyadh" },
  { label: "Jeddah", value: "Jeddah" },
  { label: "Mecca", value: "Mecca" },
  { label: "Medina", value: "Medina" },
  { label: "Dammam", value: "Dammam" }
];

const saveProfile = () => {
  console.log('Saving profile', user.value);
};

const deleteProfile = () => {
  if (confirm('Are you sure you want to delete your profile?')) {
    console.log('Deleting profile', user.value);
  }
};
</script>
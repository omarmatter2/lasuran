<template>
  <div class="max-w-[473px] mx-auto py-[100px]">

    <h2 class="text-[30px] font-bold leading-[165%] tracking-[0] text-center text-[#A0576F] mb-[19px]">Complete
      Profile</h2>

    <div class="space-y-[10px]">
      <div class="flex items-center gap-[10px] border border-[#A0576F] rounded-[13px] px-[23px] bg-transparent">
        <UserIcon />

        <input placeholder="First Name" v-model="form.first_name"
               class="py-[16px] w-full text-[15.38px] font-normal leading-[100%] tracking-[0] text-[#90928F] outline-none placeholder:text-[#A0576F]"
               type="text" />
      </div>

      <div class="flex items-center gap-[10px] border border-[#A0576F] rounded-[13px] px-[23px] bg-transparent">
        <UserIcon />

        <input placeholder="Last Name" v-model="form.last_name"
               class="py-[16px] w-full text-[15.38px] font-normal leading-[100%] tracking-[0] text-[#90928F] outline-none placeholder:text-[#A0576F]"
               type="text" />
      </div>

      <div class="flex items-center gap-[10px] border border-[#A0576F] rounded-[13px] px-[23px] bg-transparent">
        <UserIcon />

        <input placeholder="Phone Number (Auto filled)" v-model="authModule.getFullOtpMobileNumber" disabled="true"
               class="py-[16px] w-full text-[15.38px] font-normal leading-[100%] tracking-[0] text-[#90928F] outline-none placeholder:text-[#A0576F]"
               type="text" />
      </div>


      <div class="flex items-center gap-[10px] border border-[#A0576F] rounded-[13px] px-[23px] bg-transparent">
        <UserIcon />

        <input placeholder="Email Address" v-model="form.email"
               class="py-[16px] w-full text-[15.38px] font-normal leading-[100%] tracking-[0] text-[#90928F] outline-none placeholder:text-[#A0576F]"
               type="text" />
      </div>


      <div class="flex items-center gap-[10px] border border-[#A0576F] rounded-[13px] px-[23px] bg-transparent">
        <UserIcon />

        <input placeholder="Date Of Birth (Optional)" v-model="form.date_of_birth"
               class="py-[16px] w-full text-[15.38px] font-normal leading-[100%] tracking-[0] text-[#90928F] outline-none placeholder:text-[#A0576F]"
               type="text" />
      </div>

<!--      <div-->
<!--        v-for="placeholder in ['First Name', 'Last Name', 'Phone Number (Auto filled)', 'Email Address', 'Date Of Birth (Optional)']"-->
<!--        :key="placeholder">-->
<!--        <div class="flex items-center gap-[10px] border border-[#A0576F] rounded-[13px] px-[23px] bg-transparent">-->
<!--          <UserIcon />-->

<!--          <input :placeholder="placeholder" :readonly="placeholder.includes('Auto filled')"-->
<!--            class="py-[16px] w-full text-[15.38px] font-normal leading-[100%] tracking-[0] text-[#90928F] outline-none placeholder:text-[#A0576F]"-->
<!--            type="text" />-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <div class="mt-[20px]">
      <!-- Male -->
      <h4 class="text-[19.11px] font-medium leading-[100%] tracking-[-2%] text-[#A0576F]">Gender</h4>
      <div class="flex gap-4 mt-[20px]">
        <div class="flex-1 basis-1/2">
          <input type="radio" id="gender-male" value="Male" v-model="form.gender" name="gender" class="sr-only peer" />
          <label for="gender-male"
            class="block text-center w-full cursor-pointer py-[10px] rounded-full border border-[#A0576F] text-[#A0576F] text-[18px] bg-transparent transition-all
                    peer-checked:bg-[#6B8B9B] peer-checked:text-[#EBE4DF] peer-checked:border-[#6B8B9B] peer-checked:shadow-md">
            Male
          </label>
        </div>

        <!-- Female -->
        <div class="flex-1 basis-1/2">
          <input type="radio" id="gender-female" value="Female" v-model="form.gender" name="gender" class="sr-only peer" />
          <label for="gender-female"
            class="block text-center w-full cursor-pointer py-[10px] rounded-full border border-[#A0576F] text-[#A0576F] text-[18px] bg-transparent transition-all
             peer-checked:bg-[#6B8B9B] peer-checked:text-[#EBE4DF] peer-checked:border-[#6B8B9B] peer-checked:shadow-md">
            Female
          </label>
        </div>
      </div>
    </div>
    <BaseButton label="Continue" @click="completeProfile" :loading="authModule.loading"
      class="bg-[#A0576F] text-white rounded-[100px] w-full py-[16px] justify-center text-[18px] font-normal leading-[100%] tracking-[0] border border-[#A0576F] hover:bg-[#913E5D] transition cursor-pointer mt-[30px]" />


  </div>
</template>


<script setup lang="ts">
import { COMPONENTS } from "~/data/constants";
// const {setStepComponent } = useAuth();
// const {setDialogShow} = useApp();

const authModule = useAuth();

const form = ref({
  gender: "Male"
});

const completeProfile = function () {
  authModule.register(form.value)
  // setDialogShow(false);
  // setStepComponent(COMPONENTS.INTRO_STEP);
}

import UserIcon from '~/components/icons/UserIcon.vue'

import { ref } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
  description: string
}>()

const emit = defineEmits(['update:open'])

function closeModal() {
  emit('update:open', false)
}

const gender = ref<'male' | 'female' | null>(null)
</script>

<template>

  <div class="max-w-[473px] mx-auto py-[100px]">
    <div class="text-center">
      <img src="/assets/img/register-logo.svg" class="mx-auto max-w-[214px] mb-[56px]" alt="">
    </div>
    <p class=" text-start text-[19.15px] font-medium leading-[31.28px] tracking-[0] text-[#5B605C] mb-[18px]">
      Please enter
      your mobile number</p>
    <div
      class="flex rounded-[14.37px] border-[1.2px] px-[18px] py-[15px] text-[16.76px] font-normal leading-[31.28px] tracking-[2.61px] text-[#A0576F]">
      <div class="flex items-center gap-2">
        <img src="/public/assets/img/sa-flag.svg" alt="saudi-flag" class="w-[35px] h-[23px]" />
        <span class="text-[#A0576F] font-medium">+966</span>
      </div>
      <div class="mx-[18px] border-l border-[#BBCACF]"></div>
      <input type="text" placeholder="50 XXXX XXXX" v-model="form.mobile_number"
        class="flex-1 outline-none bg-transparent text-[#5B605C] placeholder:text-[#D3C9C5] text-[16px]" />
    </div>

    <div class="flex items-center gap-[10px] mt-[20px]">
      <label class="relative flex items-center cursor-pointer select-none">
        <input type="checkbox" class="sr-only peer" />

        <!-- دائرة خارجية -->
        <div
          class="w-[20px] h-[20px] rounded-full border-2 border-[#A0576F] flex items-center justify-center peer-checked:bg-[#A0576F] transition">
          <!-- دائرة داخلية تظهر فقط عند check -->
          <div
            class="w-[10px] h-[10px] rounded-full bg-[#EBE4DF] scale-0 peer-checked:scale-100 transition-transform duration-200">
          </div>
        </div>
      </label>

      <span class="text-[16.76px] font-normal leading-[100%] tracking-[0] text-[#5B605C]">
        I accept
        <a href="#" class="text-[#A0576F] underline">Terms & conditions</a>
        and
        <a href="#" class="text-[#A0576F] underline">Privacy policy</a>
      </span>
    </div>
    <div class="w-full space-y-3">
      <UButton label="Continue" @click="sendOtp"
        class="bg-[#A0576F] text-white rounded-[100px] w-full py-[16px] justify-center text-[18px] font-normal leading-[100%] tracking-[0] border border-[#A0576F] hover:bg-[#913E5D] transition cursor-pointer mt-[30px]" />

      <UButton label="Continue as a Guest" @click="continueAsGuest"
        class="bg-transparent text-[#A0576F] border border-[#A0576F] rounded-[100px] w-full py-[16px] justify-center text-[18px] font-normal hover:bg-[#F4EAEA] transition cursor-pointer leading-[100%] tracking-[0]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { COMPONENTS } from "~/data/constants";
import { nextTick } from "vue";
const { setStepComponent, sendOtp: sendOtpApi } = useAuth();
const { setDialogShow } = useApp();
const form = ref({
  mobile_number: '',
  mobile_code: "966"
});

const continueAsGuest = function () {
  setStepComponent(COMPONENTS.INTRO_STEP);
  nextTick(() => setDialogShow(false));
}

const sendOtp = function () {
  sendOtpApi(form.value);
  // setStepComponent(COMPONENTS.VERIFY_OTP_STEP);
}
</script>
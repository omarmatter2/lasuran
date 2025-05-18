<template>
  <div class="max-w-[473px] mx-auto py-[100px]">
    <div class="text-center">
      <img src="/assets/img/not-member.svg" class="mx-auto max-h-[279px]" alt="">
    </div>
    <h2 class="text-[30px] font-bold leading-[165%] tracking-[0] text-center text-[#A0576F]">You’re Not a Member
    </h2>
    <p class="text-[20px] font-[350] leading-[165%] tracking-[0] text-center text-[#5B605C]">
      You need to log in or sign up to use our services
    </p>

    <UButton @click="setStepComponent(COMPONENTS.SEND_OTP_STEP)" label="Continue" class="bg-[#A0576F] rounded-[100px] w-full py-[16px] justify-center text-[20px] font-normal leading-[100%] tracking-[0] border border-[#A0576F] hover:bg-[#913E5D] transition cursor-pointer mt-[30px]" />
  </div>
</template>

<script setup lang="ts">
import {COMPONENTS} from "~/data/constants";
const {setStepComponent } = useAuth();
</script>


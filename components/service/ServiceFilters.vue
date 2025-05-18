<template>
  <div class="space-y-[20px]">
    <div>
      <SelectableSlider
          v-model="menuModule.category_id"
          :items="menuModule?.getCategories"
          @update:modelValue="onChange('category_id',$event)" />

<!--      :model-value="menuModule?.category_id"-->

<!--      @update:modelValue="onChange('sub_category_id',$event)"-->
<!--      :model-value="menuModule?.sub_category_id"-->
<!--      @update:modelValue="onCategoryChange"-->
<!--      <UTabs :ui="{-->
<!--        root: 'inline-flex gap-0',-->
<!--        list: 'bg-transparent gap-[14px]',-->
<!--        trigger: 'px-0 py-[15px] w-[171px] gap-[9px] border  rounded-[100px] justify-center text-[15px] font-medium leading-normal data-[state=inactive]:text-[#BBCACF] hover:data-[state=inactive]:not-disabled:text-[#BBCACF] data-[state=inactive]:border-[#BBCACF] data-[state=active]:border-[#EBE4DF] data-[state=active]:bg-[#EBE4DF] data-[state=active]:text-[#A0576F] ',-->
<!--      }"-->
<!--      v-model="filters.category_id" :items="menuModule.getCategories"-->
<!--      label-key="name"-->
<!--      value-key="id"-->
<!--      />-->
    </div>

    <div class="flex justify-between items-center">
      <USelectMenu v-model="filters.branch" :items="menuModule.getBranches"
                   valueKey="id" labelKey="name"
                   class="min-w-[300px] rounded-[100px] border border-[#EBE4DF] bg-[#EBE4DF] shadow-[1px_3px_8px_0px_#00000012] backdrop-blur-[25px] h-[56px] text-[#A0576F] text-[16px] font-[350] leading-normal ps-[28px]"
      />

      <SelectableSlider
          v-model="menuModule.sub_category_id"
          :items="menuModule?.getSubCategories"
          @update:modelValue="onChange('sub_category_id',$event)"
      />
<!--      <UTabs v-model="filters.sub_category_id" :items="categories"-->
<!--      :ui="{-->
<!--        root: 'inline-flex gap-0',-->
<!--        list: 'bg-transparent gap-[14px]',-->
<!--        trigger: 'px-[16px] py-[6px] rounded-[100px] text-center text-[16px] font-[200] leading-normal flex-none w-auto data-[state=inactive]:text-[#2B2B2B] data-[state=inactive]:bg-[#F6F6F64D] data-[state=active]:text-[#A0576F] data-[state=active]:bg-[#EBE4DF] data-[state=active]:font-[500]',-->
<!--      }"-->
<!--      />-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TabsItem } from '@nuxt/ui'
import SelectableSlider from "~/components/base/SelectableSlider.vue";

const menuModule = useMenu();
// const props = defineProps<{
//   modelValue: {
//     gender: string
//     branch: { label: string; value: string }
//     category: string
//   }
// }>()
// const filters: { gender: any, branch: any, category: any } = defineModel();

// const filters = computed({
//   set(newValue) {
//     menuModule.setMenuParams(newValue)
//   },
//   get() {
//     return menuModule.getMenuParams ?? {}
//   }
// });
const filters = ref({});

const onChange = function (key: string,value : any) {
  // if (!menuModule) return;
  // menuModule[key] = value;
  if (key == 'category_id')  menuModule.setDefaultSubCategory();
  menuModule.fetchServices();
}


const emit = defineEmits(['update:modelValue'])

const branches = [
  { name: 'Lasuran, Riyadh Branch 1', id: 1 },
  { name: 'Lasuran, Jeddah Branch', id: 2 },
  { name: 'Lasuran, Dammam Branch', id: 3 }
]

const categories: TabsItem[] = [
  { label: 'Hair Styling', value: 'Hair Styling' },
  { label: 'Eyebrows & Eyelashes', value: 'Eyebrows & Eyelashes' },
  { label: 'Massage', value: 'Massage' },
  { label: 'Makeup', value: 'Makeup' },
  { label: 'Nails', value: 'Nails' }
]

// const gender = ref(props.modelValue.gender || 'female')
// const branch = ref(props.modelValue.branch || branches[0])
// const category = ref(props.modelValue.category || 'Hair Styling')

// watch([gender, branch, category], () => {
//   emit('update:modelValue', {
//     gender: gender.value,
//     branch: branch.value,
//     category: category.value
//   })
// })


</script>

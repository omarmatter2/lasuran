<template>
  <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-1/5' }">
    <slot :item="item">
      <UBadge @click="selectItem(item)" :class="{'font-bold rounded-full': true, 'active' : (getItem(item,'value') == selectedValue)}">
        {{  getItem(item) }}
      </UBadge>
    </slot>
  </UCarousel>
</template>

<script lang="ts" setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  labelKey: {
    type: String,
    default: 'name'
  }
});

const selectedValue = defineModel();

const getItem = function(item : {},attribute = 'label') {
  if (attribute === 'label') return item[props.labelKey];
   return item[props.valueKey];
}

const selectItem = function (item: any) {
  selectedValue.value = item[props.valueKey];
}
</script>


<style>
.active {
  background-color: red;
}
</style>
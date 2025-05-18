<template>

    <UCarousel v-slot="{ item }" :dots="dots" :items="items" class="w-full" :ui="uiOptions">
      <slot :item="item"></slot>
    </UCarousel>

</template>


<script setup lang="ts">
const props = defineProps({
    items: {
        type: Array,
        default:[]
    },
    dots: {
      type: Boolean,
      default: false,
    },
    dotsClass: {
      type: String,
      default: 'dots'
    },
    slidePerRow: {
       type: Number,
       default: 5
    }
});

const uiOptions = computed(() => {
  let options :any = {
    item : `basis-1/${props.slidePerRow} w-1/${props.slidePerRow} max-w-[${100 / props.slidePerRow}%]`
  };
  if(props.dots) options.dots = `${props.dotsClass}`;
  return options;
})
</script>


<style>

.base_card--body .w-1\/2{
  width:50%;
  max-width:50%;
}

.base_card--body .w-1\/3{
  width:33.3333333%;
  max-width:33.3333333%;
}

.base_card--body .w-1\/4{
  width:25%;
  max-width:25%;
}

.base_card--body .w-1\/5{
  width:20%;
  max-width:20%;
}


</style>
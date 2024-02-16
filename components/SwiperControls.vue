<template>
  <div class="flex gap-4">
  <button @click="swiper.slidePrev()" v-if="props.showPrev" class="icon-arrow">
    <Icon name="teenyicons:arrow-left-outline" size="28" />
  </button>
  <button @click="swiper.slideNext()" v-if="props.showNext" class="icon-arrow">
    <Icon name="teenyicons:arrow-right-outline" size="28" />
  </button>
</div>

</template>
<script setup lang="ts">
const swiper = useSwiper();

const props = defineProps({
  showPrev: {
    type: Boolean,
    required: true,
  },
  showNext: {
    type: Boolean,
    required: true,
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.icon-arrow {
  color: $gray;
  &:hover {
    color: lighten($gray, 12%);
  }
}
</style>

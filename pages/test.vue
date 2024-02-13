<script setup>
const slides = ref(Array.from({ length: 10 }, () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  // Figure out contrast color for font
  const contrast = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white'

  return { bg: `rgb(${r}, ${g}, ${b})`, color: contrast }
}))
</script>

<template>
  <div>
    <h1>Nuxt Swiper Basic Example</h1>
    <hr>
    <h2>Swiper Creative Effect</h2>
    <Swiper
      :height="100"
      :slides-per-view="1"

    >
      <SwiperSlide
        v-for="(slide, idx) in slides"
        :key="idx"
        :style="`background-color: ${slide.bg}; color: ${slide.color}`"
      >
        {{ idx }}
      </SwiperSlide>
sasas
      <!-- useSwiper() within a swiper instance -->
      <SwiperControls />
    </Swiper>
    <h2>Swiper Card Effect</h2>
    <Swiper
      class="swiper-cards"
      :width="240"
      :modules="[SwiperAutoplay, SwiperEffectCards]"
      :slides-per-view="1"
      :loop="true"
      :effect="'cards'"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true
      }"
    >
      <SwiperSlide
        v-for="(slide, idx) in slides"
        :key="idx"
        :style="`background-color: ${slide.bg}; color: ${slide.color}`"
      >
        {{ idx }}
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.swiper-slide {
  width: 300px !important;
}
.swiper {
  //width: 330px !important;
  width: 400px !important;
  overflow: hidden;
  overflow: clip;
  list-style: none;
  z-index: 1;
  display: block;
}

.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}
.swiper-cards {
  width: 240px;
  height: 240px;
}
.swiper-cards .swiper-slide {
  border-radius: 6px;
  border: 1px solid black;
}
</style>

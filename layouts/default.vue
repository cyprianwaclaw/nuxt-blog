<template>
  <!-- mobile searching page -->
  <!-- <div v-if="router.currentRoute.value.name === 'search'">
    <slot />
  </div> -->
  <!-- <div v-else> -->
  <div>

    <!-- all other pages -->
    <NavHeader v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'" />
    <div
      v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'"
      class="lg:w-[1150px] md:mx-auto md:mx-6 mx-4 md:pt-[116px] md:mb-[42px] pb-[120px] pt-[45px]"
    >
      <slot />
    </div>
    <!-- add new post page -->
    <!-- <div class="" v-else>
      <NavHtest />
      <div class="lg:w-[1250px] md:mx-auto mx-6 md:pt-[54px] pb-[120px]">
        <slot />
      </div>
    </div> -->
  </div>
  <NavMobileBottom />
  <NavBottom class="w-full px-10" />
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>

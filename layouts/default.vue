<template>
  <NavHeader />
  <div
    v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'"
    class="lg:w-[1150px] md:mx-auto mx-6 md:pt-[116px] md:mb-[42px] pb-[120px]"
  >
    <slot />
  </div>
  <div class="bg-[#F8F8F8]" v-else>
    <div class="lg:w-[1250px] md:mx-auto mx-6 md:pt-[54px] pb-[120px]">
      <slot />
    </div>
  </div>
  <NavBottom class="w-full px-10" />
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>

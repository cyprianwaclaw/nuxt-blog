<template>
  <div>
    <NavHeader />
    <div
      class="lg:w-[1150px] md:mx-auto md:mx-6 mx-4 md:pt-[116px] md:mb-[42px] pb-[120px] pt-[45px]"
    >
      <slot />
    </div>
  </div>

  <!-- </div> -->

  <NavBottom class="w-full px-10" />
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>
